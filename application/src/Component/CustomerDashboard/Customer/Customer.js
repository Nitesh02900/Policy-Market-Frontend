import React,{useState,useEffect} from 'react'
import CustomerNavbar from '../CustomerNavbar/CustomerNavbar'
import Part1 from "../../FrontPage/Part1/Part1"
import Footer from "../../FrontPage/Footer/Footer"
import { validateUser as validate } from '../../../Service/Authentication';

const Customer = () => {
  const [isUserValid, setIsUserValid] = useState(false)

  const validateUser = async() =>{
    const authToken = localStorage.getItem('authentication')
    if(!authToken)
    {
      setIsUserValid(false)
      return;
    }
   
    try {
      const resp = await validate(authToken);
      if (resp.data.role[0].authority !== 'ROLE_CUSTOMER') {
        setIsUserValid(false);
      } else {
        setIsUserValid(true);
      }
    } catch (error) {
      console.error('Error validating user:', error);
      setIsUserValid(false); // Handle error by setting the state accordingly
    }
  };
  
 useEffect(()=>{
  validateUser()
},[])





 if(isUserValid)
  {
    return (
      <>
        <div style={{backgroundColor:"white"}}>
          <CustomerNavbar/>
          <Part1/>
          <Footer/>
          
              
          </div>
      
      </>
    )
  }
    else{
      return (
        <>
          <a href='/'>Please Login First</a>

          
       </>
  
      )
    }
  
}

export default Customer
