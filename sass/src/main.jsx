import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import ContextProvider from './context/ContextProvider.jsx'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
 

    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ContextProvider>
         <BrowserRouter>
           <App/>
         </BrowserRouter>

         </ContextProvider>
</ClerkProvider>

)
