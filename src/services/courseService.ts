import { supabase, Tables, Insertable, Updatable } from '../lib/supabase';

export type Course = Tables<'courses'>;
export type CourseInsert = Insertable<'courses'>;
export type CourseUpdate = Updatable<'courses'>;

export type Instructor = Tables<'instructors'>;
export type CurriculumWeek = Tables<'curriculum'>;
export type CourseFeature = Tables<'course_features'>;

export interface CourseWithDetails extends Course {
  instructors: Instructor[];
  curriculum: CurriculumWeek[];
  features: string[];
}

/**
 * Fetch all courses
 */
export async function getAllCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }

  return data || [];
}

/**
 * Fetch a single course by ID with all related details
 */
export async function getCourseById(courseId: string): Promise<CourseWithDetails | null> {
  // Fetch the course
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single();

  if (courseError) {
    console.error('Error fetching course:', courseError);
    return null;
  }

  if (!course) {
    return null;
  }

  // Fetch instructors
  const { data: courseInstructors, error: instructorsError } = await supabase
    .from('course_instructors')
    .select('instructors(*)')
    .eq('course_id', courseId);

  if (instructorsError) {
    console.error('Error fetching course instructors:', instructorsError);
  }

  // Fetch curriculum
  const { data: curriculum, error: curriculumError } = await supabase
    .from('curriculum')
    .select('*')
    .eq('course_id', courseId)
    .order('week', { ascending: true });

  if (curriculumError) {
    console.error('Error fetching curriculum:', curriculumError);
  }

  // Fetch features
  const { data: features, error: featuresError } = await supabase
    .from('course_features')
    .select('feature')
    .eq('course_id', courseId);

  if (featuresError) {
    console.error('Error fetching features:', featuresError);
  }

  return {
    ...course,
    instructors: courseInstructors?.map(item => item.instructors) || [],
    curriculum: curriculum || [],
    features: features?.map(item => item.feature) || [],
  };
}

/**
 * Fetch courses by category
 */
export async function getCoursesByCategory(categoryId: string): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('category', categoryId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching courses by category:', error);
    throw error;
  }

  return data || [];
}

/**
 * Fetch courses by level
 */
export async function getCoursesByLevel(levelId: string): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('level', levelId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching courses by level:', error);
    throw error;
  }

  return data || [];
}

/**
 * Search courses by term
 */
export async function searchCourses(searchTerm: string): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,full_description.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching courses:', error);
    throw error;
  }

  return data || [];
}

/**
 * Fetch all categories
 */
export async function getAllCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }

  return data || [];
}

/**
 * Fetch all levels
 */
export async function getAllLevels() {
  const { data, error } = await supabase
    .from('levels')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching levels:', error);
    throw error;
  }

  return data || [];
} 