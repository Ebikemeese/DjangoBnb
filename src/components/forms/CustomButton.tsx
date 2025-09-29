import type React from "react";
import { BsFillSendArrowUpFill } from "react-icons/bs"
interface CustomButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}



const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      className={`px-4 py-2 rounded-xl ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      onClick={onClick}
    >
        <BsFillSendArrowUpFill />
    </button>
  )
}

export default CustomButton