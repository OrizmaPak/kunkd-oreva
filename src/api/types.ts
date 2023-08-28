import { AxiosError, AxiosResponse } from "axios";
import { User } from "firebase/auth";

export type TSchool = {
  address?: string;
  backgroundImage?: string;
  contact_name?: string;
  name?: string;
  profileImage?: string;
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
  // post_code: string;
  // tax_id: string;
  // country_id: string;
  // state_id: string;
  address: string;
  school_name: string;
};

export type TSchoolSignupData = {};
export type TVerifyOtpData = {};
export type TSecurePortalData = {};
export type TParentSignupData = {};
export type TSetPasswordData = {};
export type TLoginData = {};
export type TForgotPasswordData = {};
export type TResetPasswordData = {};
export type TAudioBooks = {};
export type TVerifyPinData = {};
export type TPayStackInitData = {};
export type TLikedContentData = {};
export type TContentTracking = {};
export type TAddTeacherData = {};

export type TProfileData = {
  name: string;
  dob: string;
  image: string;
  is_avatar: string;
};
export type TGetProfileData = {};
export type TUpdatePassword = {};
export type TUdateProfileData = {
  name: string;
  age: string;
  image: string | Blob;
  profile_id: string;
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

export type TContentForHome = {};

export type TGoogleSignUpData = {};
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
