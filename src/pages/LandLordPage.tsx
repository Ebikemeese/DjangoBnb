
import ContactButton from '../components/landlords/ContactButton'
import Property from '../components/properties/Property'

const LandLordPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <aside className="col-span-1 mb-4">
            <div className="flex flex-col items-center p-6 rounded-xl border-gray-300 shadow-xl">
              <img 
                src='/avatar2.jpg'
                alt='Landlord profile picture'
                width={200}
                height={200}
                className='rounded-full'
              />

              <h1 className="mt-6 text-2xl">John Doe</h1>
              <ContactButton />
            </div>
            
          </aside>

          <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
            <div className="mt-6 grid gird-cols-1 md:grid-cols-3 gap-6">
              <Property />
            </div>
          </div>
        </div>
    </main>
  )
}

export default LandLordPage