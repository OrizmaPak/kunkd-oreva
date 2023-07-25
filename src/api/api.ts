import axios from "./axios.config";
import type {
  TSchoolSignupData,
  TVerifyOtpData,
  TSecurePortalData,
  TParentSignupData,
  TSetPasswordData,
  TLoginData,
  TForgotPasswordData,
  TResetPasswordData,
  TProfileData,
  TGetProfileData,
  TUpdatePassword,
  TUdateProfileData,
  TGoogleSignUpData,
  TContentForHome,
} from "./types";

// School
export const SchoolSignUp = (payload: TSchoolSignupData) => {
  return axios.post("/signup/school", payload);
};

export const VerifyOtp = (payload: TVerifyOtpData) => {
  return axios.post("/otp/verify", payload);
};

export const SecurePortal = (payload: TSecurePortalData) => {
  return axios.post("/user/pin", payload);
};

// Parent
export const ParentSignUp = (payload: TParentSignupData) => {
  return axios.post("/signup/parent", payload);
};
export const SetPassword = (payload: TSetPasswordData) => {
  return axios.post("/password/set", payload);
};

// Login
export const Login = (payload: TLoginData) => {
  return axios.post("/login", payload);
};

// Forgot Password
export const ForgotPassword = (payload: TForgotPasswordData) => {
  return axios.post("/password/forgot", payload);
};

export const ResetPassword = (payload: TResetPasswordData) => {
  return axios.post("/password/reset", payload);
};

// Get Avatar
export const GetAvatars = () => {
  return axios.get("/avatars");
};

// Profile
export const Profile = (payload: TProfileData) => {
  const formData = new FormData();
  formData.append("name", payload?.name);
  formData.append("dob", payload?.dob);
  formData.append("is_avatar", payload?.is_avatar);
  formData.append("image", payload?.image);
  return axios.post("/profile", formData);
};

export const GetProfile = (payload: TGetProfileData) => {
  return axios.get("/profile", payload);
};

export const UpdatePassword = (payload: TUpdatePassword) => {
  return axios.patch("/password/update", payload);
};

export const UpdateProfile = (payload: TUdateProfileData) => {
  const formData = new FormData();
  formData.append("name", payload?.name);
  formData.append("dob", payload?.age);
  formData.append("image", payload?.image);
  formData.append("profile_id", payload?.profile_id);
  return axios.patch("/profile", formData);
};

export const GoogleSignUp = (payload: TGoogleSignUpData) => {
  return axios.post("/social/auth/web", payload);
};

export const ContentForHome = (payload: TContentForHome) => {
  return axios.get("/content/screen/web", payload);
};

export const GetContentById = (contentId: string, userId: string) => {
  return axios.get(`/content/${contentId}/${userId}`);
};

export const GetSubCategories = () => {
  return axios.get("/content/categories");
};

export const GetContebtBySubCategories = (subId: string) => {
  return axios.get(`/content/subcategory/${subId}`);
};

// Socila Login
export const SocialLogin = (payload: TLoginData) => {
  return axios.post("/signup/login", payload);
};
