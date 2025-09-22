import { Link } from "react-router-dom"

const Conversation = () => {
  return (
    <div className='px-6 py-4 border border-gray-300 rounded-xl'>
        <p className="mb-6 text-xl">John Doe</p>

        <Link to='#' className='text-airbnb-dark'>
          Go to Conversation
        </Link>
    </div>
  )
}

export default Conversation