
import { useState } from 'react';
import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa6";
import MenuLink from './MenuLink';
import useLoginModal from '../../hooks/useLoginModal';
import useSignUpModal from '../../hooks/useSignUpModal';
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';

interface UserNavProps {
  userId?: string | null
}

const UserNav: React.FC<UserNavProps> = ({
  userId
}) => {

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const loginModal = useLoginModal()
  const SignUpModal = useSignUpModal()


  return (
    <div className='p-2 relative inline-block border border-gray-100 rounded-full'>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className='cursor-pointer flex items-center'
        >
            <GiHamburgerMenu style={{fontSize: '25px'}} />
            <FaRegUser style={{fontSize: '22px'}} />
        </button>

        {
          isOpen && (
            <div className='w-[220px] absolute top-[60px] right-0 bg-white border border-gray-300 rounded-xl shadow-md flex-col cursor-pointer'>
              
              {
                userId ? (
                  <>
                    <MenuLink 
                      label="My Properties"
                      onClick={() => {
                        setIsOpen(false)
                        navigate('/my_properties')
                      }}
                    />

                    <MenuLink 
                      label="My Reservations"
                      onClick={() => {
                        setIsOpen(false)
                        navigate('/my_reservations')
                      }}
                    />

                    <MenuLink 
                      label="My Favourites"
                      onClick={() => {
                        setIsOpen(false)
                        navigate('/my_favourites')
                      }}
                    />

                    <MenuLink
                      label="My Chats"
                      onClick={() => {
                        setIsOpen(false)
                        navigate('/inbox')
                      }}
                    />


                    <LogoutButton />
                  </>
                ) : (
                  <>
                    <MenuLink
                      label='Log in'
                      onClick={() => {
                        setIsOpen(false)
                        loginModal.open()
                      }}
                    />

                    <MenuLink
                      label='Sign up'
                      onClick={() => {
                        setIsOpen(false)
                        SignUpModal.open()
                      }}
                    />
                  </>

                 )
              }

              
            </div>
          )
        }
    </div>
  )
}

export default UserNav