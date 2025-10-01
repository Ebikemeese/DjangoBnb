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
      <Link to={`/inbox/${conversation.id}`} className='text-airbnb-dark'>
        <div className='px-6 py-4 border border-gray-300 rounded-xl flex'>
          <img src={otherUser?.avatar_url} width={60} height={40} className="rounded-full" alt={otherUser?.username} />
          
          <div className="ml-4">
            <p className="mb-6 text-xl">{otherUser?.username}</p>

            {otherUser?.last_login ? (
              <p className="text-xs text-gray-400 mt-1">last seen on{' '}
                {new Date(otherUser?.last_login).toLocaleString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </p> 
            ) : (
              <p className="text-xs text-gray-400 mt-1">Last seen: unknown</p>
            )} 
            
          </div>
        </div>
      </Link>
    </>
  )
}

export default Conversation