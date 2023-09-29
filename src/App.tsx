import "./App.css";
import Home from "./pages/Home/Home";
import Parents from "./pages/Parents/Parents";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomeFooter from "./components/HomeFooter";
import HomeHeader from "./components/HomeHeader";
import HomeNewsLetter from "./components/HomeNewsLetter";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import NewPassword from "./pages/NewPassword/NewPassword";
import PasswordCongratulations from "./pages/PasswordCongratulations/PasswordCongratulations";
import Signup from "./pages/Signup/Signup";
import SchoolSignup from "./pages/SchoolSignup/SchoolSignup";
import SchoolVerification from "./pages/SchoolSignup/SchoolVerification/SchoolVerification";
import KundaKidsUnlimited from "./pages/SchoolSignup/KundaKidsUnlimited/KundaKidsUnlimited";
import ParentSignup from "./pages/ParentSignup/ParentSignup";
import SchoolCongrtulations from "@/pages/SchoolSignup/SchoolCongratulations/SchoolCongratulations";
import SecureAccount from "./pages/SecureAccount/SecureAccount";
import MakePayment from "./pages/MakePayment/MakePayment";
import ChoosePlan from "./pages/ChoosePlan/ChoosePlan";
import Schools from "./pages/Schools/Schools";
import AboutUs from "./pages/AboutUs/AboutUs";
import Shop from "@/pages/Shop/Shop";
import ShoolHeader from "./common/User/SchoolHeader";
import NewlyRegisteredUser from "./pages/AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import ExistingUserNotPaid from "./pages/AfterSchoolSignIn/User/ExistingUserNotPaid/ExistingUserNotPaid";
import PaidUser from "./pages/AfterSchoolSignIn/User/PaidUser/PaidUser";
import LibraryNotPaid from "./pages/Library/LibraryNotPaid/LibraryNotPaid";
import LibraryPaid from "./pages/Library/LibraryPaid/LibraryPaid";
import Stories from "./pages/Stories/Stories";
// import BedTimeStories from "./pages/Stories/BedTimeStories";
// import Stories1 from "./pages/Stories/Stories1/Stories1";
import MyList from "./pages/MyList/MyList";
import ProgressReport from "./pages/ProgressReport/ProgressReport";
import Main from "@/pages/DashBoard/SchoolDashBoard/Main/Main";
import SchoolLayout from "./common/User/DashBoard/School/SchoolLayout";
import Teachers from "@/pages/DashBoard/SchoolDashBoard/Teachers/Teachers";
import Classes from "@/pages/DashBoard/SchoolDashBoard/Classes/Classes";
import Students from "@/pages/DashBoard/SchoolDashBoard/Students/Students";
import StudentProfile from "@/pages/DashBoard/SchoolDashBoard/Students/Profile";
import TeacherLayout from "@/common/User/DashBoard/Teachers/TeacherLayout";
import TStudents from "@/pages/DashBoard/TeacherDashboard/Students/Students";
// import TClasses from "@/pages/DashBoard/TeacherDashboard/Classes/Classes";
import TMain from "@/pages/DashBoard/TeacherDashboard/Main/Main";
import AccountLayout from "./pages/Account/AccountLayout";
import Profile from "./pages/Account/Profile";
import SettingPassword from "./pages/Account/AccountPassword";
import Billing from "./pages/Account/Billing";
import MyKids from "./pages/Account/MyKids";
import SubscriptionPlan from "./pages/Account/Subscriptionplan";
import SecureAdminPortal from "./pages/SchoolSignup/SecureAdminPortal/SecureAdminPortal";
import ParentHomePage from "./pages/AfterParentSignIn/ParentHomePage";
import SelectProfile from "./pages/AfterParentSignIn/SelectProfile";
import ChildProfileSetUp from "./pages/AfterParentSignIn/ChildProfileSetUp";
import AudioBooks from "@/pages/AudioBooks/AudioBooks";
import AfricanLanguages from "@/pages/AfricanLanguages/AfricanLanguages";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import useStore from "./store";
import { auth } from "./firebase";
import { getUserState } from "./store/authStore";
import PaymentCongratulations from "./pages/MakePayment/PaymentCompletedContent";
import { TUser } from "./api/types";
// import { googleSignIn } from "./auth/sdk";
import Request from "./pages/DashBoard/TeacherDashboard/Request/Request";
import TeacherSignup from "@/pages/TeacherLogin/index";
import SchoolRquest from "@/pages/DashBoard/SchoolDashBoard/Request/Request";

