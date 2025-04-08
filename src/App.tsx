import { useEffect, useState, lazy, Suspense, useLayoutEffect } from "react";
import { Center, Loader } from "@mantine/core";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Shop from "@/pages/Shop/Shop";
import "./App.css";
import ShoolHeader from "./common/User/SchoolHeader";
import HomeFooter from "./components/HomeFooter";
import HomeHeader from "./components/HomeHeader";
import Home from "./pages/Home/Home";
// import "@type/moengage/web-sdk";

import moengage from "@moengage/web-sdk";

import AudiobooksV2 from "./pages/AudioBooks/AudiobooksV2/AudiobooksV2";
import LandScapeModal from "./components/LandScapeModal";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Story } from "./pages/Stories/Stories";
import Videos from "./pages/AfricanLanguages/Videos";
import { Books } from "./pages/AudioBooks/AudioBooks";
import RefundPolicy from "./pages/RefundPolicy/RefundPolicy";
import SummerLandingPage from "./pages/SummerLandingPage/SummerLandingPage";
import PageInProduction from "./pages/PageInProduction/PageInProduction";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import SummerQuiz from "./pages/SummerQuiz/SummerQuiz";
import PreviewSummerChallengePage from "./pages/SummerQuiz/PreviewSummerChallengePage";
import SummerQuizLayout from "./pages/SummerQuiz/SummerQuizLayout";
import SchoolDashboardHeader from "./common/User/DashBoard/School/SchoolDashboardHeader";
import Settings from "./pages/DashBoard/SchoolDashBoard/Settings/Settings";
const VideoV2 = lazy(() => import("./pages/AfricanLanguages/VideosV2/VideoV2"));
const StoriesV2 = lazy(() => import("./pages/Stories/StoriesV2/StoriesV2"));
const DefaultTab = lazy(() => import("./pages/AfterParentSignIn/DefaultTab"));

// pages
// import Stories from "./pages/Stories/Stories";
// import useStore from "./store";
// import { getUserState } from "./store/authStore";
// import { googleSignIn } from "./auth/sdk";
// import BedTimeStories from "./pages/Stories/BedTimeStories";
// import Stories1 from "./pages/Stories/Stories1/Stories1";
// import { onAuthStateChanged } from "firebase/auth";
// import { TUser } from "./api/types";
// import TClasses from "@/pages/DashBoard/TeacherDashboard/Classes/Classes";
// import AfricanLanguages from "@/pages/AfricanLanguages/AfricanLanguages";
// import AudioBooks from "@/pages/AudioBooks/AudioBooks";
// import { auth } from "./firebase";
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const NewlyRegisteredUser = lazy(
  () =>
    import(
      "./pages/AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser"
    )
);
const ChoosePlan = lazy(() => import("./pages/ChoosePlan/ChoosePlan"));
const ForgotPassword = lazy(
  () => import("./pages/ForgotPassword/ForgotPassword")
);
// const Home = lazy(() => import("./pages/Home/Home"));
const MakePayment = lazy(() => import("./pages/MakePayment/MakePayment"));
const NewPassword = lazy(() => import("./pages/NewPassword/NewPassword"));
const ParentSignup = lazy(() => import("./pages/ParentSignup/ParentSignup"));
const Parents = lazy(() => import("./pages/Parents/Parents"));
const PasswordCongratulations = lazy(
  () => import("./pages/PasswordCongratulations/PasswordCongratulations")
);
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
const KundaKidsUnlimited = lazy(
  () => import("./pages/SchoolSignup/KundaKidsUnlimited/KundaKidsUnlimited")
);
const SchoolSignup = lazy(() => import("./pages/SchoolSignup/SchoolSignup"));
const SchoolVerification = lazy(
  () => import("./pages/SchoolSignup/SchoolVerification/SchoolVerification")
);
const Schools = lazy(() => import("./pages/Schools/Schools"));
const SecureAccount = lazy(() => import("./pages/SecureAccount/SecureAccount"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const TeacherLayout = lazy(
  () => import("@/common/User/DashBoard/Teachers/TeacherLayout")
);
const Classes = lazy(
  () => import("@/pages/DashBoard/SchoolDashBoard/Classes/Classes")
);
const Main = lazy(() => import("@/pages/DashBoard/SchoolDashBoard/Main/Main"));
const StudentProfile = lazy(
  () => import("@/pages/DashBoard/SchoolDashBoard/Students/Profile")
);
const Students = lazy(
  () => import("@/pages/DashBoard/SchoolDashBoard/Students/Students")
);
const Teachers = lazy(
  () => import("@/pages/DashBoard/SchoolDashBoard/Teachers/Teachers")
);
const TStudents = lazy(
  () => import("@/pages/DashBoard/TeacherDashboard/Students/Students")
);
const SchoolLayout = lazy(
  () => import("./common/User/DashBoard/School/SchoolLayout")
);
const MyList = lazy(() => import("./pages/MyList/MyList"));
const ProgressReport = lazy(
  () => import("./pages/ProgressReport/ProgressReport")
);
const TMain = lazy(
  () => import("@/pages/DashBoard/TeacherDashboard/Main/Main")
);

const ScrollToTop = lazy(() => import("@/components/ScrollToTop"));
const AccountLayout = lazy(() => import("./pages/Account/AccountLayout"));
const SettingPassword = lazy(() => import("./pages/Account/AccountPassword"));
const Billing = lazy(() => import("./pages/Account/Billing"));
const MyKids = lazy(() => import("./pages/Account/MyKids"));
const Profile = lazy(() => import("./pages/Account/Profile"));
const SubscriptionPlan = lazy(() => import("./pages/Account/Subscriptionplan"));
const ChildProfileSetUp = lazy(
  () => import("./pages/AfterParentSignIn/ChildProfileSetUp")
);
const ParentHomePage = lazy(
  () => import("./pages/AfterParentSignIn/ParentHomePage")
);
const SelectProfile = lazy(
  () => import("./pages/AfterParentSignIn/SelectProfile")
);
const PaymentCongratulations = lazy(
  () => import("./pages/MakePayment/PaymentCompletedContent")
);
const SecureAdminPortal = lazy(
  () => import("./pages/SchoolSignup/SecureAdminPortal/SecureAdminPortal")
);
const SchoolRquest = lazy(
  () => import("@/pages/DashBoard/SchoolDashBoard/Request/Request")
);
const TeacherSignup = lazy(() => import("@/pages/TeacherLogin/index"));
const Request = lazy(
  () => import("./pages/DashBoard/TeacherDashboard/Request/Request")
);
const Stories1 = lazy(() => import("./pages/Stories/Stories1/Stories1"));

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));

