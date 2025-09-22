import { Helmet } from "react-helmet-async";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from './navbar/Navbar'
import LoginModal from './Modals/LoginModal'
import SignUpModal from './Modals/SignUpModal'
import AddPropertyModal from './Modals/AddPropertyModal'

const AppLayout: React.FC = () => {
  return (
    <>
      <Helmet>
        <html lang="en" />
      </Helmet>

      <Navbar />
      <div className="pt-28">
        <Outlet />
      </div>

      <LoginModal />
      <SignUpModal />
      <AddPropertyModal />
    </>
  );
};

export default AppLayout;