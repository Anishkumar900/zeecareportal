import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Home/HomePage";
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import ForgetPassword from './Authentication/ForgetPassword';
import AboutUsPage from './AboutUs/AboutUsPage';
import AppointmentPage from './Appointment/AppointmentPage';
import ProfilePage from './Profile/ProfilePage';
import PasswordOtpVerification from './Authentication/PasswordOtpVerification';
import ResetPassword from './Authentication/ResetPassword';
import EditProfile from './Profile/EditProfile';
import DoctorPage from './DoctorSection/DoctorPage';


function App() {
  return (
    <>
      {/* <BrowserRouter> */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/Auth/login' element={<Login />} />
          <Route path='/Auth/register' element={<Register />} />
          <Route path='/Auth/forgotpassword' element={<ForgetPassword />} />
          <Route path='/about' element={<AboutUsPage />} />
          <Route path='/appointment' element={<AppointmentPage />}></Route>
          <Route path='/doctor' element={<DoctorPage />} />
          <Route path='/Auth/profile' element={<ProfilePage />}></Route>
          <Route path='/Auth/password/otp' element={<PasswordOtpVerification />} />
          <Route path='/Auth/reset-password' element={<ResetPassword />} />
          <Route path='/Auth/edit-profile' element={<EditProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
