import { IoLocationOutline } from "react-icons/io5";

const LocationExplorerPanel = ({suggestions = [], activeField, setDestination, setPickup}) => {

    const handleSuggestionClick = (elem) => {
       if(activeField === 'pickup'){
         setPickup(elem)
       }else if(activeField === 'destination'){
         setDestination(elem)
       }
    }


 
  return (
   <div className="flex flex-col gap-3 bg-white p-4 h-[65%] overflow-y-scroll shadow-lg rounded-md">
   {/* No Results Message */}
   {suggestions.length <= 0 && (
     <h1 className="text-xl font-semibold text-gray-600 text-center mt-10">
       No Results Found
     </h1>
   )}
 
   {/* Suggestions List */}
   {suggestions &&
     suggestions.map((suggestion, idx) => (
       <div
         key={idx}
         onClick={() => handleSuggestionClick(suggestion)}
         className="flex items-center gap-3 border border-gray-200 hover:border-gray-400 p-3 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
       >
         {/* Location Icon */}
         <div className="bg-gray-100 text-gray-700 h-10 w-10 flex items-center justify-center rounded-full">
           <IoLocationOutline size={20} />
         </div>
 
         {/* Suggestion Text */}
         <h4 className="font-medium text-gray-800 text-base truncate">
           {suggestion}
         </h4>
       </div>
     ))}
 </div>
  )
}

export default LocationExplorerPanel