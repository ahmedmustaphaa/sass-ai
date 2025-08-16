import React, { createContext } from 'react'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
const AppPorvider=createContext();
function ContextProvider({children}) {
    const [token,setToken]=useState();
     const [isOpen, setIsOpen] = useState(false); // Sidebar open/close state

 
    console.log(token)
    axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
    console.log(import.meta.env.VITE_BASE_URL)

      const { user } = useUser();
  
      const { getToken } = useAuth();
      useEffect(() => {
    const getTokenFromStorage = async () => {
      const token = await getToken(); // أو getToken() لو هي متاحة
      setToken(token);
    };
    getTokenFromStorage();
  }, []); 

    const val={
          axios,token,user,isOpen, setIsOpen
    }
  return (
     <AppPorvider.Provider value={val}>

        {children}
     </AppPorvider.Provider>
  )
}


export const shareProviderContext=()=>{
    return useContext(AppPorvider)
}
export default ContextProvider
