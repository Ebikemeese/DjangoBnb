import useWebSocket, { ReadyState } from 'react-use-websocket'
import CustomButton from '../forms/CustomButton'
import type { MessageType } from '../../pages/ConversationDetailPage'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

interface ConversationDetailProps {
  conversation: MessageType[],
  userId: string | null;
  token: string | null;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  conversation,
  userId,
  token,
}) => {

  const {id} = useParams<{id: string}>()
  // const myUser = conversation.find((user) => user.id == userId)
  // const otherUser = conversation.find((user) => user.id != userId)

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`wss://${import.meta.env.VITE_WEBSOCKET_API_HOST}/ws/${id}/?token=${token}`, {
    share: false,
    shouldReconnect: () => true,
  })

  useEffect(() => {
    console.log("Connection state change", readyState)
  }, [readyState])

  return (
    <>
      <div className='max-h-[380] overflow-auto flex flex-col space-y-4'>
        <div className='w-[80%] py-4 px-6 rounded-xl bg-gray-100'>
          <p className="font-bold text-gray-500">John Doe</p>
          <p>Lorem ipsum random text generator</p>
        </div>

        <div className='w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200'>
          <p className="font-bold text-gray-500">Ebikeme Ese</p>
          <p>Lorem ipsum random text generator hfbvahbfviah fviahbfivhab fiovhabiofbvho aifhbvoaihbfvio abvoaihfoiafbv ioafviaufbo viuabf</p>
        </div>

        <div className='w-[80%] py-4 px-6 rounded-xl bg-gray-100'>
          <p className="font-bold text-gray-500">John Doe</p>
          <p>Lorem ipsum random text generator</p>
        </div>

        <div className='w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200'>
          <p className="font-bold text-gray-500">Ebikeme Ese</p>
          <p>Lorem ipsum random text generator </p>
        </div>

        <div className='w-[80%] py-4 px-6 rounded-xl bg-gray-100'>
          <p className="font-bold text-gray-500">John Doe</p>
          <p>Lorem ipsum random text generator</p>
        </div>
      </div> 
      

      <div className="mt-4 px-4 py-4 flex border border-gray-300 space-x-4 rounded-xl">
        <input 
          type="text"
          placeholder='Type your message...'
          className='w-full p-2 bg-gray-200 rounded-xl'
        />

        <CustomButton />
      </div>
    </>
  )
}

export default ConversationDetail