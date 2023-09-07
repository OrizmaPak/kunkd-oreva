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
  SocialSignUp,
  ContentForHome,
  GetContentById,
  GetSubCategories,
  SocialLogin,
  GetContebtBySubCategories,
  GetAudioBooks,
  ResendOTP,
  UpdateSchProfile,
  GetCountries,
  GetStates,
  UpdateParentProfile,
  VerifyPin,
  UpdateSchImage,
  UpdateSchoolNameAddress,
  GetQuiz,
  UpdateParentImage,
  GetPlans,
  PayStackInit,
  VerifyCompletePayStack,
  StripeInit,
  GetTrendingAudioBooks,
  GetRecommendedVideo,
  GetIntroVideo,
  LikedContent,
  GetLikedContent,
  UnLikedContent,
  ContentTracking,
  AddTeacherData,
  AddClassData,
  GetClassList,
  GetSchool,
  ConnectStudentData,
  GetTeacherList,
  GetAdmittedStudentsInSchool,
  GetAttemptStudentConnect,
  ReAssignTeacher,
  GetOngoingContents,
  GetCompletedContents,
  GetContentsLog,
  AcceptStudentAdmission,
  RejectStudentAdmission,
  GetAdmittedStudentsInClass,
  SaveQuiz,
  GetMainSearch,
} from "./api";
// import { TGetContentById } from "./types";
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
export const useSocialSignUp = () => {
  return useMutation({
    mutationFn: SocialSignUp,
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

export const useGetAudioBoks = () => {
  return useQuery({
    queryKey: ["getAudioBooks"],
    queryFn: () => GetAudioBooks(),
  });
};

export const useGetIntroVideo = () => {
  return useQuery({
    queryKey: ["getIntroVideo"],
    queryFn: () => GetIntroVideo(),
  });
};

export const useGetTrendingAudioBooks = () => {
  return useQuery({
    queryKey: ["getTrendinAudioBooks"],
    queryFn: () => GetTrendingAudioBooks(),
  });
};

export const useResendOTP = () => {
  return useMutation({
    mutationFn: ResendOTP,
  });
};

// Update School Profile
export const useUpdateSchProfile = () => {
  return useMutation({
    mutationFn: UpdateSchProfile,
  });
};

export const useUpdateParentProfile = () => {
  return useMutation({
    mutationFn: UpdateParentProfile,
  });
};

// Get All the countrie
export const useGetCountries = () => {
  return useQuery({ queryKey: ["GetCountries"], queryFn: GetCountries });
};

// Get All the countrie
export const useGetStates = () => {
  return useQuery({ queryKey: ["GetStates"], queryFn: GetStates });
};

// GET QUIZ

export const useGetQuiz = (contentId: string) => {
  return useQuery({
    queryKey: ["GetQuiz", contentId],
    queryFn: () => GetQuiz(contentId),
    onSuccess: (response) => {
      console.log("quiz got called here", response);
    },
  });
};

export const useGetRecommendedVideo = (contentId: string) => {
  return useQuery({
    queryKey: ["GetRecommendedVideo", contentId],
    queryFn: () => GetRecommendedVideo(contentId),
  });
};

export const useVerifyPin = () => {
  return useMutation({
    mutationFn: VerifyPin,
  });
};

export const useUpdateSchoolNameAddress = () => {
  return useMutation({
    mutationFn: UpdateSchoolNameAddress,
  });
};

export const useUpdateSchImage = () => {
  return useMutation({
    mutationFn: UpdateSchImage,
  });
};

export const useUpdateParentImage = () => {
  return useMutation({
    mutationFn: UpdateParentImage,
  });
};

export const useGetPlans = () => {
  return useQuery({ queryKey: ["GetPlans"], queryFn: GetPlans });
};

export const usePayStackInit = () => {
  return useMutation({
    mutationFn: PayStackInit,
  });
};

export const useVerifyCompletePayStack = () => {
  return useMutation({
    mutationFn: VerifyCompletePayStack,
  });
};

export const useStripeInit = () => {
  return useMutation({
    mutationFn: StripeInit,
  });
};

export const useLikedContent = () => {
  return useMutation({
    mutationFn: LikedContent,
  });
};

export const useUnLikedContent = () => {
  return useMutation({
    mutationFn: UnLikedContent,
  });
};

// export const useGetLikedContent = () => {
//   return useQuery({ queryKey: ["GetLikedContent"], queryFn: GetLikedContent });
// };

export const useGetLikedContent = (profileId: string) => {
  return useQuery({
    queryKey: ["GetLikedContent", profileId],
    queryFn: () => GetLikedContent(profileId),
  });
};

export const useContentTracking = () => {
  return useMutation({
    mutationFn: ContentTracking,
  });
};

export const useAddTeacherData = () => {
  return useMutation({
    mutationFn: AddTeacherData,
  });
};

export const useAddClassData = () => {
  return useMutation({
    mutationFn: AddClassData,
  });
};

export const useConnectStudentData = () => {
  return useMutation({
    mutationFn: ConnectStudentData,
  });
};
export const useGetClassList = () => {
  return useQuery({ queryKey: ["GetClassList"], queryFn: GetClassList });
};

export const useGetSchool = () => {
  return useQuery({ queryKey: ["GetSchool"], queryFn: GetSchool });
};

export const useGetTeacherList = () => {
  return useQuery({ queryKey: ["GetTeacherList"], queryFn: GetTeacherList });
};

export const useGetAdmittedStudentsInSchool = () => {
  return useQuery({
    queryKey: ["GetStudents"],
    queryFn: GetAdmittedStudentsInSchool,
  });
};

export const useGetOngoingContents = (profileId: string) => {
  return useQuery({
    queryKey: ["GetOngoingContents", profileId],
    queryFn: () => GetOngoingContents(profileId),
  });
};

export const useGetAttemptStudentConnect = () => {
  return useQuery({
    queryKey: ["GetAttemptStudentConnect"],
    queryFn: GetAttemptStudentConnect,
  });
};

export const useReAssignTeacher = () => {
  return useMutation({
    mutationFn: ReAssignTeacher,
  });
};

export const useGetCompletedContents = (profileId: string) => {
  return useQuery({
    queryKey: ["GetCompletedContents", profileId],
    queryFn: () => GetCompletedContents(profileId),
  });
};

export const useGetContentsLog = (profileId: string) => {
  return useQuery({
    queryKey: ["GetOngoingForParent", profileId],
    queryFn: () => GetContentsLog(profileId),
  });
};

export const useAcceptStudentAdmission = () => {
  return useMutation({
    mutationFn: AcceptStudentAdmission,
  });
};

export const useRejectStudentAdmission = () => {
  return useMutation({
    mutationFn: RejectStudentAdmission,
  });
};

export const useGetAdmittedStudentsInClass = () => {
  return useQuery({
    queryKey: ["GetAdmittedStudentsInClass"],
    queryFn: GetAdmittedStudentsInClass,
  });
};

export const useSaveQuiz = () => {
  return useMutation({
    mutationFn: SaveQuiz,
  });
};

export const useGetMainSearch = (param: string) => {
  return useQuery({
    queryKey: ["GetMainSearch", param],
    queryFn: () => GetMainSearch(param),
  });
};

// const {mutate, isLoading, isError} = useCreateSchoolUser();