function App() {
  const [, setUser] = useStore(getUserState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const res = currentUser as TUser;
      if (currentUser) {
        setUser(res);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <BrowserRouter>
      {/* <div className="App max-w-[1444px] mx-auto "></div> */}
      <div className="App ">
        <ScrollToTop />
        {/* <Button onClick={log}></Button> */}
        <Routes>
          {/* Routes Before Login */}
          <Route path="/">
            <Route element={<WebLayout />}>
              <Route index element={<Home />}></Route>
              <Route path="parents" element={<Parents />}></Route>
              <Route path="schools" element={<Schools />}></Route>
            </Route>

            <Route element={<WebLayoutNoNewsLetter />}>
              <Route path="aboutus" element={<AboutUs />}></Route>
              <Route path="shop" element={<Shop />}></Route>
            </Route>

            {/* Routes for School Teaher and Parent After  login */}
            <Route element={<AppLayout />}>
              {/* <Route path="newlyregistereduser/*"> */}
              <Route path="school/*">
                <Route index element={<NewlyRegisteredUser />}></Route>
                <Route path=":category/*" element={<Stories />}></Route>
                <Route path="audiobooks/*" element={<AudioBooks />}></Route>
                <Route
                  path="africanlanguages/*"
                  element={<AfricanLanguages />}
                ></Route>
              </Route>
              <Route
                path="existingusernotpaid"
                element={<ExistingUserNotPaid />}
              ></Route>
              <Route path="paiduser" element={<PaidUser />}></Route>

              <Route path="librarynotpaid/*">
                <Route index element={<LibraryNotPaid />}></Route>
                <Route path=":category/*" element={<Stories />}></Route>
                <Route path="audiobooks/*" element={<AudioBooks />}></Route>
                <Route
                  path="africanlanguages/*"
                  element={<AfricanLanguages />}
                ></Route>
              </Route>
              <Route path="librarypaid" element={<LibraryPaid />}></Route>
              {/* <Route path="stories" element={<Stories />}></Route> */}
              {/* <Route path="bedtimestories" element={<BedTimeStories />}></Route> */}
              {/* <Route path="stories1/:id" element={<Stories1 />}></Route> */}
              <Route path="mylist" element={<MyList />}></Route>
              <Route path="progressreport" element={<ProgressReport />}></Route>

              {/* ///////  <Route path="parenthomepage///////*"> */}
              <Route path="parent/*">
                <Route index element={<ParentHomePage />}></Route>
                <Route path=":category/*" element={<Stories />}></Route>
                <Route path="audiobooks/*" element={<AudioBooks />}></Route>
                <Route
                  path="africanlanguages/*"
                  element={<AfricanLanguages />}
                ></Route>
              </Route>

              {/* ///////////////School Dashboard////////////// */}
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

                {/* <Route path="setting" element={<Setting />}></Route> */}
              </Route>
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
            <Route
              path="schoolcongratulations"
              element={<SchoolCongrtulations />}
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
              element={<ChildProfileSetUp />}
            ></Route>

            <Route path="selectprofile" element={<SelectProfile />}></Route>
            <Route path="passwordsetup" element={<TeacherSignup />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

const WebLayout = () => {
  return (
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

const AppLayout = () => {
  return (
    <>
      <ShoolHeader />
      <Outlet />
    </>
  );
};
