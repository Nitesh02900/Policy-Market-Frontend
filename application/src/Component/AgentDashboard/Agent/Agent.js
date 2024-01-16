import React from 'react'
import {useState,useEffect} from 'react'
import AgentNavbar from '../AgentNavbar/AgentNavbar'
import AgentPage from '../AgentPage/AgentPage'
import Footer from '../../FrontPage/Footer/Footer'
import { validateUser as validate } from '../../../Service/Authentication';

const Agent = () => {
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
      if (resp.data.role[0].authority !== 'ROLE_AGENT') {
        setIsUserValid(false);
      } else {
        setIsUserValid(true);
      }
    } catch (error) {
      console.error('Error validating user:', error);
      setIsUserValid(false); 
    }
  };

 useEffect(()=>{
  validateUser()
},[])

if(isUserValid)
{
  return (
    <>
       <AgentNavbar/>
       <AgentPage/>
       <div style={{marginTop:"10rem"}}>
        <Footer/>
        </div>
    </>
  )
} else{
  return (
    <>
      <a href='/'>Please Login First</a> 
   </>
  )
}
}

export default Agent
