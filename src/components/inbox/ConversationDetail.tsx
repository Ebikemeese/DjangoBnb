import useWebSocket, { ReadyState } from 'react-use-websocket'
import CustomButton from '../forms/CustomButton'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import type { ConversationType } from '../../pages/InboxPage'
import type { MessageType } from '../../pages/ConversationDetailPage'
import type { UserType } from '../../pages/InboxPage'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import UserNav from '../navbar/Usernav'


interface ConversationDetailProps {
  conversation: ConversationType | null;
  userId: string | null;
  token: string | null;
  messages: MessageType[];
  
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  conversation,
  userId,
  token,
  messages
}) => {

  const messagesDiv = useRef(null)
  const [newMessage, setNewMessage] = useState('')
  const {id} = useParams<{id: string}>()
  const myUser = conversation?.users?.find((user) => user.id == userId);
  const otherUser = conversation?.users?.find((user) => user.id != userId);
  const [realTimeMessages, setRealTimeMessages] = useState<MessageType[]>([])


  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`wss://${import.meta.env.VITE_WEBSOCKET_API_HOST}/ws/${id}/?token=${token}`, {
    share: false,
    shouldReconnect: () => true,
  })

  useEffect(() => {
    console.log("Connection state change", readyState)
  }, [readyState])

  useEffect(() => {
    if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'username' in lastJsonMessage && 'body' in lastJsonMessage) {
      const message: MessageType = {
        id: '',
        username: lastJsonMessage.username as string,
        body: lastJsonMessage.body as string,
        sent_to: otherUser as UserType,
        created_by: myUser as UserType,
        conversationId: id as string,
      }

      setRealTimeMessages((realTimeMessages) => [...realTimeMessages, message])
    }

    scrollToButtom()
  }, [lastJsonMessage])

  const sendMessage = async () => {
    if (
      !newMessage.trim() ||
      !myUser?.username ||
      !otherUser?.id ||
      !id ||
      !token
    ) {
      console.warn("Invalid message payload:", {
        body: newMessage,
        username: myUser?.username,
        sent_to_id: otherUser?.id,
        conversation_id: id,
        token
      });
      return;
    }

    sendJsonMessage({
      event: 'chat_message',
      data: {
        body: newMessage,
        username: myUser.username,
        sent_to_id: otherUser.id,
        conversation_id: id
      }
    });

    setNewMessage('');
    setTimeout(scrollToButtom, 50);
  };

  console.log("Sending message:", {
    body: newMessage,
    username: myUser?.username,
    sent_to_id: otherUser?.id,
    conversation_id: id
  });


  const scrollToButtom = () => {
    if (messagesDiv.current) {
      (messagesDiv.current as HTMLDivElement).scrollTop = (messagesDiv.current as HTMLDivElement).scrollHeight;
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-8 text-white rounded-t-xl bg-white shadow-md">
        {/* Back button and user info */}
        <div className="flex items-center space-x-4">
          <Link to="/inbox" className="text-gray-800 text-xl">
            <FaArrowLeft />
          </Link>
          <img
            src={otherUser?.avatar_url}
            width={40}
            height={40}
            className="rounded-full"
            alt={otherUser?.username}
          />
          <p className="text-lg text-gray-800 font-semibold">{otherUser?.username}</p>
        </div>

        {/* Optional icons like call/video/menu */}
        <div className="flex space-x-4 text-gray-800">
          <UserNav userId={userId}/>
        </div>
      </div>

      <div 
        ref={messagesDiv}
        className='max-h-[380px] overflow-auto flex flex-col space-y-4'
      >

        {
          messages.map((message, index) => (
            <div key={message.id || index}
              className={`w-[80%] py-4 px-6 rounded-xl ${message.created_by.username === myUser?.username ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
            >
              <p className="font-bold text-gray-500">{message.created_by.username}</p>
            <p>{message.body}</p>
            </div>
          ))
        }

        {
          realTimeMessages.map((message, index) => (
            <div key={index}
              className={`w-[80%] py-4 px-6 rounded-xl ${message.username === myUser?.username ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
            >
              <p className="font-bold text-gray-500">{message.username}</p>
            <p>{message.body}</p>
            </div>
          ))
        }

      </div> 
      

      <div className="mt-4 px-4 py-4 flex border border-gray-300 space-x-4 rounded-xl">
        <input 
          type="text"
          placeholder='Type your message...'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className='w-full p-2 bg-gray-200 rounded-xl'
        />

        <CustomButton 
          onClick={sendMessage}
          disabled={!otherUser?.id || !myUser?.username || !newMessage.trim()}
        />
      </div>
    </>
  )
}

export default ConversationDetail