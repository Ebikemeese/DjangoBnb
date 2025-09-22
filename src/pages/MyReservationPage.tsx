


const MyReservationPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
        <h1 className="mt-6 text-2xl mb-6 text-center">
            My Reservations
        </h1>

        <div className="space-y-4">
            <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                <div className="col-span-1">
                    <div className="relative overflow-hidden aspect-square rounded-xl">
                        <img
                            src='/staircase.jpg'
                            alt='Beach House'
                            className='hover:scale-110 object-cover transition h-full w-full'
                        />
                    </div>
                </div>

                <div className="col-span-1 md:col-span-3 space-y-2">
                    <h2 className="mb-4 text-xl">Property Name</h2>

                    <p className='mb-2'><strong className='text-gray-800'>Check in date:</strong> 14/08/2025</p>
                    <p className='mb-2'><strong className='text-gray-800'>Check out date:</strong> 16/08/2025</p>

                    <p className='mb-2'><strong className='text-gray-800'>Number of nights:</strong> 2</p>
                    <p className='mb-2'><strong className='text-gray-800'>Total price:</strong> $200</p>
                
                    <div className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl transition hover:bg-airbnb-dark">
                        Go to property
                    </div>
                </div>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                <div className="col-span-1">
                    <div className="relative overflow-hidden aspect-square rounded-xl">
                        <img
                            src='/beach.jpg'
                            alt='Beach House'
                            className='hover:scale-110 object-cover transition h-full w-full'
                        />
                    </div>
                </div>

                <div className="col-span-1 md:col-span-3 space-y-2">
                    <h2 className="mb-4 text-xl">Property Name</h2>

                    <p className='mb-2'><strong className='text-gray-800'>Check in date:</strong> 14/08/2025</p>
                    <p className='mb-2'><strong className='text-gray-800'>Check out date:</strong> 16/08/2025</p>

                    <p className='mb-2'><strong className='text-gray-800'>Number of nights:</strong> 2</p>
                    <p className='mb-2'><strong className='text-gray-800'>Total price:</strong> $200</p>
                
                    <div className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl transition hover:bg-airbnb-dark">
                        Go to property
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default MyReservationPage