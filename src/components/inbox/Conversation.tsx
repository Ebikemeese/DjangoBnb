import type React from "react"
import { Link } from "react-router-dom"
import type { ConversationType } from "../../pages/InboxPage";

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  userId
}) => {

  const otherUser = conversation.users.find((user) => user.id != userId)

  return (
    <>
      <div className='px-6 py-4 border border-gray-300 rounded-xl flex'>
        <img src={otherUser?.avatar_url} width={60} height={40} className="rounded-full" alt={otherUser?.username} />
        
        <div className="ml-4">
          <p className="mb-6 text-xl">{otherUser?.username}</p>

          <Link to={`/inbox/${conversation.id}`} className='text-airbnb-dark'>
            Go to Conversation
          </Link>
        </div>
      </div>
    </>
  )
}

export default Conversation