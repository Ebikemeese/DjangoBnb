
import PropertyList from './PropertyList'
import { useEffect, useRef, useState } from 'react'
import apiService from '../../services/apiService'
import useSearchModal from '../../hooks/useSearchModal'
import { format } from 'date-fns'
import { useSearchParams } from 'react-router-dom'

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
  is_favourite: boolean;
  
}

interface PropertyListProps {
  landlord_id?: string | null;
  favourites?: boolean | null;
}

const Property: React.FC<PropertyListProps> = ({
  landlord_id,
  favourites
}) => {

  const params = useSearchParams()
  const searchModal = useSearchModal()
  const country = searchModal.query.country
  const numGuests = searchModal.query.guests
  const numBathrooms = searchModal.query.bathrooms
  const numBedrooms = searchModal.query.bedrooms
  const checkInDate = searchModal.query.checkIn
  const checkOutDate = searchModal.query.checkOut
  const category = searchModal.query.category

  const [properties, setProperties] = useState<PropertyType[]>([])
  const getPropertiesRef = useRef<() => void>(() => {})
  
  useEffect(() => {
  
    const getProperties = async () => {
      let url = 'properties/'
      if (landlord_id) {

        url += `?landlord_id=${landlord_id}`
        
      } else if (favourites) {
        
        url += '?is_favourites=true'

      } else {
        let urlQuery = ''

        if (country) {
          urlQuery += '&country=' + country
        }

        if (numGuests) {
          urlQuery += '&numGuests=' + numGuests
        }

        if (numBedrooms) {
          urlQuery += '&numBedrooms=' + numBedrooms
        }

        if (numBathrooms) {
          urlQuery += '&numBathrooms=' + numBathrooms
        }

        if (category) {
          urlQuery += '&category=' + category
        }

        if (checkInDate) {
          urlQuery += '&checkin=' + format(checkInDate, 'yyyy-MM-dd')
        }

        if (checkOutDate) {
          urlQuery += '&checkout=' + format(checkOutDate, 'yyyy-MM-dd')
        }

        if (urlQuery.length) {
          console.log("Search query url", urlQuery)

          urlQuery = '?' + urlQuery.substring(1)

          url += urlQuery

        }
      }

      const tmpProperties = await apiService.get(url)

      console.log("Get properties request all", tmpProperties.data)
      setProperties(tmpProperties.data.map((property: PropertyType) => {
        if (tmpProperties.favourites.includes(property.id)) {
          property.is_favourite = true
        } else {
          property.is_favourite = false
        }
        // console.log("favourite property 2", property)
        return property;
      }))

      
    };

    getPropertiesRef.current = getProperties
    getProperties()
  }, [landlord_id, category, searchModal.query, params])

  const markFavourite = async (id: string, is_favourite: boolean) => {
    const updatedProperties = properties.map((property) => {
      if (property.id === id) {
        return { ...property, is_favourite };
      }
      
      return property;
    });
    setProperties(updatedProperties);
    getPropertiesRef.current();
    console.log(
      is_favourite
        ? "Added to Favourite Properties"
        : "Removed from Favourite Properties"
    );
  };

  if (properties.length === 0) {
    return <p className="text-center text-gray-500">Loading properties...</p>
  }

  return (
    <>
      {
        properties.map((property) => {
          return (
            <PropertyList 
              key={property.id}
              property={property}
              markFavourite={(is_favourite) => markFavourite(property.id, is_favourite)}
            />
          )
        })
      }
    </>
  )
}

export default Property