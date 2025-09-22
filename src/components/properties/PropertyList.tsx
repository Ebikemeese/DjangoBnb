import React from 'react'
import type { PropertyType } from './Property'
import { useNavigate } from 'react-router-dom' 

interface PropertyProps {
    property: PropertyType
}

const PropertyList: React.FC<PropertyProps> = ({
    property
}) => {

    const navigate = useNavigate()

  return (
    <div 
        className='cursor-pointer'
        onClick={() => navigate(`/properties/${property.id}`) }
    >
        <div className="relative overflow-hidden aspect-square rounded-xl">
            <img 
                src={property.image_url}
                alt="Beach"
                sizes="(max-width: 768px) 768px, (max-width: 1200px) 760px"
                className='hover:scale-110 object-cover transition h-full w-full'
            />
        </div>

        <div className="mt-2">
            <p className="text-lg font-bold text-gray-800">{ property.title }</p>
        </div>

        <div className="mt-2">
            <p className="text-sm text-gray-500"><strong>${ property.price_per_night }</strong> per night</p>
        </div>
    </div>
  )
}

export default PropertyList