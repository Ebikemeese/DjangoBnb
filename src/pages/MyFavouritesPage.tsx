import { useAuth } from "../services/AuthContext"
import Property from "../components/properties/Property"



const MyFavouritesPage = () => {

    const { userId } = useAuth()
    if (!userId) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p className='text-center'>Login to view Favourite properties</p>
            </main>
        )
    } else {
        return (
            <main className="max-w-[1500px] max-auto px-6 pb-12">
                <h1 className="my-6 text-2xl text-center">My Favourites</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Property 
                        favourites={true}
                    />
                </div>
            </main>
        )
    }
}

export default MyFavouritesPage