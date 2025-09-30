
import { TbBeachOff } from "react-icons/tb"
import { GiVillage } from "react-icons/gi"
import { MdAllInclusive, MdCabin } from "react-icons/md"
import { GiHut } from "react-icons/gi"
import { GiValley } from "react-icons/gi"
import { useState } from "react"
import useSearchModal, { type SearchQuery} from "../../hooks/useSearchModal"


const category = () => {

    const searchModal = useSearchModal()
    const [category, setCategory] = useState('')

    const _setCategory = (_category: string) => {
        setCategory(_category)

        const query: SearchQuery = {
            country: searchModal.query.country,
            guests: searchModal.query.guests,
            bathrooms: searchModal.query.bathrooms,
            bedrooms: searchModal.query.bedrooms,
            checkIn: searchModal.query.checkIn,
            checkOut: searchModal.query.checkOut,
            category: _category,

        }

        searchModal.setQuery(query)
    }

    return (
        <div className="pt-3 cursor-pointer pb-6 flex flex-row items-center justify-between space-x-12">
            <div 
                onClick={() => _setCategory('')} 
                className={`pb-4 flex flex-col items-center space-y-2 ${category === '' ? 'border-gray-200 opacity-100 border-b-4' : 'border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100'}`}
            >
                <MdAllInclusive/>
                <span className="text-xs">All</span>
            </div>
            
            <div 
                onClick={() => _setCategory('Beach')} 
                className={`pb-4 flex flex-col items-center space-y-2 ${category === 'Beach' ? 'border-gray-200 opacity-100 border-b-4' : 'border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100'}`}
            >
                <TbBeachOff/>
                <span className="text-xs">Beach</span>
            </div>

            <div 
                onClick={() => _setCategory('Villas')} 
                className={`pb-4 flex flex-col items-center space-y-2 ${category === 'Villas' ? 'border-gray-200 opacity-100 border-b-4' : 'border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100'}`}
            >
                <GiVillage />
                <span className="text-xs">Villas</span>
            </div>

            <div 
                onClick={() => _setCategory('Cabins')} 
                className={`pb-4 flex flex-col items-center space-y-2 ${category === 'Cabins' ? 'border-gray-200 opacity-100 border-b-4' : 'border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100'}`}
            >
                <MdCabin/>
                <span className="text-xs">Cabins</span>
            </div>

            <div 
                onClick={() => _setCategory('Huts')} 
                className={`pb-4 flex flex-col items-center space-y-2 ${category === 'Huts' ? 'border-gray-200 opacity-100 border-b-4' : 'border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100'}`}
            >
                <GiHut/>
                <span className="text-xs">Huts</span>
            </div>

            <div 
                onClick={() => _setCategory('Valleys')} 
                className={`pb-4 flex flex-col items-center space-y-2 ${category === 'Valleys' ? 'border-gray-200 opacity-100 border-b-4' : 'border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100'}`}
            >
                <GiValley/>
                <span className="text-xs">Valleys</span>
            </div>
        </div>
    )
}

export default category;