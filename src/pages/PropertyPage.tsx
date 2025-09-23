import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReservationSideBar from '../components/properties/ReservationSideBar'
import apiService from '../services/apiService'
import { useAuth } from '../services/AuthContext'
// import { getUserId } from '@/app/lib/actions'

type Property = {
    id: string
    title: string
    image_url: string
    guests: number
    bedrooms: number
    bathrooms: number
    description: string
    price_per_night: number
    landlord: {
        username: string
        avatar_url: string
    }
}


const PropertyPage = () => {

    const { userId } = useAuth()
    const { id } = useParams()
    const [property, setProperty] = useState<Property | null>(null)
    //   const userId = await getUserId()

    useEffect(() => {
        const fetchProperty = async () => {
        const data = await apiService.get(`properties/${id}`)
        setProperty(data)
        }

        fetchProperty()
    }, [id])

    if (!property) return <div className='text-center'>Loading...</div>

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mt-4  overflow-hidden rounded-xl relative">
                <img
                    src={ property.image_url }
                    alt='Property Image'
                    className='object-cover w-full h-full'
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="col-span-3 py-6 pr-6">
                    <h1 className="mb-4 text-xl">{ property.title }</h1>

                    <span className="mb-6 block text-lg text-gray-600">
                        { property.guests } guests - { property.bedrooms } bedroom - { property.bathrooms } bathroom
                    </span>

                    <hr className='text-gray-300'/>

                    <div className="py-3 flex items-center space-x-4">

                        <img
                            src={ property.landlord.avatar_url }
                            alt='Host Profile picture'
                            width={50}
                            height={50}
                            className='rounded-full'
                        />
                            
                        <p><strong className='text-gray-800'>{ property.landlord.username } is your host</strong></p>
                    </div>

                    <hr className='text-gray-300'/>

                    <p className="mt-6 text-lg text-gray-700">
                        { property.description }
                    </p>
                </div>

                <ReservationSideBar  
                    property={property}
                    userId={userId}
                />
            </div>
        </main>
        
    )
}

export default PropertyPage