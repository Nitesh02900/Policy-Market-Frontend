import React, {useState, useEffect} from 'react'
import Navbar from "./SchemeNavbar/Navbar"
import Scheme from './SchemePage/Scheme'
import CustomerNavbar from '../CustomerDashboard/CustomerNavbar/CustomerNavbar'
import Footer from '../FrontPage/Footer/Footer'


const SchemeHome = () => {
  const [login,setLogin] = useState(false)

  useEffect(() => {
    // Check for authentication in localStorage and update the state accordingly
    if (localStorage.getItem('authentication')) {
      setLogin(true);
    }
  }, []);

  return (
    <>
        
        {login ? <CustomerNavbar /> : <Navbar />}
        
         <Scheme/>
         <div>
           <Footer/>
         </div>
    
    </>
  )
}

export default SchemeHome
