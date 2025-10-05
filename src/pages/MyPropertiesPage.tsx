import { useAuth } from '../services/AuthContext'
import Property from '../components/properties/Property'

const MyPropertiesPage = () => {

    const { userId } = useAuth()
    // console.log("My property landlord_id", userId)

    if (!userId) {
        return <p className='text-center'>Login to view your properties...</p>
    }


    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <h1 className="mt-6 text-2xl mb-6 text-center">My properties</h1>

            <div className="mt-6 grid gird-cols-1 md:grid-cols-3 gap-6">
            <Property 
                landlord_id={userId}
            />
            </div>
        </main>
    )
}

export default MyPropertiesPage