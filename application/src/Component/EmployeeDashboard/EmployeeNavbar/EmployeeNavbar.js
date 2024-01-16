import React, {useState} from 'react'
import EmployeeEditProfileModel from '../Models/EmployeeEditProfileModel';
import "./EmployeeNavbar.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { validateUser as validate } from '../../../Service/Authentication';
import { getEmployeeByUserName } from '../../../Service/EmployeeService';


const EmployeeNavbar = () => {

    const [isEmployeeProfileOpen, setIsEmployeeProfileOpen] = useState(false);
    const [isEmployeeEditProfileModalOpen,setIsEmployeeEditProfileModalOpen] =useState(false);
    const navigate = new useNavigate();
    
    const toggleEmployeeProfile = () => {
      setIsEmployeeProfileOpen(!isEmployeeProfileOpen);
    };
  
    
    const toggleEmployeeEditProfileModel = () => {
      // console.log("indide")
      setIsEmployeeEditProfileModalOpen(!isEmployeeEditProfileModalOpen);
    };

    const toggleMyProfile= async() =>{
      try{
          const authToken = localStorage.getItem('authentication')
          let resp = await validate(authToken)
          console.log("username------>", resp.data.sub)
          let response = await getEmployeeByUserName(resp.data.sub)
        
          const dataToSend = {
            username :response.data.userdetails.username,
            firstName:response.data.userdetails.firstname,
            lastName:response.data.userdetails.lastname,
            mobileNumber:response.data.userdetails.mobileNumber,
            dateOfBirth:response.data.userdetails.dateOfBirth,
            email:response.data.userdetails.emailId,
            salary :response.data.salary
          }
         navigate('/employeeDashboard/profile', { state: dataToSend });
      }
      catch(error){
          console.log(error)
          alert(error.message)
        }
     }
  return (
    <>
          <nav className="employee-navbar  employee-fixed-top" id="nav">
          <div className="employee-nav-container">
              <a className="employee-navbar-brand" href="">
                 Insurance App
              </a>
              {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button> */}
              <div className="employee-collapsed " id="navbarSupportedContent">
                <ul className="employee-navbar-left mr-auto">
                    <li className="employee-nav-item ">
                    
                      <Link to="/" className='employee-nav-link' >Home</Link>
                        
                    </li>
                    <li className="nav-item ">
                      <Link to="/employeeDashboard/plandetails" className='customer-nav-link '>Insurance Plan</Link>
                    
                    </li>
                    <li className="employee-nav-item ">
                    <a href="#About-Us" className="employee-nav-link">About Us</a>
                    </li>
                    <li className="employee-nav-item ">
                    <a href="#Contact-Us" className="employee-nav-link">Contact Us</a>
                    </li>
                </ul>
                <ul className="employee-navbar-right">
                    
                    <li className="employee-nav-item">
                      <button  className="nav-link" >
                        <i class="ri-user-3-fill"  style={{height:"3rem", fontSize:"1.6rem", color:"#223464"}} onClick={toggleEmployeeProfile}></i>
                      </button>
                    
                    </li>
                    {isEmployeeProfileOpen && (
                    <div className="employee-profile-popup" style={{marginRight:"4rem"}}>
                        
                        <Link to="" className='d-text' onClick={toggleMyProfile}>My Profile</Link>
                        <a href="" className='d-text' onClick={(e) => { e.preventDefault(); toggleEmployeeEditProfileModel(); }}>Edit Profile</a>
                        
                        <Link to="/employeeDashboard/query" className='d-text' >Query</Link>
                       
                        <Link to="/" className='d-text' onClick={(e)=> {localStorage.clear()}}>Logout</Link>
                        
                    </div>
                    )}
                    
                    
                </ul>
              </div>
          </div>
        </nav>

        <div>
          {isEmployeeEditProfileModalOpen && (   <EmployeeEditProfileModel isOpen={isEmployeeEditProfileModalOpen} toggleEmployeeEditProfileModel={toggleEmployeeEditProfileModel} />
          )}
        </div>
       
    
    
    
    </>
  )
}

export default EmployeeNavbar
