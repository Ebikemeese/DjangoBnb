
import PropertyList from './PropertyList'
import { useEffect, useState } from 'react'
import apiService from '../../services/apiService'

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
  is_favourite: boolean;
}

interface PropertyListProps {
  landlord_id?: string | null;
}

const Property: React.FC<PropertyListProps> = ({
  landlord_id,
}) => {

  const [properties, setProperties] = useState<PropertyType[]>([])

  const markFavourite = (id: string, is_favourite: boolean) => {
    const updatedProperties = properties.map((property) => {
      if (property.id === id) {
        return { ...property, is_favourite };
      }
      return property;
    });
    setProperties(updatedProperties);
    console.log(
      is_favourite
        ? "Added to Favourite Properties"
        : "Removed from Favourite Properties"
    );
  };
  
  useEffect(() => {

    const getProperties = async () => {
      let url = 'properties/'
      if (landlord_id) {

        url += `?landlord_id=${landlord_id}`
        console.log('Property landlord_id', landlord_id)
        console.log("Future url", url)
        const tmpProperties = await apiService.get(url)
        setProperties(tmpProperties.data.map((property: PropertyType) => {
          if (tmpProperties.favourites.includes(property.id)) {
            property.is_favourite = true
          } else {
            property.is_favourite = false
          }

          return property;
        }))

      } else {

        const tmpProperties = await apiService.get(url)
        setProperties(tmpProperties.data.map((property: PropertyType) => {
          if (tmpProperties.favourites.includes(property.id)) {
            property.is_favourite = true
          } else {
            property.is_favourite = false
          }

          return property;
        }))

      }
      
    };

    getProperties()
  }, [landlord_id])

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