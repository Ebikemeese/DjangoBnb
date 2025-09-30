import Modal from "./Modal";
import useSearchModal, { type SearchQuery } from "../../hooks/useSearchModal";
import SelectCountry from "../forms/SelectCountry";
import type { SelectCountryValue } from "../forms/SelectCountry";
import { useState } from "react";
import { GrFormPreviousLink } from "react-icons/gr";
import DatePicker from "../forms/Calendar";
import type { Range } from "react-date-range"

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal = () => {
    let content = (<></>)
    const searchModal = useSearchModal()
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)
    const [country, setCountry] = useState<SelectCountryValue>()
    const [numGuests, setNumGuests] = useState<string>('1')
    const [numBedrooms, setNumBedrooms] = useState<string>('0')
    const [numBathrooms, setNumBathrooms] = useState<string>('0')

    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            country: country?.label,
            checkIn: dateRange.startDate,
            checkOut: dateRange.endDate,
            guests: parseInt(numGuests),
            bedrooms: parseInt(numBedrooms),
            bathrooms: parseInt(numBathrooms),
            category: ''
        }

        searchModal.setQuery(newSearchQuery)
        searchModal.close()

    } 

    const _setDateRange = (selection: Range) => {
        if (searchModal.step === 'checkin') {
            searchModal.open('checkout')
        } else if (searchModal.step === 'checkout') {
            searchModal.open('details')
        }

        setDateRange(selection)
    }

    const contentLocation = (
        <>
            <h2 className='mb-6 text-xl text-center'>
                Select country
            </h2>

            <SelectCountry 
                value={country}
                onChange={(value) => setCountry(value as SelectCountryValue)}
            />

            <div 
                className='mt-4 cursor-pointer py-4 px-6 text-center bg-airbnb transition text-white rounded-xl hover:bg-airbnb-dark'
                onClick={() => searchModal.open('checkin')}    
            >
                Next
            </div>
        </>
    )

    const  contentCheckin = (
        <>
            <h2 className='mb-6 text-xl text-center'>
                <div 
                    onClick={() => searchModal.open('location')}
                    className="py-2 px-2 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
                >
                    <GrFormPreviousLink />
                </div>  
                Checkin date
            </h2>

            <DatePicker 
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div 
                className='mt-4 cursor-pointer py-4 px-6 text-center bg-airbnb transition text-white rounded-xl hover:bg-airbnb-dark'
                onClick={() => searchModal.open('checkout')}    
            >
                Next
            </div>
        </>
    )

    const  contentCheckout = (
        <>
            <h2 className='mb-6 text-xl text-center'>
                <div 
                    onClick={() => searchModal.open('checkin')}
                    className="py-2 px-2 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
                >
                    <GrFormPreviousLink />
                </div>  
                Checkout date
            </h2>

            <DatePicker 
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div 
                className='mt-4 cursor-pointer py-4 px-6 text-center bg-airbnb transition text-white rounded-xl hover:bg-airbnb-dark'
                onClick={() => searchModal.open('details')}    
            >
                Next
            </div>
        </>
    )

    const  contentDetails = (
        <>
            <h2 className='mb-6 text-xl text-center'>
                <div 
                    onClick={() => searchModal.open('checkout')}
                    className="py-2 px-2 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
                >
                    <GrFormPreviousLink />
                </div>  
                Details
            </h2>

            <div className="space-y-4">
                <div className="space-y-4">
                    <label >Number of guests:</label>
                    <input 
                        type="number" 
                        min="1" 
                        onChange={(e) => setNumGuests(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label >Number of bedrooms:</label>
                    <input 
                        type="number" 
                        min="1" 
                        onChange={(e) => setNumBedrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label >Number of bathrooms:</label>
                    <input 
                        type="number" 
                        min="1" 
                        onChange={(e) => setNumBathrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>

            <div 
                className='mt-4 cursor-pointer py-4 px-6 text-center bg-airbnb transition text-white rounded-xl hover:bg-airbnb-dark'
                onClick={closeAndSearch}    
            >
                Search
            </div>
        </>
    )

    if (searchModal.step == 'location') {
        content = contentLocation;
    } else if (searchModal.step == 'checkin') {
        content = contentCheckin;
    } else if (searchModal.step == 'checkout') {
        content = contentCheckout
    } else if (searchModal.step == 'details') {
        content = contentDetails
    }

    return (
        <Modal 
            label="Search"
            content={content}
            isOpen={searchModal.isOpen}
            close={searchModal.close}
        />
    )
}

export default SearchModal