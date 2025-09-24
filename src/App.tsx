import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from './components/AppLayout'
import { HelmetProvider } from "react-helmet-async";
import Homepage from "./pages/HomePage"
import PropertyPage from "./pages/PropertyPage"
import LandLordPage from './pages/LandLordPage'
import MyPropertiesPage from './pages/MyPropertiesPage'
import MyReservationPage from "./pages/MyReservationPage";
import InboxPage from "./pages/InboxPage";
import ConversationDetailPage from './pages/ConversationDetailPage'

function App() {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path="properties/:id" element={<PropertyPage />} />
            <Route path="landlords/:id" element={<LandLordPage />} />
            <Route path="my_properties" element={<MyPropertiesPage />} />
            <Route path="my_reservations" element={<MyReservationPage />} />
            <Route path="inbox" element={<InboxPage />} />
            <Route path="inbox/:id" element={<ConversationDetailPage />} />

          
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
