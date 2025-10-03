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
    <div className='min-h-screen flex flex-col'>
      <Helmet>
        <html lang="en" />
      </Helmet>

      <Navbar />
      <main className="flex-grow pt-28">
        <Outlet />
      </main>

      <LoginModal />
      <SearchModal />
      <SignUpModal />
      <AddPropertyModal />

      <Footer />
    </div>
  );
};

export default AppLayout;