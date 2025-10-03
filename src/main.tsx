import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
import { AuthProvider } from './services/AuthContext.tsx'
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://2f9f81f7f99106f1ae58c7fd1a00f9f5@o4509776083550208.ingest.us.sentry.io/4510123646124032",
  sendDefaultPii: true
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)