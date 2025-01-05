import { useCallback, useEffect, useRef } from "react"

export const useClickOutside = (callback) => {
  const reference = useRef(null);



  const handleClick = useCallback((e) => {
      const isCallBackValid = callback && typeof callback === 'function';
      
     if(!isCallBackValid) {
        return;
     }
 
     if(reference.current && !reference.current.contains(e.target)){
        callback()
     } 

  }, [callback])

  useEffect(()=> {
   document.addEventListener('click', handleClick);

   return () => {
    document.removeEventListener('click', handleClick);
   }
  }, [])

  return reference;
}