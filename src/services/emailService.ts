import { supabase } from '../lib/supabase';

// Hàm này sẽ được gọi để gửi email xác nhận sau khi người dùng đăng ký
export async function sendVerificationEmail(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // Sử dụng Supabase Auth để gửi email xác nhận
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });

    if (error) {
      console.error('Error sending verification email:', error);
      return {
        success: false,
        message: 'Không thể gửi email xác nhận. Vui lòng thử lại sau.',
      };
    }

    return {
      success: true,
      message: 'Email xác nhận đã được gửi. Vui lòng kiểm tra hộp thư của bạn.',
    };
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      message: 'Đã xảy ra lỗi khi gửi email xác nhận. Vui lòng thử lại sau.',
    };
  }
}

// Hàm này sẽ được gọi để gửi email xác nhận đăng ký khóa học
export async function sendCourseRegistrationConfirmation(
  email: string,
  fullName: string,
  courseName: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Hiện tại chúng ta sẽ mô phỏng việc gửi email
    // Trong thực tế, bạn sẽ cần tích hợp với dịch vụ gửi email như SendGrid, Mailchimp, v.v.
    console.log(`Sending course registration confirmation to ${email} for course ${courseName}`);

    // TODO: Tích hợp với dịch vụ gửi email thực tế ở đây
    // Ví dụ với SendGrid:
    /*
    const msg = {
      to: email,
      from: 'educare@example.com',
      subject: `Xác nhận đăng ký khóa học ${courseName}`,
      html: `
        <div>
          <h2>Xin chào ${fullName},</h2>
          <p>Cảm ơn bạn đã đăng ký khóa học <strong>${courseName}</strong> tại EduCare Center.</p>
          <p>Chúng tôi đã nhận được thông tin đăng ký của bạn và sẽ liên hệ lại trong vòng 24 giờ để xác nhận chi tiết.</p>
          <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email support@educare.example.com hoặc số điện thoại 0123.456.789.</p>
          <p>Trân trọng,<br>Đội ngũ EduCare Center</p>
        </div>
      `,
    };
    await sendgrid.send(msg);
    */

    return {
      success: true,
      message: 'Email xác nhận đăng ký khóa học đã được gửi.',
    };
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      message: 'Đã xảy ra lỗi khi gửi email xác nhận đăng ký khóa học.',
    };
  }
}

// Hàm để gửi email khi người dùng đặt lại mật khẩu
export async function sendPasswordResetEmail(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // Sử dụng URL tuyệt đối thay vì window.location.origin
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://khanhduyenglish.vercel.app/reset-password',
    });

    if (error) {
      console.error('Error sending password reset email:', error);
      return {
        success: false,
        message: 'Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.',
      };
    }

    return {
      success: true,
      message: 'Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.',
    };
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      message: 'Đã xảy ra lỗi khi gửi email đặt lại mật khẩu. Vui lòng thử lại sau.',
    };
  }
} 