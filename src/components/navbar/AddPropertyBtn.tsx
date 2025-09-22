import React from 'react'
import useAddPropertyModal from '../../hooks/useAddPropertyModal'
import useLoginModal from '../../hooks/useLoginModal'

interface AddPropertyButtonProps {
  userId?: string | null;
}

const AddPropertyBtn: React.FC<AddPropertyButtonProps> = ({
  userId
}) => {

  const loginModal = useLoginModal()

  const addPropertyModal = useAddPropertyModal()

  const airbnbYourHome = () => {
    if (userId) {
      addPropertyModal.open()
    } else {
      loginModal.open()
    }
    
  }

  return (
    <div 
      className='cursor-pointer p-2 text-sm font-semibold rounded-full hover:bg-gray-200'
      onClick={airbnbYourHome}
    >
      AirBnb your home
    </div>
  )
}

export default AddPropertyBtn