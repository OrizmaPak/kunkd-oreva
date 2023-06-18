// import { useState } from 'react'

import "./App.css";
import Home from "./pages/Home/Home";
import Parents from "./pages/Parents/Parents";
// import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
// import SchoolMainDashBoard from "./pages/DashBoard/SchoolDashBoard/SchoolMainDashboard";
import ShoolHeader from "./common/User/SchoolHeader";
import NewlyRegisteredUser from "./pages/AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import ExistingUserNotPaid from "./pages/AfterSchoolSignIn/User/ExistingUserNotPaid/ExistingUserNotPaid";
import PaidUser from "./pages/AfterSchoolSignIn/User/PaidUser/PaidUser";
import LibraryNotPaid from "./pages/Library/LibraryNotPaid/LibraryNotPaid";
import LibraryPaid from "./pages/Library/LibraryPaid/LibraryPaid";
import Stories from "./pages/Stories/Stories";
import BedTimeStories from "./pages/Stories/BedTimeStories";
import Stories1 from "./pages/Stories/Stories1/Stories1";
import MyList from "./pages/MyList/MyList";
import ProgressReport from "./pages/ProgressReport/ProgressReport";
import SchoolDashboardHeader from "@/common/User/DashBoard/School/SchoolDashboardHeader";
import Main from "@/pages/DashBoard/SchoolDashBoard/Main/Main";
import SchoolLayout from "./common/User/DashBoard/School/SchoolLayout";
import Setting from "@/pages/DashBoard/SchoolDashBoard/Settings/Settings";
import Teachers from "@/pages/DashBoard/SchoolDashBoard/Teachers/Teachers";
import Classes from "@/pages/DashBoard/SchoolDashBoard/Classes/Classes";
import Students from "@/pages/DashBoard/SchoolDashBoard/Students/Students";
import StudentProfile from "@/pages/DashBoard/SchoolDashBoard/Students/Profile";
// import Setting from "./common/User/DashBoard/Setting"
import TeacherLayout from "@/common/User/DashBoard/Teachers/TeacherLayout";
import TStudents from "@/pages/DashBoard/TeacherDashboard/Students/Students";
import TClasses from "@/pages/DashBoard/TeacherDashboard/Classes/Classes";
import TSettings from "@/pages/DashBoard/TeacherDashboard/Settings/Settings";
import TMain from "@/pages/DashBoard/TeacherDashboard/Main/Main";
import SettingsLayout from "./pages/Settings/SettingsLayout";
import Profile from "./pages/Settings/Profile";
import PaymentMethod from "./pages/Settings/PaymentMethod";
import Notification from "./pages/Settings/Notification";
import SubscriptionPlan from "./pages/Settings/Subscriptionplan";
import SecureAdminPortal from "./pages/SchoolSignup/SecureAdminPortal/SecureAdminPortal";
import ParentHeader from "@/common/User/ParentHeader";
import ParentHomePage from "./pages/AfterParentSignIn/ParentHomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App ">
        <Routes>
          {/* Routes Before Login */}
          <Route path="/">
            <Route element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path="parents" element={<Parents />}></Route>
              <Route path="schools" element={<Schools />}></Route>
            </Route>

            <Route element={<LayoutNoNewLetter />}>
              <Route path="aboutus" element={<AboutUs />}></Route>
              <Route path="shop" element={<Shop />}></Route>
            </Route>

            {/* Routes for School Teaher After  login */}
            <Route element={<Layout2 />}>
              <Route
                path="newlyregistereduser"
                element={<NewlyRegisteredUser />}
              ></Route>
              <Route
                path="existingusernotpaid"
                element={<ExistingUserNotPaid />}
              ></Route>
              <Route path="paiduser" element={<PaidUser />}></Route>
              <Route path="librarynotpaid" element={<LibraryNotPaid />}></Route>
              <Route path="librarypaid" element={<LibraryPaid />}></Route>
              <Route path="stories" element={<Stories />}></Route>
              <Route path="bedtimestories" element={<BedTimeStories />}></Route>
              <Route path="stories1/:id" element={<Stories1 />}></Route>
              <Route path="mylist" element={<MyList />}></Route>
              <Route path="progressreport" element={<ProgressReport />}></Route>

              {/* ///////////////////////////// */}
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
                <Route path="setting" element={<Setting />}></Route>
              </Route>
            </Route>

            {/* Routes for Parent After Login */}
            <Route element={<Layout4 />}>
              <Route path="parenthomepage" element={<ParentHomePage />}></Route>
              <Route path="librarynotpaid" element={<LibraryNotPaid />}></Route>
              <Route path="librarypaid" element={<LibraryPaid />}></Route>
              <Route path="stories" element={<Stories />}></Route>
              <Route path="bedtimestories" element={<BedTimeStories />}></Route>
              <Route path="stories1/:id" element={<Stories1 />}></Route>
              <Route path="mylist" element={<MyList />}></Route>
              <Route path="progressreport" element={<ProgressReport />}></Route>
            </Route>

            {/* Dasboard Routes */}
            <Route element={<Layout3 />}>
              {/* School Dashboard */}
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
                <Route path="setting" element={<Setting />}></Route>
              </Route> */}

              {/* Teacher Dashboard */}
              <Route path="teacherdashboard/*" element={<TeacherLayout />}>
                <Route index element={<TMain />}></Route>
                <Route path="student/*">
                  <Route index element={<TStudents />} />
                </Route>
                <Route path="classes" element={<TClasses />}></Route>
                <Route path="setting" element={<TSettings />}></Route>
              </Route>

              {/* Seetings */}

              <Route path="settings/*" element={<SettingsLayout />}>
                <Route index element={<Profile />}></Route>
                <Route path="paymentmethod" element={<PaymentMethod />}></Route>
                <Route
                  path="subscriptionplan"
                  element={<SubscriptionPlan />}
                ></Route>
                <Route path="notification" element={<Notification />}></Route>
                <Route path="paymentmethod" element={<PaymentMethod />}></Route>
              </Route>
            </Route>

            {/* Login and Signup Routes */}

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
            <Route path="packages" element={<ChoosePlan />}></Route>
            {/* <Route path="schoolmaindashboard" element={<SchoolMainDashBoard />}></Route> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

const Layout = () => {
  return (
    <>
      <HomeHeader />
      <Outlet />
      <HomeNewsLetter />
      <HomeFooter />
    </>
  );
};

const LayoutNoNewLetter = () => {
  return (
    <>
      <HomeHeader />
      <Outlet />

      <HomeFooter />
    </>
  );
};

const Layout2 = () => {
  return (
    <>
      <ShoolHeader />
      <Outlet />
    </>
  );
};

const Layout4 = () => {
  return (
    <>
      <ParentHeader />
      <Outlet />
    </>
  );
};

const Layout3 = () => {
  return (
    <>
      <SchoolDashboardHeader />
      <Outlet />
    </>
  );
};
