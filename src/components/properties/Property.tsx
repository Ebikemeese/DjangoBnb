
import PropertyList from './PropertyList'
import { useEffect, useState } from 'react'
import apiService from '../../services/apiService'

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
}

interface PropertyListProps {
  landlord_id?: string | null
}

const Property: React.FC<PropertyListProps> = ({
  landlord_id
}) => {

  const [properties, setProperties] = useState<PropertyType[]>([])

  const getProperties = async () => {
    let url = 'properties/'

    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`
    }
    const tmpProperties = await apiService.get(url)

    setProperties(tmpProperties.data)
  }

  useEffect(() => {
    getProperties()
  }, [])

  return (
    <>
      {
        properties.map((property) => {
          return (
            <PropertyList 
              key={property.id}
              property={property}
            />
          )
        })
      }
    </>
  )
}

export default Property