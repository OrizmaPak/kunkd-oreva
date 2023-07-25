import {
  ParentSignUp,
  SchoolSignUp,
  VerifyOtp,
  SecurePortal,
  SetPassword,
  Login,
  ForgotPassword,
  ResetPassword,
  GetAvatars,
  Profile,
  GetProfile,
  UpdatePassword,
  UpdateProfile,
  GoogleSignUp,
  ContentForHome,
  GetContentById,
  GetSubCategories,
  SocialLogin,
  GetContebtBySubCategories,
} from "./api";
import { TGetContentById } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { TProfileData } from "./types";
// import { AxiosResponse } from "axios";
import { selectAvatarType } from "@/pages/AfterParentSignIn/SelectProfile";
import { ApiResponse } from "./types";
import { getProfileState } from "@/store/profileStore";
import useStore from "@/store/index";

export const querykeys = {
  profiles: ["GetProfile"],
};
// OnBoarding School
export const useCreateSchoolUser = () => {
  return useMutation({
    mutationFn: SchoolSignUp,
  });
};

// Verify Otp
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: VerifyOtp,
  });
};

// Secure Portal
export const useSecurePortal = () => {
  return useMutation({
    mutationFn: SecurePortal,
  });
};

// OnBoarding Parent
export const useCreateParentUser = () => {
  return useMutation({
    mutationFn: ParentSignUp,
  });
};

// Reset Password
export const useSetPassword = () => {
  return useMutation({
    mutationFn: SetPassword,
  });
};

// Login
export const useLogin = () => {
  return useMutation({
    mutationFn: Login,
  });
};

// Forgot Password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: ForgotPassword,
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ResetPassword,
  });
};

// Get Avatar
export const useGetAvatars = () => {
  return useQuery({ queryKey: ["GetAvatars"], queryFn: GetAvatars });
};

// Create  Profile
export const useProfle = () => {
  return useMutation({
    mutationFn: Profile,
  });
};

// Fetch Profile
export const useGetProfile = (
  enabled: boolean = true,
  onSucces?: (val: selectAvatarType[]) => void
) => {
  const [, setProfile] = useStore(getProfileState);
  return useQuery<ApiResponse<selectAvatarType[]>>({
    queryKey: querykeys.profiles,
    queryFn: GetProfile,
    enabled: enabled,
    onSuccess(res) {
      const resp = res.data;
      setProfile(resp.data);
      if (onSucces) {
        onSucces(resp.data);
      }
    },
  });
};

// Update Password
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: UpdatePassword,
  });
};

// Update Profile
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: UpdateProfile,
  });
};

// Google Sign up
export const useGoogleSignup = () => {
  return useMutation({
    mutationFn: GoogleSignUp,
  });
};

export const useContentForHome = () => {
  return useQuery({ queryKey: ["ContentForHome"], queryFn: ContentForHome });
};

export const useGetContentById = (contentId: string, userId: string) => {
  return useQuery({
    queryKey: ["getContentById", contentId, userId],
    queryFn: () => GetContentById(contentId, userId),
  });
};

export const useGetSubCategories = () => {
  return useQuery({
    queryKey: ["getContentSubCategory"],
    queryFn: GetSubCategories,
  });
};

export const useGetContebtBySubCategories = (subId: string) => {
  return useQuery({
    queryKey: ["getContentBySubId", subId],
    queryFn: () => GetContebtBySubCategories(subId),
  });
};

export const useSocialLogin = () => {
  return useMutation({
    mutationFn: SocialLogin,
  });
};

// const {mutate, isLoading, isError} = useCreateSchoolUser();
