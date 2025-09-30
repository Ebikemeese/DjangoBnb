import { FiSearch } from "react-icons/fi"
import useSearchModal from "../../hooks/useSearchModal"

const SearchFilters = () => {

    const searchModal = useSearchModal()

    return (
        <div 
            className='h-[64px] flex flex-row items-center justify-between border border-gray-100 rounded-full'
            onClick={() => searchModal.open('location')}
        >
            <div className='hidden lg:block'>
                <div className="flex flex-row items-center justify-between">
                    <div className="cursor-pointer h-[64px] py-3 px-8 felx-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Where</p>
                        <p className="text-sm">Wanted location</p>
                    </div>

                    <div className="cursor-pointer h-[64px] py-3 px-8 felx-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Check In</p>
                        <p className="text-sm">Add Dates</p>
                    </div>

                    <div className="cursor-pointer h-[64px] py-3 px-8 felx-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Checkout</p>
                        <p className="text-sm">Add Dates</p>
                    </div>

                    <div className="cursor-pointer h-[64px] py-3 px-8 felx-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Who</p>
                        <p className="text-sm">Add Guests</p>
                    </div>
                </div>
            </div>

            <div className="p-2">
                <div className="cursor-pointer p-2 lg:p-4 rounded-full bg-airbnb hover:bg-airbnb-dark transition text-white" >
                    <FiSearch />
                </div>
            </div>
        </div>
    )
}

export default SearchFilters