import ConversationDetail from '../components/inbox/ConversationDetail'
import { useAuth } from '../services/AuthContext'
import apiService from '../services/apiService'
import { useEffect, useState } from 'react'
import type { UserType } from './InboxPage'
import { useParams } from 'react-router-dom'
import { authService } from '../services/auth'

export type MessageType = {
  id: string;
  username: string;
  body: string;
  conversationId: string;
  sent_to: UserType;
  created_by: UserType;
}


const ConversationPage = () => {

  const {id} = useParams<{id: string}>()
  const { userId } = useAuth()
  const [conversation, setConversation] = useState<MessageType[]>([])
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {

    const fetchConversation = async () => {
      const tmpConversation = await apiService.get(`chats/${id}/`)
      setConversation(tmpConversation.data)
    }

    // console.log("Conversation Chats", conversation)

    fetchConversation()
  }, [id])

  useEffect(() => {
    const fetchToken = async () => {
      const result = authService.getToken();
      setToken(result);
    }
    fetchToken();
  }, [])

  if (!token) {
    return <p className="text-center">Loading conversation...</p>;
  }

  return (
    <main className="max-w-[1500px] mt-6 mx-auto px-6 pb-6 space-y-4">
        <ConversationDetail
          conversation={conversation}
          userId={userId}
          token={token}
        />
        
    </main>
  )
}

export default ConversationPage