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
  EditClassName,
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
  VerifyPin,
  AllProgressContent,
  GetLicense,
  GetSchoolStudentStat,
  LearningHour,
  RecommendedAudiobooks,
  GetClassTotalTimeSpent,
  ConnectStripe,
  RemoveAccount,
  UpdateParentCountryPhone,
  UpdateProfileUserNameSchoolName,
  GetSuggestUserName,
  UserNameChecker,
  JoinSummerChallenge,
  GetSummerChallengeQuizzes,
  GetSummerQuiz,
  SubmmitSummerQuizQandA,
  SummerChallengeContentTracking,
  GetLeaderBoardList,
  GetSummerQuizAnswers,
} from "./api";
// import { TGetContentById } from "./types";
import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
// import { TProfileData } from "./types";
// import { AxiosResponse } from "axios";
import { selectAvatarType } from "@/pages/AfterParentSignIn/SelectProfile";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { ApiResponse, Tprofile } from "./types";

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
    mutationFn: SetTeacherPassword,
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
      console.log(res);
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

export const useGetContentById = (
  contentId: string,
  userId: string,
  open?: () => void,
  openConnnectedStudent?: () => void
) => {
  const [user] = useStore(getUserState);
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["getContentById", contentId, userId],
    queryFn: () => GetContentById(contentId, userId),
    onSuccess: (response: unknown) => {
      const res = response as ApiResponse<unknown>;
      const status = res.data.status;

      if (
        status === false ||
        res.data.message === "Number of allowed contents reached!"
      ) {
        if (user?.role === "user") {
          const currentProfile = sessionStorage.getItem("profileId");
          const profiles = sessionStorage.getItem("profiles");
          const storedArrayObject = JSON.parse(profiles as string);
          const currentProfileObj: Tprofile = storedArrayObject.find(
            (data: Tprofile) => data.id === Number(currentProfile)
          );
          if (currentProfileObj.student.status === "approved") {
            openConnnectedStudent && openConnnectedStudent();
          } else {
            navigate("/packages");
            notifications.show({
              title: `Notification`,
              message: res.data.message,
            });
          }
        } else if (user?.role === "schoolAdmin") {
          navigate("/kundakidsunlimited");
          notifications.show({
            title: `Notification`,
            message: res.data.message,
          });
        } else if (user?.role === "teacher") {
          open && open();
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

// export const useGetContebtBySubCategories = (
//   subId: string,
//   setAllSubCategoryContents:(prev:TStoryContent)=>void
// ) => {
//   const [activePage, setPage] = useState(1);

//   return useQuery({
//     queryKey: ["getContentBySubId", subId, activePage],
//     queryFn: () => GetContebtBySubCategories(subId, activePage.toString()),
//     onSuccess(data) {
//       if (activePage < Math.ceil(data?.data.data.totalRecord / 10)) {
//         setAllSubCategoryContents((prev:TStoryContent[]) => {
//           return[...prev, ...data?.data.data.records]});
//         setPage((prev) => prev++);
//       }else{
//         setAllSubCategoryContents((prev: TStoryContent) => [
//           ...prev,
//           ata?.data.data.records,
//         ]);

//       }
//     },
//   });
// };
export const useGetContebtBySubCategories2 = (id: string, page: string) => {
  return useQuery({
    queryKey: ["getContentBySubId2", id, page],
    queryFn: () => GetContebtBySubCategories(id, page),
  });
};

export const useGetContebtBySubCategories = (
  subId: string,
  inView?: boolean
  // setAllSubCategoryContents: (prev:TStoryContent) => void
) => {
  // const [activePage, setPage] = useState(1);

  return useInfiniteQuery({
    queryKey: ["getContentBySubId", subId],
    queryFn: ({ pageParam = 1 }) => GetContebtBySubCategories(subId, pageParam),
    enabled: inView,
    getNextPageParam: (lastPage, allPages) => {
      const allPagesArray = allPages?.reduce((prev, current) => {
        return prev.concat(current?.data?.records);
      }, []);
      return allPagesArray?.length < lastPage?.data?.totalRecord;
    },
    // getPreviousPageParam: (firstPage, allPages) =>} firstPage.prevCursor,
    // onSuccess: (data) => {
    //   if (data) {
    //     if (activePage < Math.ceil(data?.data.data.totalRecord / 10)) {
    //       setAllSubCategoryContents((prev: TStoryContent[]) => [
    //         ...prev,
    //         ...(data?.data.data.records || []),
    //       ]);
    //       setPage((prev) => prev + 1);
    //     } else {
    //       setAllSubCategoryContents((prev: TStoryContent[]) => [
    //         ...prev,
    //         ...(data?.data.data.records || []),
    //       ]);
    //     }
    //   }
    // },
  });
};

export const useSocialLogin = () => {
  return useMutation({
    mutationFn: SocialLogin,
  });
};

export const useGetAudioBoks = (inView: boolean) => {
  return useInfiniteQuery({
    queryKey: ["getAudioBooks"],
    queryFn: ({ pageParam = 1 }) => GetAudioBooks(pageParam),
    enabled: inView,
    getNextPageParam: (lastPage, allPages) => {
      const allPagesArray = allPages?.reduce((prev, current) => {
        return prev.concat(current?.data?.records);
      }, []);
      return allPagesArray?.length < lastPage?.data?.totalRecord;
    },
  });
  // return useQuery({
  //   queryKey: ["getAudioBooks", page],
  //   queryFn: () => GetAudioBooks(page),
  // });
};

export const useGetAudioBoks2 = (page: string) => {
  return useQuery({
    queryKey: ["getAudioBooks", page],
    queryFn: () => GetAudioBooks(page),
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
      return response;
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

export const useConnectStripe = () => {
  return useMutation({
    mutationFn: ConnectStripe,
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
export const useGetClassList = (status?: string, page?: string) => {
  return useQuery({
    queryKey: ["GetClassList", status, page],
    queryFn: () => GetClassList(status as string, page as string),
  });
};

export const useGetSchool = () => {
  return useQuery({ queryKey: ["GetSchool"], queryFn: GetSchool });
};

export const useGetTeacherList = (status?: string, page?: string) => {
  return useQuery({
    queryKey: ["GetTeacherList", status, page],
    queryFn: () => GetTeacherList(status as string, page as string),
  });
};

export const useGetAdmittedStudentsInSchool = (
  status: string,
  page?: string
) => {
  return useQuery({
    queryKey: ["GetStudents", status, page],
    queryFn: () =>
      GetAdmittedStudentsInSchool(status as string, page as string),
  });
};

export const useGetOngoingContents = (profileId: string) => {
  return useQuery({
    queryKey: ["GetOngoingContents", profileId],
    queryFn: () => GetOngoingContents(profileId),
  });
};

export const useGetAttemptStudentConnect = (check = true, page?: string) => {
  return useQuery({
    queryKey: ["GetAttemptStudentConnect", check, page],
    queryFn: () => GetAttemptStudentConnect(page as string),
    enabled: check,
  });
};

export const useGetAttemptAllStudentConnect = (check = true, page?: string) => {
  return useQuery({
    queryKey: ["GetAttemptAllStudentConnect", check, page],
    queryFn: () => GetAttemptAllStudentConnect(page as string),
    enabled: check,
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

export const useGetAdmittedStudentsInClass = (
  status: string,
  page?: string
) => {
  return useQuery({
    queryKey: ["GetAdmittedStudentsInClass", status, page],
    queryFn: () => GetAdmittedStudentsInClass(status, page as string),
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
};

export const useGetSchoolProfileForStudent = (payload = "") => {
  return useQuery({
    queryKey: ["get-profile-for-parent", payload],
    queryFn: () => GetSchoolProfileForStudent(payload),
    enabled: !!(payload.length > 0),
  });
};

export const useGetUpdatedProfile = () => {
  return useQuery({
    queryKey: ["GetUpdatedProfile"],
    queryFn: GetUpdatedProfile,
  });
};

export const useGetSchoolContentStat = (start: string, end: string) => {
  // const userObject = sessionStorage.getItem("user");
  // const storedObject = JSON.parse(userObject as string);
  return useQuery({
    queryKey: ["GetSchoolContentStat", start, end],
    queryFn: () => GetSchoolContentStat(start, end),
  });
};

export const useGetClassContentStat = (
  id: string,
  start: string,
  end: string
) => {
  return useQuery({
    queryKey: ["GetClassContentStat", id, start, end],
    queryFn: () => GetClassContentStat(id, start, end),
    enabled: !!Number(id),
  });
};

export const useActiveClass = () => {
  return useMutation({ mutationFn: ActiveClass });
};

export const useDisableClass = () => {
  return useMutation({ mutationFn: DisableClass });
};

export const useDisableSchoolStudent = () => {
  return useMutation({ mutationFn: DisableSchoolStudent });
};

export const useDisableSchoolTeacher = () => {
  return useMutation({ mutationFn: DisableSchoolTeacher });
};

export const useEnableSchoolTeacher = () => {
  return useMutation({ mutationFn: EnableSchoolTeacher });
};

export const useEditClassName = () => {
  return useMutation({ mutationFn: EditClassName });
};

export const useAllProgressContent = (id: number) => {
  return useQuery({
    queryKey: ["AllProgressContent", id],
    queryFn: () => AllProgressContent(id),
  });
};

export const useGetLicense = () => {
  return useQuery({ queryKey: ["GetLicense"], queryFn: GetLicense });
};

export const useGetSchoolStudentStat = (
  id: string,
  start: string,
  end: string
) => {
  return useQuery({
    queryKey: ["GetSchoolStudentStat", id, start, end],
    queryFn: () => GetSchoolStudentStat(id, start, end),
  });
};

export const useLearningHour = () => {
  return useMutation({ mutationFn: LearningHour });
};

export const useRecommendedAudiobooks = (id: string) => {
  return useQuery({
    queryKey: ["RecommendedAudiobooks", id],
    queryFn: () => RecommendedAudiobooks(id),
  });
};

export const useGetClassTotalTimeSpent = (
  id: string,
  start: string,
  end: string
) => {
  return useQuery({
    queryKey: ["GetClassTotalTimeSpent", id, start, end],
    queryFn: () => GetClassTotalTimeSpent(id, start, end),
    enabled: !!Number(id),
  });
};

export const useRemoveAccount = () => {
  return useMutation({ mutationFn: RemoveAccount });
};
// const {mutate, isLoading, isError} = useCreateSchoolUser();

export const useUpdateParentCountryPhone = () => {
  return useMutation({ mutationFn: UpdateParentCountryPhone });
};

export const useUpdateProfileUserNameSchoolName = () => {
  return useMutation({ mutationFn: UpdateProfileUserNameSchoolName });
};

export const useGetSuggestUserName = () => {
  return useMutation({ mutationFn: GetSuggestUserName });
};

export const useUserNameChecker = (username: string) => {
  const enabled = username?.trim() !== "";
  return useQuery({
    queryKey: ["UserNameChecker", username],
    queryFn: () => UserNameChecker(username),
    retry: false,
    enabled,
  });
};

export const useJoinSummerChallenge = () => {
  return useMutation({ mutationFn: JoinSummerChallenge });
};

export const useGetSummerChallengeQuizzes = (profileId: string) => {
  return useQuery({
    queryKey: ["GetSummerChallengeQuizzes", profileId],
    queryFn: () => GetSummerChallengeQuizzes(profileId),
  });
};

export const useGetSummerQuiz = (quizId: string, profileId: string) => {
  return useQuery({
    queryKey: ["GetQuiz", quizId, profileId],
    queryFn: () => GetSummerQuiz(quizId, profileId),
    onSuccess: (response) => {
      return response;
    },
  });
};

export const useSubmmitSummerQuizQandA = () => {
  return useMutation({ mutationFn: SubmmitSummerQuizQandA });
};

export const useSummerChallengeContentTracking = () => {
  return useMutation({ mutationFn: SummerChallengeContentTracking });
};

export const useGetLeaderBoardList = (pid?: string) => {
  return useQuery({
    queryKey: ["GetLeaderBoardList", pid],
    queryFn: () => GetLeaderBoardList(pid as string),
  });
};

export const useGetSummerQuizAnswers = (quizId: string, profileId: string) => {
  return useQuery({
    queryKey: ["GetSummerQuizAnswers", quizId, profileId],
    queryFn: () => GetSummerQuizAnswers(quizId, profileId),
  });
};
