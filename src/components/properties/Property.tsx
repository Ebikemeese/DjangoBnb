
import PropertyList from './PropertyList'
import { useEffect, useState } from 'react'
import apiService from '../../services/apiService'

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
}

const Property = () => {

  const [properties, setProperties] = useState<PropertyType[]>([])

  const getProperties = async () => {
    const tmpProperties = await apiService.get('properties/')

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