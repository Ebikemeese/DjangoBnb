import { Link } from 'react-router-dom'
import SearchFilters from './SearchFilters'
import UserNav from './Usernav'
import AddPropertyBtn from './AddPropertyBtn'
// import { userService } from '../../services/auth'
// import { useState, useEffect } from 'react'
import { useAuth } from '../../services/AuthContext'
// import { getUserId } from '../../lib/actions'


const Navbar = () => {

    const { userId } = useAuth()
    // const [userId, setUserId] = useState<string | null>(null);

    // useEffect(() => {
    //     userService.get().then(setUserId);
    // }, []);
    // console.log("User id", userId)


  return (
    <nav className='w-full fixed top-0 left-0 py-6 border-b border-gray-200 bg-white z-10'>
        <div className="max-w-[1500px] mx-auto px-6">
            <div className="flex justify-between items-center">
                <Link to="/">
                    <img
                        src='/airbnb.png'
                        alt='Airbnb logo'
                        width={160}
                        height={34}
                    />
                </Link>
                
                <div className="flex space-x-6">
                    <SearchFilters />
                </div>

                <div className="flex items-center space-x-6">
                    <AddPropertyBtn userId={userId}/>
                    <UserNav userId={userId} />
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
