import { useAuth } from "../services/AuthContext"
import apiService from "../services/apiService"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export type ReservationType = {
    id: string;
    start_date: string;
    end_date: string;
    number_of_nights: number;
    total_price: number;
    property: {
        id: string;
        image_url: string;
        title: string;
    }
}

const MyReservationPage = () => {

    const {userId} = useAuth()
    const [myreservations, setMyReservations] = useState<ReservationType[]>([])
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
    const getReservations = async () => {
      if (!userId) return;<p className='text-cneter'></p>;

      setError(null);
      try {
        const tmpReservations = await apiService.getWithToken(
          `auth/${userId}/my_reservations/`
        );
        setMyReservations(tmpReservations);
      } catch (err) {
        setError("Failed to fetch reservations.");
      } 

      if (error) {
        return <p className="text-center text-red-500">{error}</p>
      }
    };

    getReservations();
  }, [userId]);


    if (!userId) {
        return <p className='text-center'>Login to view your reservations...</p>
    }
    

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
        <h1 className="mt-6 text-2xl mb-6 text-center">
            My Reservations
        </h1>
        <div className="space-y-4">
            {
                myreservations.map((myreservation) => {
                    return (
                        <div 
                            className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl"
                            key={myreservation.id}    
                        >
                            <div className="col-span-1">
                                <div className="relative overflow-hidden aspect-square rounded-xl">
                                    <img
                                        src={myreservation.property.image_url}
                                        alt={myreservation.property.title}
                                        className='hover:scale-110 object-cover transition h-full w-full'
                                    />
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-3 space-y-2">
                                <h2 className="mb-4 text-xl">{myreservation.property.title}</h2>

                                <p className='mb-2'><strong className='text-gray-800'>Check in date:</strong> {myreservation.start_date}</p>
                                <p className='mb-2'><strong className='text-gray-800'>Check out date:</strong> {myreservation.end_date}</p>

                                <p className='mb-2'><strong className='text-gray-800'>Number of nights:</strong> {myreservation.number_of_nights}</p>
                                <p className='mb-2'><strong className='text-gray-800'>Total price:</strong> ${myreservation.total_price}</p>
                            
                                <Link 
                                    to={`/properties/${myreservation.property.id}`}
                                    className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl transition hover:bg-airbnb-dark"
                                
                                >
                                    Go to property
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        
    </main>
  )
}

export default MyReservationPage