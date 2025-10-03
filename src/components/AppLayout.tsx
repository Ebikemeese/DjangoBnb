import { Helmet } from "react-helmet-async";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from './navbar/Navbar'
import LoginModal from './Modals/LoginModal'
import SignUpModal from './Modals/SignUpModal'
import SearchModal from "./Modals/SearchModal"
import AddPropertyModal from './Modals/AddPropertyModal'
import Footer from "./navbar/Footer";

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
      <SearchModal />
      <SignUpModal />
      <AddPropertyModal />

      <Footer />
    </>
  );
};

export default AppLayout;