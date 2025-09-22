
import type { ChangeEvent } from 'react'
import Modal from './Modal'
import useAddPropertyModal from '../../hooks/useAddPropertyModal'
import { useState } from 'react'
import Categories from '../addProperty/Categories'
import apiService from '../../services/apiService'
import { GrFormPreviousLink } from 'react-icons/gr'
import SelectCountry from '../forms/SelectCountry'
import type { SelectCountryValue } from '../forms/SelectCountry'
import { useNavigate } from 'react-router-dom'

const AddPropertyModal = () => {

    const [currentStep, setCurrentStep] = useState(1)
    const [errors, setErrors] = useState<string[]>([])
    const [dataCategory, setDataCategory] = useState('')
    const [dataTitle, setDataTitle] = useState('')
    const [dataDescription, setDataDescription] = useState('')
    const [dataPrice, setDataPrice] = useState('')
    const [dataBedrooms, setDataBedrooms] = useState('')
    const [dataBathrooms, setDataBathrooms] = useState('')
    const [dataGuests, setDataGuests] = useState('')
    const [dataCountry, setDataCountry] = useState<SelectCountryValue>()
    const [dataImage, setDataImage] = useState<File | null>(null)

    const addPropertyModal = useAddPropertyModal()
    const navigate = useNavigate()

    const setCategory = (category: string) => {
        setDataCategory(category)
    }

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0]

            setDataImage(tmpImage)
        }
    }

    const submitForm = async () => {
        if (
            dataTitle &&
            dataDescription &&
            dataPrice &&
            dataImage &&
            dataBedrooms &&
            dataBathrooms &&
            dataGuests &&
            dataCountry &&
            dataCategory
        ) {
            const formData = new FormData()
            formData.append('category', dataCategory)
            formData.append('description', dataDescription)
            formData.append('price_per_night', dataPrice)
            formData.append('bedrooms', dataBedrooms)
            formData.append('guests', dataGuests)
            formData.append('country', dataCountry.label)
            formData.append('title', dataTitle)
            formData.append('image', dataImage)
            formData.append('bathrooms', dataBathrooms)
            formData.append('country_code', dataCountry.value)

            console.log("FormData", formData)
            const response = await apiService.postWithToken('properties/create/', formData)
            
            if (response.success) {
                console.log('Property created successfully')
                navigate('/')
                addPropertyModal.close()
            } else {
                // console.log('An error occured while uploading property')
                const tmpErrors: string[] = Object.entries(response).flatMap(([field, messages]: [string, any]) => {
                    if (Array.isArray(messages)) {
                        return messages.map((msg: any) => `${field}: ${msg.message || msg}`);
                    } else if (typeof messages === 'object' && messages.message) {
                        return [`${field}: ${messages.message}`];
                    } else {
                        return [`${field}: ${String(messages)}`];
                    }
                });

                setErrors(tmpErrors)
            }
        }
    }

    const content = (
        <>
            {
                currentStep == 1 ? (
                    <>
                        <h2 className='mb-6 text-xl text-center'>Choose Category</h2>

                        <Categories 
                            dataCategory={dataCategory}
                            setCategory={(category) => setCategory(category)}
                        />

                        <div 
                            className='cursor-pointer py-4 px-6 text-center bg-airbnb transition text-white rounded-xl hover:bg-airbnb-dark'
                            onClick={() => setCurrentStep(2)}    
                        >
                            Next
                        </div>
                    </>
                ) : currentStep == 2 ? (
                    <>
                        <h2 className='mb-6 text-xl text-center'>
                            <div 
                                onClick={() => setCurrentStep(1)}
                                className="py-2 px-2 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
                            >
                                <GrFormPreviousLink />
                            </div>  
                            Describe your place
                        </h2>

                        <div className='pt-3 pb-6 space-y-4'>
                            <div className='flex flex-col space-y-2'>
                                <label>Title</label>
                                <input
                                    type='text'
                                    value={dataTitle}
                                    onChange={(e) => setDataTitle(e.target.value)}
                                    className='w-full p-4 border border-gray-600 rounded-xl'
                                    required
                                />
                            </div>
                        </div>

                        <div className='pt-3 pb-6 space-y-4'>
                            <div className='flex flex-col space-y-2'>
                                <label>Description</label>
                                <textarea
                                    value={dataDescription}
                                    onChange={(e) => setDataDescription(e.target.value)}
                                    className='w-full h-[150px] p-4 border border-gray-600 rounded-xl'
                                    required
                                ></textarea>
                            </div>
                        </div>
                
                        <div 
                            className='cursor-pointer py-4 px-6 text-center bg-airbnb transition text-white rounded-xl hover:bg-airbnb-dark'
                            onClick={() => setCurrentStep(3)}    
                        >
                            Next
                        </div>
                    </>
                    

                ) : currentStep == 3 ? (
                    <>
                        <h2 className='text-xl text-center'>
                            <div 
                                onClick={() => setCurrentStep(2)}
                                className="py-2 px-2 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
                            >
                                <GrFormPreviousLink />
                            </div>  
                            Details
                        </h2>

                        <div className='pt-3 pb-3 space-y-4'>
                            <div className='flex flex-col space-y-2'>
                                <label>Price/Night</label>
                                <input
                                    type='number'
                                    value={dataPrice}
                                    onChange={(e) => setDataPrice(e.target.value)}
                                    className='w-full p-4 border border-gray-600 rounded-xl'
                                    required
                                />
                            </div>
                        
                            <div className='flex flex-col space-y-2'>
                                <label>Bedrooms</label>
                                <input
                                    type='number'
                                    value={dataBedrooms}
                                    onChange={(e) => setDataBedrooms(e.target.value)}
                                    className='w-full p-4 border border-gray-600 rounded-xl'
                                    required
                                />
                            </div>
                        
                            <div className='flex flex-col space-y-2'>
                                <label>Bathrooms</label>
                                <input
                                    type='number'
                                    value={dataBathrooms}
                                    onChange={(e) => setDataBathrooms(e.target.value)}
                                    className='w-full p-4 border border-gray-600 rounded-xl'
                                    required
                                />
                            </div>
                       
                            <div className='flex flex-col space-y-2'>
                                <label>Max Guests</label>
                                <input
                                    type='number'
                                    value={dataGuests}
                                    onChange={(e) => setDataGuests(e.target.value)}
                                    className='w-full p-4 border border-gray-600 rounded-xl'
                                    required
                                />
                            </div>
                        </div>
                
                        <div 
                            className='cursor-pointer py-4 px-6 text-center bg-airbnb transition text-white rounded-xl hover:bg-airbnb-dark'
                            onClick={() => setCurrentStep(4)}    
                        >
                            Next
                        </div>
                    </>
                ) : currentStep == 4 ? (
                    <>
                        <h2 className='mb-6 text-xl text-center'>
                            <div 
                                onClick={() => setCurrentStep(3)}
                                className="py-2 px-2 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
                            >
                                <GrFormPreviousLink />
                            </div> 

                            Location
                        </h2>

                        <div className='pt-3 pb-6 space-y-4'>
                            <SelectCountry 
                                value={dataCountry}
                                onChange={(value) => setDataCountry(value as SelectCountryValue)}
                                
                            />
                        </div>

                        <div 
                            className='cursor-pointer py-4 px-6 text-center bg-airbnb transition text-white rounded-xl hover:bg-airbnb-dark'
                            onClick={() => setCurrentStep(5)}    
                        >
                            Next
                        </div>
                    </>
                    
                ) : (
                    <>
                        <h2 className='mb-6 text-xl text-center'>
                            <div 
                                onClick={() => setCurrentStep(4)}
                                className="py-2 px-2 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
                            >
                                <GrFormPreviousLink />
                            </div> 

                            Image
                        </h2>

                        <div className='pt-3 pb-6 space-y-4'>
                            <div className="cursor-pointer py-4 px-6 bg-gray-600 hover:bg-gray-700 transition text-white rounded-xl">
                                <input
                                    type='file'
                                    accept='image'
                                    onChange={setImage}
                                    required
                                />
                            </div>

                            {
                                dataImage && (
                                    <div className='w-[200px] h-[150px] relative'>
                                        <img 
                                            alt='Uploaded image'
                                            src={URL.createObjectURL(dataImage)}
                                            className='w-full h-full object-cover rounded-xl'
                                            
                                        />
                                    </div>
                                )
                            }

                        </div>

                        {
                            errors.map((error, index) => {
                                return (
                                    <ul 
                                        className="px-5 text-airbnb-dark rounded-xl opacity-80"
                                        key={`error_${index}`}
                                    >
                                        <li>{ error }</li>
                                    </ul>            
                                )
                            })
                        }

                        <div 
                            className='cursor-pointer py-4 px-6 text-center bg-airbnb transition text-white rounded-xl hover:bg-airbnb-dark'
                            onClick={submitForm}    
                        >
                            Submit
                        </div>
                    </>
                )
            }
            
            
        </>
    )

  return (
    
    <Modal 
        isOpen={addPropertyModal.isOpen}
        close={addPropertyModal.close}
        label="Add Property"
        content={content}
    />
   
  )
}

export default AddPropertyModal