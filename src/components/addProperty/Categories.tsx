import React from 'react'
import { TbBeachOff } from "react-icons/tb"
import { GiVillage } from "react-icons/gi"
import { MdCabin } from "react-icons/md"
import { GiHut } from "react-icons/gi"
import { GiValley } from "react-icons/gi"

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories:React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory
}) => {
    return (
        <>
            <div className='pt-3 cursor-pointer pb-6 flex flex-row items-center justify-between space-x-12'>
                <div 
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 
                                ${dataCategory == 'Beach' ? 'border-gray-800' : 'border-white'} 
                                hover:border-gray-200 opacity-60 hover:opacity-100`}
                    onClick={() => setCategory('Beach')}
                >
                    <TbBeachOff/>
                    <span className="text-xs">Beach</span>
                </div>

                <div 
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 
                                ${dataCategory == 'Villas' ? 'border-gray-800' : 'border-white'} 
                                hover:border-gray-200 opacity-60 hover:opacity-100`}
                    onClick={() => setCategory('Villas')}
                >
                    <GiVillage/>
                    <span className="text-xs">Villas</span>
                </div>

                <div 
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 
                                ${dataCategory == 'Cabins' ? 'border-gray-800' : 'border-white'} 
                                hover:border-gray-200 opacity-60 hover:opacity-100`}
                    onClick={() => setCategory('Cabins')}
                >
                    <MdCabin/>
                    <span className="text-xs">Cabins</span>
                </div>

                <div 
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 
                                ${dataCategory == 'Huts' ? 'border-gray-800' : 'border-white'} 
                                hover:border-gray-200 opacity-60 hover:opacity-100`}
                    onClick={() => setCategory('Huts')}
                >
                    <GiHut/>
                    <span className="text-xs">Huts</span>
                </div>

                <div 
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 
                                ${dataCategory == 'Valleys' ? 'border-gray-800' : 'border-white'} 
                                hover:border-gray-200 opacity-60 hover:opacity-100`}
                    onClick={() => setCategory('Valleys')}
                >
                    <GiValley/>
                    <span className="text-xs">Valleys</span>
                </div>
            </div>
            
        </>
    )
}

export default Categories