import { AxiosError, AxiosResponse } from "axios";
import { User } from "firebase/auth";

export type TSchool = {
  address?: string;
  backgroundImage?: string;
  contact_name?: string;
  name?: string;
  profileImage?: string;
  code?: string;
  class?: { class_id: number; class_name: string };
};
export type returnUser = {
  dob: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  token: string;
  user_id: number;
  role: string;
  user_image: string;
  contact_name: string;
  school: TSchool;
  default_password: boolean;
  // post_code: string;
  // tax_id: string;
  // country_id: string;
  // state_id: string;
  address: string;
  status: string;
  school_name: string;
};

export type TSchoolSignupData = object;
export type TVerifyOtpData = object;
export type TSecurePortalData = object;
export type TParentSignupData = object;
export type TSetPasswordData = object;
export type TLoginData = object;
export type TForgotPasswordData = object;
export type TResetPasswordData = object;
export type TAudioBooks = object;
export type TVerifyPinData = object;
export type TPayStackInitData = object;
export type TLikedContentData = object;
export type TContentTracking = {
  signal?: AbortSignal;
  profile_id: number;
  content_id: number;
  status: string;
  pages_read: number;
  timespent: number;
};
export type TAddTeacherData = object;
export type TSaveQuiz = object;

export type TProfileData = {
  name: string;
  dob: string;
  username: string;
  schoolname: string;
  image: string;
  is_avatar: string;
};
export type TGetProfileData = object;
export type TUpdatePassword = object;
export type TUdateProfileData = {
  name: string;
  age: string;
  image: string | Blob;
  profile_id: string;
};

export type Tprofile = {
  id: number;
  name: string;
  age: 0;
  dob: string;
  image: string;
  student: {
    assigned_teacher_id: number;
    assigned_teacher_name: string;
    class_id: number;
    class_name: string;
    school_id: number;
    school_name: string;
    status: string;
  };
};

export type TUdateSchImageData = {
  profileImage?: string | Blob;
  backgroundImage?: string | Blob;
};

export type TUdateParentImageData = {
  image: string | Blob;
};

export type TUdateSchProfileData = {
  contact_name: string;
  email: string;
  address: string;
};

export type TUdateParentProfileData = {
  firstname: string;
  lastname: string;
};

export type TApiError = AxiosError<{
  message: string;
  status: boolean;
  data: unknown;
}>;

export type TContentForHome = object;

export type TGoogleSignUpData = object;
export type TGetContentById = {
  contentId: string;
  userId: string;
};

export type TUser = (Partial<User> & Partial<returnUser>) | null;

type TResponse<T> = {
  message: string;
  data: T;
  status: boolean;
};

export type ApiResponse<T> = AxiosResponse<TResponse<T>>;

export type TSubCategory = {
  id: number;
  image: string;
  name: string;
  short_link: string;
  slug: string;
};
export type TContentPage = {
  audio: string;
  web_body: string;
  content_media_id: number;
  image: string;
  name: string;
  page_number: number;
};

export type TSubCategory2 = {
  sub_category_id: number;
  sub_category_name: string;
};

export type TMedia = {
  name: string;
  slug: string;
  order: number;
  file: string;
  thumbnail: string;
};

export type TQuizResult = {
  status: boolean;
  id: number;
  result: number;
};
export type TStoryContent = {
  sub_category_name?: unknown;
  category?: string;
  sub_categories?: TSubCategory2[];
  category_id?: number;
  content_type?: string;
  content_type_id?: number;
  has_quiz?: boolean;
  id?: number;
  is_liked?: boolean;
  media?: TMedia[];
  media_type?: string;
  name?: string;
  pages?: TContentPage[];
  short_link?: string;
  slug?: string;
  pages_read?: number;
  synopsis?: string;
  tags?: string;
  theme?: string;
  thumbnail?: string;
  status?: string;
  web_synopsis?: string;
  quiz_result?: TQuizResult;
  timespent?: number;
};

/**
 * {
 * data, status, statusText, message, config, response, request}
 */