const BookLayout = lazy(() => import("./pages/AudioBooks/BookLayout"));
const VideoPlayer = lazy(() => import("./pages/AfricanLanguages/VideoPlayer"));
const Quiz = lazy(() => import("./pages/Stories/Stories1/Quiz"));
const DefaultSchoolTab = lazy(
  () =>
    import("./pages/AfterSchoolSignIn/User/NewlyRegisterUser/DefautSchoolTab")
);

const Login = lazy(() => import("./pages/Login/Login"));
const HomeNewsLetter = lazy(() => import("./components/HomeNewsLetter"));
// import moengage from "@moengage/web-sdk

function App() {
  // const [user] = useStore(getUserState);
  moengage.initialize({ app_id: "O8E62027IMB0O72W0PJ0MG5Y", cluster: "DC_2" });

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     const res = currentUser as TUser;

  //     if (currentUser) {
  //       // setUser({ ...res, ...user });
  //     }
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  //   // eslint-disable-next-line
  // }, []);
  const [childProfile, setChildProfile] = useState<string>(
    (sessionStorage.getItem("profileId")
      ? sessionStorage.getItem("profileId")
      : "") as string
  );
  useEffect(() => {
    sessionStorage.setItem("profileId", childProfile as string);
  }, [childProfile]);

  const [opened, { open, close }] = useDisclosure(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      const path = location.pathname;

      const isPolicyPath = path.includes("privacy-policy");
      const isSummerPath = path.includes("summer-challenge");
      const isDevPath = path.includes("dev");

      const isRefundPolicyPath = path.includes("refund-policy");
      if (isPolicyPath || isRefundPolicyPath || isSummerPath || isDevPath)
        return;
      if (window.innerWidth < window.innerHeight) {
        open();
      } else {
        close();
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
      window.removeEventListener("DomContentLoaded", handleResize);
    };
    // eslint-disable-next-line
  }, []);

  // Example usage

  return (
    <>
      <Modal
        radius={6}
        size="md"
        opened={opened}
        onClose={close}
        overlayProps={{
          opacity: 0.85,
          blur: 3,
        }}
        closeButtonProps={{ size: "lg" }}
        centered
        closeOnClickOutside={false}
        withCloseButton={false}
      >
        <LandScapeModal />
      </Modal>
      <div className="App ">
        <ScrollToTop />
        {/* <Button onClick={log}></Button> */}
        <Suspense
          fallback={
            <Center h="100vh" maw={"100%"}>
              <Loader color="#9FC43E" size={100} />
            </Center>
          }
        >
          <Routes>
            {/* Routes Before Login */}
            <Route path="/">
              {/* <Route index element={<Login />} ></Route> */}

              <Route
                index
                element={
                  <>
                    <Login />
                  </>
                }
              ></Route>
              <Route
                path="summer-challenge"
                element={<SummerLandingPage />}
              ></Route>
              <Route path="privacy-policy" element={<PrivacyPolicy />}></Route>
              <Route path="refund-policy" element={<RefundPolicy />}></Route>
              <Route path="dev" element={<PageInProduction />}></Route>

              <Route element={<WebLayout />}>
                {/* <Route index element={<Navigate to="login" replace />}></Route> */}
                <Route index element={<Home />}></Route>
                <Route path="home" element={<Home />}></Route>
                <Route path="parents" element={<Parents />}></Route>
                <Route path="schools" element={<Schools />}></Route>
              </Route>

              <Route element={<WebLayoutNoNewsLetter />}>
                <Route path="aboutus" element={<AboutUs />}></Route>
                <Route path="shop" element={<Shop />}></Route>
              </Route>

              {/* Routes for School Teaher and Parent After  login */}
              <Route
                element={
                  <AppLayout
                    childProfile={childProfile}
                    setChildProfile={setChildProfile}
                  />
                }
              >
                {/* <Route path="newlyregistereduser/*"> */}

                {/* School content Routes */}
                <Route path="school/*">
                  <Route element={<NewlyRegisteredUser />}>
                    <Route index element={<DefaultSchoolTab />}></Route>
                    <Route path="stories" element={<StoriesV2 />} />
                    <Route path="audiobooks" element={<AudiobooksV2 />}></Route>
                    <Route path="languages" element={<VideoV2 />}></Route>
                  </Route>

                  <Route
                    path="stories/:sub/:title"
                    element={<Stories1 />}
                  ></Route>

                  <Route path="stories/:sub" element={<Story />}></Route>
                  <Route
                    path="stories/:sub/:title/quiz"
                    element={<Quiz />}
                  ></Route>

                  <Route
                    path="audiobooks/:sub/:title"
                    element={<BookLayout />}
                  ></Route>
                  <Route path="audiobooks/:sub" element={<Books />}></Route>

                  <Route
                    path="languages/:sub/:title"
                    element={<VideoPlayer />}
                  ></Route>
                  <Route path="languages/:sub" element={<Videos />}></Route>
                </Route>

                <Route path="mylist" element={<MyList />}></Route>
                <Route path="leaderboard" element={<LeaderBoard />}></Route>

                <Route path="summer-quiz/*">
                  <Route index element={<SummerQuiz />} />
                  <Route
                    path="preview-summer-challenge"
                    element={<PreviewSummerChallengePage />}
                  />
                  <Route
                    path="summer-challenge-quiz"
                    element={<SummerQuizLayout />}
                  />
                </Route>

                <Route
                  path="progressreport"
                  element={<ProgressReport />}
                ></Route>

                {/* Parent Content Routes  */}

                <Route path="parent/*">
                  <Route
                    element={
                      <ParentHomePage
                        childProfile={childProfile}
                        // setChildProfile={setChildProfile}
                      />
                    }
                  >
                    <Route index element={<DefaultTab />}></Route>

                    <Route path="stories" element={<StoriesV2 />} />
                    <Route path="audiobooks" element={<AudiobooksV2 />}></Route>
                    <Route path="languages" element={<VideoV2 />}></Route>
                  </Route>
                  <Route
                    path="stories/:sub/:title"
                    element={<Stories1 />}
                  ></Route>
                  <Route path="stories/:sub" element={<Story />}></Route>
                  <Route
                    path="stories/:sub/:title/quiz"
                    element={<Quiz />}
                  ></Route>

                  <Route
                    path="audiobooks/:sub/:title"
                    element={<BookLayout />}
                  ></Route>
                  <Route path="audiobooks/:sub" element={<Books />}></Route>
                  <Route
                    path="languages/:sub/:title"
                    element={<VideoPlayer />}
                  ></Route>
                  <Route path="languages/:sub" element={<Videos />}></Route>
                </Route>

                {/* ///////////////School Dashboard////////////// */}
                {/* <Route path="schooldashboard/*" element={<SchoolLayout />}>
                  <Route index element={<Main />}></Route>
                  <Route path="teacher" element={<Teachers />}></Route>
                  <Route path="student/*">
                    <Route index element={<Students />} />
                    <Route
                      path="profile/:studentId"
                      element={<StudentProfile />}
                    ></Route>
                  </Route>
                  <Route path="classes" element={<Classes />}></Route>
                  <Route path="request" element={<SchoolRquest />}></Route>

                </Route> */}

                {/* Teacher Teacher Teacher Teacher DashBoard */}

                <Route path="teacherdashboard/*" element={<TeacherLayout />}>
                  <Route index element={<TMain />}></Route>
                  <Route path="student/*">
                    <Route index element={<TStudents />} />
                    <Route
                      path="profile/:studentId"
                      element={<StudentProfile />}
                    ></Route>
                  </Route>
                  <Route path="request" element={<Request />}></Route>
                </Route>

                {/* Account */}
                <Route path="account/*" element={<AccountLayout />}>
                  <Route index element={<Profile />}></Route>
                  <Route path="mykids" element={<MyKids />}></Route>
                  <Route
                    path="subscriptionplan"
                    element={<SubscriptionPlan />}
                  ></Route>
                  <Route path="billing" element={<Billing />}></Route>
                  <Route
                    path="accountpassword"
                    element={<SettingPassword />}
                  ></Route>
                </Route>
              </Route>

              {/* school Routes after sign up or login */}

              <Route element={<SchoolAppLayout />}>
                <Route path="schooldashboard/*" element={<SchoolLayout />}>
                  <Route index element={<Main />}></Route>
                  <Route path="teacher" element={<Teachers />}></Route>
                  <Route path="student/*">
                    <Route index element={<Students />} />
                    <Route
                      path="profile/:studentId"
                      element={<StudentProfile />}
                    ></Route>
                  </Route>
                  <Route path="classes" element={<Classes />}></Route>
                  <Route path="request" element={<SchoolRquest />}></Route>
                  <Route path="settings" element={<Settings />}></Route>
                  <Route
                    path="content-library/*"
                    element={<NewlyRegisteredUser />}
                  >
                    {" "}
                    <Route index element={<DefaultSchoolTab />}></Route>
                    <Route path="stories" element={<StoriesV2 />} />
                    <Route path="audiobooks" element={<AudiobooksV2 />}></Route>
                    <Route path="languages" element={<VideoV2 />}></Route>
                  </Route>

                  {/* <Route path="setting" element={<Setting />}></Route> */}
                </Route>
              </Route>

              {/* Login and Signup Routes And all Single  Route */}

              {/* Login & Forgot password Routes */}
              <Route path="login" element={<Login />}></Route>
              <Route path="forgotpassword" element={<ForgotPassword />}></Route>
              <Route path="resetpassword" element={<ResetPassword />}></Route>
              <Route path="newpassword" element={<NewPassword />}></Route>
              <Route
                path="passwordcongratulations"
                element={<PasswordCongratulations />}
              ></Route>
              <Route path="signup" element={<Signup />}></Route>

              {/* School sign up Routes */}
              <Route path="schoolsignup" element={<SchoolSignup />}></Route>
              <Route
                path="schoolverification"
                element={<SchoolVerification />}
              ></Route>
              <Route
                path="secureadminportal"
                element={<SecureAdminPortal />}
              ></Route>
              <Route
                path="kundakidsunlimited"
                element={<KundaKidsUnlimited />}
              ></Route>

              {/* Parent sign up routes */}
              <Route path="parentsignup" element={<ParentSignup />}></Route>
              <Route path="secureaccount" element={<SecureAccount />}></Route>
              <Route path="makepayment" element={<MakePayment />}></Route>
              <Route
                path="congratulations"
                element={<PaymentCongratulations />}
              ></Route>

              <Route path="packages" element={<ChoosePlan />}></Route>
              <Route
                path="childprofilesetup"
                element={
                  <ChildProfileSetUp setChildProfile={setChildProfile} />
                }
              ></Route>

              <Route
                path="selectprofile"
                element={<SelectProfile setChildProfile={setChildProfile} />}
              ></Route>
              <Route path="passwordsetup" element={<TeacherSignup />}></Route>
            </Route>
          </Routes>
        </Suspense>
      </div>
    </>
    // </BrowserRouter>
  );
}

export default App;

const WebLayout = () => {
  const isLogin = useLocation().pathname === "/";

  return isLogin ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <>
      <HomeHeader />
      <Outlet />
      <HomeNewsLetter />
      <HomeFooter />
    </>
  );
};

const WebLayoutNoNewsLetter = () => {
  return (
    <>
      <HomeHeader />
      <Outlet />
      <HomeFooter />
    </>
  );
};

const AppLayout = ({
  childProfile,
  setChildProfile,
}: {
  childProfile: string;
  setChildProfile: (val: string) => void;
}) => {
  return (
    <>
      <ShoolHeader
        childProfile={childProfile}
        setChildProfile={setChildProfile}
      />
      <Outlet />
    </>
  );
};

const SchoolAppLayout = () => {
  return (
    <>
      <div>
        <SchoolDashboardHeader />
      </div>
      <Outlet />
    </>
  );
};
