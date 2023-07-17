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
} from "./api";
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
// const {mutate, isLoading, isError} = useCreateSchoolUser();
