
import ContactButton from '../components/landlords/ContactButton'
import Property from '../components/properties/Property'
import apiService from '../services/apiService'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../services/AuthContext'

type Landlord = {
  id: number
  username: string
  avatar_url: string
}


const LandLordPage = () => {

  const {userId} = useAuth()
  const {id} = useParams<{id: string}>()
  const [landlord, setLandlord] = useState<Landlord | null>(null)

  useEffect(() => {

    const fetchLandlord = async () => {
      const response = await apiService.get(`auth/${id}`)
      setLandlord(response)
    }
    
    fetchLandlord()
  }, [id])

  if (!landlord) return <div className='text-center'>Loading...</div>

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <aside className="col-span-1 mb-4">
            <div className="flex flex-col items-center p-6 rounded-xl border-gray-300 shadow-xl">
              <img 
                src={landlord?.avatar_url ? landlord.avatar_url : '/DjangoBnb/pic.jpg'}
                alt='Landlord profile picture'
                width={200}
                height={200}
                className='rounded-full'
              />
              
                <h1 className="mt-6 text-2xl">{landlord.username}</h1>
              
              {
                userId != id && (
                  <ContactButton 
                    userId={userId}
                    landlord_id={id}
                  />
                )
              }
              
            </div>
            
          </aside>

          <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
            <div className="mt-6 grid gird-cols-1 md:grid-cols-3 gap-6">
              <Property 
                landlord_id={id}
              />
            </div>
          </div>
        </div>
    </main>
  )
}

export default LandLordPage