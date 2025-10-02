

const TypingIndicator = () => {
  return (
    <>
        <div className='flex'>
            <div className="button--loader flex gap-3 mt-2">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className='text-gray-800 ml-2 text-xl'>typing...</div>
        </div>
    </>
  )
}

export default TypingIndicator