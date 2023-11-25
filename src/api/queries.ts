import {
  AcceptStudentAdmission,
  ActiveClass,
  AddClassData,
  AddTeacherData,
  CancelSubscription,
  ConnectStudentData,
  ContentForHome,
  ContentTracking,
  DisableClass,
  DisableSchoolStudent,
  DisableSchoolTeacher,
  EnableSchoolTeacher,
  ForgotPassword,
  GetAdmittedStudentsInClass,
  GetAdmittedStudentsInSchool,
  GetAttemptAllStudentConnect,
  GetAttemptStudentConnect,
  GetAudioBooks,
  GetAvatars,
  GetClassContentStat,
  GetClassList,
  GetCompletedContents,
  GetContebtBySubCategories,
  GetContentById,
  GetContentsLog,
  GetCountries,
  GetIntroVideo,
  GetLikedContent,
  GetMainSearch,
  GetOngoingContents,
  GetPlans,
  GetProfile,
  GetQuiz,
  GetRecommendedVideo,
  GetSchool,
  GetSchoolContentStat,
  GetSchoolProfileForStudent,
  GetStates,
  GetSubCategories,
  GetTeacherList,
  GetTrendingAudioBooks,
  GetUpdatedProfile,
  LikedContent,
  Login,
  ParentSignUp,
  PayStackInit,
  Profile,
  ReAssignTeacher,
  RejectStudentAdmission,
  ResendOTP,
  ResetPassword,
  SaveQuiz,
  SchoolSignUp,
  SecurePortal,
  SetPassword,
  SetTeacherPassword,
  SocialLogin,
  SocialSignUp,
  StripeInit,
  UnLikedContent,
  UpdateParentImage,
  UpdateParentProfile,
  UpdatePassword,
  UpdateProfile,
  UpdateSchImage,
  UpdateSchProfile,
  UpdateSchoolNameAddress,
  VerifyCompletePayStack,
  VerifyOtp,
  VerifyPin
} from "./api";
// import { TGetContentById } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { TProfileData } from "./types";
// import { AxiosResponse } from "axios";
import { selectAvatarType } from "@/pages/AfterParentSignIn/SelectProfile";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "./types";

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

// Set Teacher password
export const useTeacherSetPassword = () => {
  return useMutation({
    mutationFn: SetTeacherPassword ,
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
  enabled?: boolean,
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

export const useGetContentById = (contentId: string, userId: string, open?:()=>void) => {
  const [user] = useStore(getUserState);
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["getContentById", contentId, userId],
    queryFn: () => GetContentById(contentId, userId),
    onSuccess: (response: unknown) => {
      const res = response as ApiResponse<unknown>;
      const status = res.data.status;
      console.log("response:", res);
      console.log("user,", user);
      console.log("navigate");

      if (
        status === false ||
        res.data.message === "Number of allowed contents reached!"
      ) {
        if (user?.role === "user") {
          console.log("hello-------");
          navigate("/packages");
          notifications.show({
            title: `Notification`,
            message: res.data.message,
          });
        } 
        else if (user?.role === "schoolAdmin") {
          navigate("/kundakidsunlimited");
          notifications.show({
            title: `Notification`,
            message: res.data.message,
          })
        }else if (user?.role === "teacher" ){
       open && open()
        }
      }
    },
  });
};

export const useGetSubCategories = () => {
  return useQuery({
    queryKey: ["getContentSubCategory"],
    queryFn: GetSubCategories,
  });
};

export const useGetContebtBySubCategories = (subId: string, page: string) => {
  return useQuery({
    queryKey: ["getContentBySubId", subId, page],
    queryFn: () => GetContebtBySubCategories(subId, page),
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
export const useGetClassList = (status? : string)=> {
  return useQuery({ queryKey: ["GetClassList", status], queryFn: ()=>GetClassList(status as string) });
};

export const useGetSchool = () => {
  return useQuery({ queryKey: ["GetSchool"], queryFn: GetSchool });
};

export const useGetTeacherList = (status? :string) => {
  return useQuery({ queryKey: ["GetTeacherList", status], queryFn:()=> GetTeacherList(status as string) });
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


export const useGetAttemptAllStudentConnect = () => {
  return useQuery({
    queryKey: ["GetAttemptAllStudentConnect"],
    queryFn: GetAttemptAllStudentConnect,
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

export const useCancelSubscription = () => {
  return useMutation({
    mutationFn: CancelSubscription,
  });
}


export const useGetSchoolProfileForStudent = (payload = "") => {
  return useQuery({ 
    queryKey : ["get-profile-for-parent", payload], 
    queryFn: ()=>GetSchoolProfileForStudent(payload), 
    enabled : !!(payload.length > 0)})
}

export const useGetUpdatedProfile = () => {
  return useQuery({queryKey:["GetUpdatedProfile"], queryFn:GetUpdatedProfile})
}

export const useGetSchoolContentStat = ()=>{
  return useQuery({queryKey:["GetSchoolContentStat"], queryFn:GetSchoolContentStat})
}


export const useGetClassContentStat = (payload:string)=>{
  return useQuery({queryKey:["GetClassContentStat", payload], queryFn:()=>GetClassContentStat(payload)})
}

export const useActiveClass = ()=>{
  return useMutation({mutationFn:ActiveClass})
}

export const useDisableClass = ()=>{
  return useMutation({mutationFn:DisableClass})
}

export const useDisableSchoolStudent = ()=>{
  return useMutation({mutationFn:DisableSchoolStudent})
}

export const useDisableSchoolTeacher = ()=>{
  return useMutation({mutationFn:DisableSchoolTeacher})
}

export const useEnableSchoolTeacher = ()=>{
  return useMutation({mutationFn:EnableSchoolTeacher})
}
// const {mutate, isLoading, isError} = useCreateSchoolUser();
