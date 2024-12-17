import { IoLocationOutline } from "react-icons/io5";

const LocationExplorerPanel = () => {

    const handleSuggestionClick = (elem) => {
       console.log("elem ", elem)
    }
  return (
    <div className="flex flex-col gap-3 bg-white p-2">
      <div  onClick={() => handleSuggestionClick("elem wefwsrg")} className='flex gap-2 border-2 p-2 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start '>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><IoLocationOutline /></h2>
        <h4 className='font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt a neque</h4>
      </div>

      <div  onClick={() => handleSuggestionClick("elem wefwsrg")} className='flex gap-4 border-2 p-2 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start '>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><IoLocationOutline /></h2>
        <h4 className='font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt a neque</h4>
      </div>

      <div  onClick={() => handleSuggestionClick("elem wefwsrg")} className='flex gap-4 border-2 p-2 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start '>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><IoLocationOutline /></h2>
        <h4 className='font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt a neque</h4>
      </div>
    </div>
  )
}

export default LocationExplorerPanel