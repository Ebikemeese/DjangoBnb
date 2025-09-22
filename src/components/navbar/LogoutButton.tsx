import { useNavigate } from 'react-router-dom';
import MenuLink from './MenuLink';
import React from 'react';
import { useAuth } from '../../services/AuthContext'; // ✅ Use context

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ Get logout from context

  const submitLogout = async () => {
    logout(); // ✅ Clears token and userId
    navigate('/');
  };

  return (
    <MenuLink 
      label="Log out"
      onClick={submitLogout}
    />
  );
};

export default LogoutButton;