import useLoginModal from "../../hooks/useLoginModal"
import { useNavigate } from "react-router-dom"
import apiService from "../../services/apiService"


interface ContactButtonProps {
  userId: string | null;
  landlord_id?: string;
}


const ContactButton: React.FC<ContactButtonProps> = ({
  userId,
  landlord_id
}) => {

  const navigate = useNavigate()
  const loginModal = useLoginModal()

  const startConversation = async () => {
    if (userId) {
      const conversation = await apiService.getWithToken(
        `chats/start/${landlord_id}/`
      )

      if (conversation.conversation_id) {
        navigate(`/inbox/${conversation.conversation_id}`)
      }

    } else {
      loginModal.open()
    }
  }

  return (

    <button 
      className='cursor-pointer mt-6 py-4 px-6 bg-airbnb transition text-white rounded-xl hover:bg-airbnb-dark'
      onClick={startConversation}
    >
        Contact
    </button>

  )
}

export default ContactButton