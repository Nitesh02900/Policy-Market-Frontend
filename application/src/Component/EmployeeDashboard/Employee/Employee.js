import React from 'react'
import EmployeeNavbar from '../EmployeeNavbar/EmployeeNavbar'
import EmployeePage from '../EmployeePage/EmployeePage'
import Footer from '../../FrontPage/Footer/Footer'
import {useState,useEffect} from 'react'
import { validateUser as validate } from '../../../Service/Authentication';

const Employee = () => {
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
      if (resp.data.role[0].authority !== 'ROLE_EMPLOYEE') {
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
        <EmployeeNavbar/>
        <EmployeePage/>
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

export default Employee
