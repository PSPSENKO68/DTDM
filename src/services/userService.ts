import { supabase, Tables, Insertable } from '../lib/supabase';
import { sendCourseRegistrationConfirmation } from './emailService';

export type User = Tables<'users'>;
export type UserInsert = Insertable<'users'>;

export type Registration = Tables<'registrations'>;
export type RegistrationInsert = Insertable<'registrations'>;

export type ContactSubmission = Tables<'contact_submissions'>;
export type ContactSubmissionInsert = Insertable<'contact_submissions'>;

/**
 * Register a user for a course
 */
export async function registerForCourse(
  userData: UserInsert,
  courseId: string
): Promise<{ success: boolean; message: string; registrationId?: string }> {
  try {
    // First check if user exists by email
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', userData.email)
      .single();
    
    let userId: string;
    
    // If user doesn't exist, create a new one
    if (!existingUser) {
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert({
          ...userData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('id')
        .single();
      
      if (userError) {
        console.error('Error creating user:', userError);
        return { success: false, message: 'Không thể tạo thông tin người dùng. Vui lòng thử lại sau.' };
      }
      
      userId = newUser.id;
    } else {
      // Update existing user data
      const { error: updateError } = await supabase
        .from('users')
        .update({
          full_name: userData.full_name,
          phone: userData.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingUser.id);
      
      if (updateError) {
        console.error('Error updating user:', updateError);
      }
      
      userId = existingUser.id;
    }
    
    // Check if user is already registered for this course
    const { data: existingRegistration } = await supabase
      .from('registrations')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();
    
    if (existingRegistration) {
      return { 
        success: false, 
        message: 'Bạn đã đăng ký khóa học này trước đó.',
        registrationId: existingRegistration.id 
      };
    }
    
    // Get course details for email
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('title')
      .eq('id', courseId)
      .single();
    
    if (courseError) {
      console.error('Error fetching course details:', courseError);
    }
    
    // Create registration
    const { data: registration, error: registrationError } = await supabase
      .from('registrations')
      .insert({
        user_id: userId,
        course_id: courseId,
        status: 'pending',
        payment_status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select('id')
      .single();
    
    if (registrationError) {
      console.error('Error creating registration:', registrationError);
      return { success: false, message: 'Không thể đăng ký khóa học. Vui lòng thử lại sau.' };
    }
    
    // Send confirmation email
    if (course) {
      try {
        await sendCourseRegistrationConfirmation(
          userData.email as string,
          userData.full_name as string,
          course.title
        );
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Không return vì email gửi thất bại không nên làm hỏng toàn bộ quá trình đăng ký
      }
    }
    
    return { 
      success: true, 
      message: 'Đăng ký khóa học thành công. Chúng tôi sẽ liên hệ với bạn sớm.',
      registrationId: registration.id 
    };
    
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' };
  }
}

/**
 * Submit a contact form
 */
export async function submitContactForm(
  contactData: ContactSubmissionInsert
): Promise<{ success: boolean; message: string }> {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        ...contactData,
        status: 'new',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error submitting contact form:', error);
      return { success: false, message: 'Không thể gửi biểu mẫu. Vui lòng thử lại sau.' };
    }
    
    return { 
      success: true, 
      message: 'Thông tin của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại sớm!' 
    };
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { success: false, message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' };
  }
}

/**
 * Get registrations by user email
 */
export async function getRegistrationsByEmail(email: string): Promise<Registration[]> {
  try {
    // First find the user
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();
    
    if (!user) {
      return [];
    }
    
    // Get registrations with course details
    const { data, error } = await supabase
      .from('registrations')
      .select(`
        *,
        courses:course_id (
          id,
          title,
          image,
          category,
          level,
          duration,
          schedule,
          price
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching registrations:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching registrations by email:', error);
    return [];
  }
} 