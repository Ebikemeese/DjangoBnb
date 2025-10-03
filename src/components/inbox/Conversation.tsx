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
        <div className='px-6 py-4 border border-gray-300 rounded-xl flex items-center justify-between'>
          
          {/* Left: Avatar and user info */}
          <div className='flex items-center'>
            <img
              src={otherUser?.avatar_url ? otherUser.avatar_url : '/DjangoBnb/pic.jpg'}
              width={60}
              height={40}
              className="rounded-full"
              alt={otherUser?.username}
            />

            <div className="ml-4">
              <p className="mb-2 text-xl font-semibold">{otherUser?.username}</p>

              {otherUser?.last_login ? (
                <p className="text-xs text-gray-400 mt-1">
                  Last seen on{' '}
                  {new Date(otherUser.last_login).toLocaleString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    // hour: 'numeric',
                    // minute: '2-digit',
                    // hour12: true
                  })}
                </p>
              ) : (
                <p className="text-xs text-gray-400 mt-1">Last seen: unknown</p>
              )}
            </div>
          </div>

          {/* Right: Unread badge */}
          {conversation.unread_count > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {conversation.unread_count}
            </span>
          )}
        </div>
      </Link>
    </>
  )
}

export default Conversation