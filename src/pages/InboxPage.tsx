import Conversation from '../components/inbox/Conversation'
import { useEffect, useState } from 'react'
import apiService from '../services/apiService'
import { useAuth } from '../services/AuthContext'
import type { MessageType } from './ConversationDetailPage'
import useWebSocket from 'react-use-websocket'
import { authService } from '../services/auth'

export type UserType = {
  id: string;
  username: string;
  avatar_url: string;
  last_login: string;
}

export type ConversationType = {
  id: string;
  users: UserType[];
  messages: MessageType[];
  last_message: string;
  unread_count: number;
}


const InboxPage = () => {

  const {userId } = useAuth()
  const token = authService.getToken()
  const [conversations, setConversations] = useState<ConversationType[]>([])
  const [loading, setLoading] = useState(true);

  const { lastJsonMessage, readyState } = useWebSocket(`wss://${import.meta.env.VITE_WEBSOCKET_API_HOST}/ws/user_${userId}/?token=${token}`, {
    share: true,
    shouldReconnect: () => true,
    // onOpen: () => console.log("WebSocket connection opened"),
    // onClose: () => console.log("WebSocket connection closed"),
    // onError: (event) => console.error("WebSocket error:", event),
  });

  useEffect(() => {
    console.log("WebSocket readyState:", readyState);
  }, [readyState]);

  useEffect(() => {
    // console.log("WebSocket message received:", lastJsonMessage);
    
    if (
      lastJsonMessage &&
      'unread_count' in lastJsonMessage &&
      'recipient_id' in lastJsonMessage &&
      'conversation_id' in lastJsonMessage
    ) {
      if (lastJsonMessage.recipient_id === userId) {
        setConversations(prev =>
          prev.map(conv =>
            conv.id === lastJsonMessage.conversation_id
              ? { ...conv, unread_count: lastJsonMessage.unread_count }
              : conv
          )
        );
      }
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const tmpConversations = await apiService.getWithToken('chats/');
        setConversations(Array.isArray(tmpConversations) ? tmpConversations : []);
        // console.log("Conversations", tmpConversations)
      } catch (error) {
        console.error(error);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, [userId]);

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
      <h1 className="mt-6 text-2xl mb-6 text-center">My Inbox</h1>

      {!userId ? (
        <p className="text-center">Login to view your inbox</p>
      ) : loading ? (
        <p className="text-center text-gray-500">Loading conversations...</p>
      ) : conversations.length === 0 ? (
        <p className="text-center text-gray-500">No conversations yet.</p>
      ) : (
        conversations.map((conversation) => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            userId={userId}
          />
        ))
      )}
    </main>
  );
}
export default InboxPage