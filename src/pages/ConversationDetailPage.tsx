import ConversationDetail from '../components/inbox/ConversationDetail'
import { useAuth } from '../services/AuthContext'
import apiService from '../services/apiService'
import { useEffect, useState } from 'react'
import type { ConversationType, UserType } from './InboxPage'
import { useParams } from 'react-router-dom'
import { authService } from '../services/auth'

export type MessageType = {
  id: string;
  username: string;
  body: string;
  conversationId: string;
  sent_to: UserType;
  created_by: UserType;
  created_at: string;
}


const ConversationPage = () => {

  const {id} = useParams<{id: string}>()
  const { userId } = useAuth()
  const [conversation, setConversation] = useState<ConversationType | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const getConversations = async () => {
      
      try {
        const tmpConversations = await apiService.getWithToken(`chats/${id}/`);
        const fullConversation = {
          ...tmpConversations.conversation,
          messages: tmpConversations.messages || [],
        };
        setConversation(fullConversation);
        // console.log("Conversation chats", tmpConversations)
      } catch (error) {
        console.error(error);
      } 
    };
    
    getConversations();
  }, [id]);

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
          messages={conversation?.messages || []}
          userId={userId}
          token={token}
        />
        
    </main>
  )
}

export default ConversationPage