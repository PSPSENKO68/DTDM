import { supabase } from '../lib/supabase';

// Hàm tạo mã OTP ngẫu nhiên 6 chữ số
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Lưu mã OTP vào bảng reset_passwords
export async function saveOTP(email: string, otp: string): Promise<boolean> {
  try {
    // Xóa các mã OTP cũ của email này (nếu có)
    await supabase
      .from('reset_passwords')
      .delete()
      .eq('email', email);
    
    // Thêm mã OTP mới với thời hạn 15 phút
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // OTP hết hạn sau 15 phút
    
    const { error } = await supabase
      .from('reset_passwords')
      .insert([
        { 
          email, 
          otp,
          expires_at: expiresAt.toISOString()
        }
      ]);

    if (error) {
      console.error('Error saving OTP:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in saveOTP:', error);
    return false;
  }
}

// Xác minh mã OTP
export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  try {
    // Lấy bản ghi OTP
    const { data, error } = await supabase
      .from('reset_passwords')
      .select('*')
      .eq('email', email)
      .eq('otp', otp)
      .single();
    
    if (error || !data) {
      console.error('Error verifying OTP or OTP not found:', error);
      return false;
    }
    
    // Kiểm tra thời hạn
    const expiresAt = new Date(data.expires_at);
    const now = new Date();
    
    if (now > expiresAt) {
      console.log('OTP has expired');
      return false;
    }
    
    // OTP hợp lệ
    return true;
  } catch (error) {
    console.error('Error in verifyOTP:', error);
    return false;
  }
}

// Đặt lại mật khẩu sau khi xác minh OTP
export async function resetPasswordWithOTP(email: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  try {
    // Tìm user với email
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      return { 
        success: false, 
        message: 'Không thể tìm thấy thông tin người dùng.'
      };
    }
    
    const user = userData.users.find(u => u.email === email);
    
    if (!user) {
      return { 
        success: false, 
        message: 'Không tìm thấy tài khoản với email này.'
      };
    }
    
    // Cập nhật mật khẩu
    const { error } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );
    
    if (error) {
      return { 
        success: false, 
        message: 'Không thể cập nhật mật khẩu. Vui lòng thử lại sau.'
      };
    }
    
    // Xóa bản ghi OTP sau khi đã sử dụng
    await supabase
      .from('reset_passwords')
      .delete()
      .eq('email', email);
    
    return { 
      success: true, 
      message: 'Mật khẩu đã được cập nhật thành công.'
    };
  } catch (error) {
    console.error('Error in resetPasswordWithOTP:', error);
    return { 
      success: false, 
      message: 'Đã xảy ra lỗi khi đặt lại mật khẩu. Vui lòng thử lại sau.'
    };
  }
} 