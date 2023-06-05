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
import SchoolVerification from "./pages/SchoolVerification/SchoolVerification";
import KundaKidsUnlimited from "./pages/KundaKidsUnlimited/KundaKidsUnlimited";
import ParentSignup from "./pages/ParentSignup/ParentSignup";
import SchoolCongrtulations from "@/pages/SchoolCongratulations/SchoolCongratulations";
import SecureAccount from "./pages/SecureAccount/SecureAccount";
import MakePayment from "./pages/MakePayment/MakePayment";
import Unlimited from "./pages/KundaKidsUnlimited2/Unlimited";
import Schools from "./pages/Schools/Schools";
import AboutUs from "./pages/AboutUs/AboutUs";
// import SchoolMainDashBoard from "./pages/DashBoard/SchoolDashBoard/SchoolMainDashboard";
import UserHeader from "./common/User/UserHeader";
import NewlyRegisteredUser from "./pages/User/NewlyRegisterUser/NewlyRegisteredUser";
import ExistingUserNotPaid from "./pages/User/ExistingUserNotPaid/ExistingUserNotPaid";
import PaidUser from "./pages/User/PaidUser/PaidUser";
import LibraryNotPaid from "./pages/Library/LibraryNotPaid/LibraryNotPaid";
import LibraryPaid from "./pages/Library/LibraryPaid/LibraryPaid";
import Stories from "./pages/Stories/Stories";
import BedTimeStories from "./pages/Stories/BedTimeStories";
import Stories1 from "./pages/Stories/Stories1/Stories1";
import MyList from "./pages/MyList/MyList";
import ProgressReport from "./pages/ProgressReport/ProgressReport";
import SchoolHeader from "./common/User/DashBoard/School/SchoolHeader";
import Main from "@/pages/DashBoard/SchoolDashBoard/Main/Main";
import SchoolLayout from "./common/User/DashBoard/School/SchoolLayout";
import Setting from "@/pages/DashBoard/SchoolDashBoard/Settings/Settings";
import Teachers from "@/pages/DashBoard/SchoolDashBoard/Teachers/Teachers";
import Classes from "@/pages/DashBoard/SchoolDashBoard/Classes/Classes";
import Students from "@/pages/DashBoard/SchoolDashBoard/Students/Students";
import StudentProfile from "@/pages/DashBoard/SchoolDashBoard/Students/Profile";
// import Setting from "./common/User/DashBoard/Setting"
function App() {
  return (
    <BrowserRouter>
      <div className="App ">
        <Routes>
          <Route path="/">
            <Route element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path="parents" element={<Parents />}></Route>
              <Route path="schools" element={<Schools />}></Route>
              <Route path="aboutus" element={<AboutUs />}></Route>
            </Route>
            <Route element={<Layout2 />}>
              <Route
                path="newlyregistereduser"
                element={<NewlyRegisteredUser />}
              ></Route>

              <Route
                path="existingusernotpaid"
                element={<ExistingUserNotPaid />}
              ></Route>

              <Route path="paidUser" element={<PaidUser />}></Route>
              <Route path="librarynotpaid" element={<LibraryNotPaid />}></Route>
              <Route path="librarypaid" element={<LibraryPaid />}></Route>
              <Route path="stories" element={<Stories />}></Route>
              <Route path="bedtimestories" element={<BedTimeStories />}></Route>
              <Route path="stories1/:id" element={<Stories1 />}></Route>
              <Route path="mylist" element={<MyList />}></Route>
              <Route path="progressreport" element={<ProgressReport />}></Route>
            </Route>

            <Route element={<Layout3 />}>
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

            <Route path="login" element={<Login />}></Route>
            <Route path="forgotpassword" element={<ForgotPassword />}></Route>
            <Route path="resetpassword" element={<ResetPassword />}></Route>
            <Route path="newpassword" element={<NewPassword />}></Route>
            <Route
              path="passwordcongratulations"
              element={<PasswordCongratulations />}
            ></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="schoolsignup" element={<SchoolSignup />}></Route>
            <Route
              path="schoolverification"
              element={<SchoolVerification />}
            ></Route>
            <Route
              path="kundakidsunlimited"
              element={<KundaKidsUnlimited />}
            ></Route>
            <Route
              path="kundakidsunlimited"
              element={<KundaKidsUnlimited />}
            ></Route>
            <Route path="parentsignup" element={<ParentSignup />}></Route>
            <Route path="parentsignup" element={<ParentSignup />}></Route>
            <Route path="parentsignup" element={<ParentSignup />}></Route>
            <Route path="parentsignup" element={<ParentSignup />}></Route>
            <Route path="secureaccount" element={<SecureAccount />}></Route>
            <Route path="makepayment" element={<MakePayment />}></Route>
            <Route path="packages" element={<Unlimited />}></Route>
            {/* <Route path="schoolmaindashboard" element={<SchoolMainDashBoard />}></Route> */}

            <Route
              path="schoolcongratulations"
              element={<SchoolCongrtulations />}
            ></Route>
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

const Layout2 = () => {
  return (
    <>
      <UserHeader />
      <Outlet />
    </>
  );
};

const Layout3 = () => {
  return (
    <>
      <SchoolHeader />
      <Outlet />
    </>
  );
};
