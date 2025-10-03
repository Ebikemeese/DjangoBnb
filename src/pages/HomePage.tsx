import Category from "../components/categories/category";
import Property from "../components/properties/Property";


const HomePage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <Category />
    
      <div className="mt-6 grid gird-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <Property />
      </div>

    </main>
  )
}

export default HomePage