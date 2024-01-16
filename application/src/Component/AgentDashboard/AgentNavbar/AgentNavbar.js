import React, {useState} from 'react'
import "./AgentNavbar.css"
import { Link } from 'react-router-dom';
import AgentEditProfileModel from '../Models/AgentEditProfileModel';
import { validateUser as validate } from '../../../Service/Authentication';
import { getAgentByUserName } from '../../../Service/AgentService';

import { useNavigate } from 'react-router-dom';


const AgentNavbar = () => {
  const [isAgentProfileOpen, setIsAgentProfileOpen] = useState(false);
  const [isAgentEditProfileModalOpen,setIsAgentEditProfileModalOpen] =useState(false);
  const navigate = new useNavigate();


  const toggleAgentProfile = () => {
    
    setIsAgentProfileOpen(!isAgentProfileOpen);
  } 
  const toggleMyProfile= async() =>{
    try{
        const authToken = localStorage.getItem('authentication')
        let resp = await validate(authToken)
        console.log("username------>", resp.data.sub)
        let response = await getAgentByUserName(resp.data.sub)
      
        const dataToSend = {
          username :response.data.userdetails.username,
          firstName:response.data.userdetails.firstname,
          lastName:response.data.userdetails.lastname,
          mobileNumber:response.data.userdetails.mobileNumber,
          dateOfBirth:response.data.userdetails.dateOfBirth,
          email:response.data.userdetails.emailId,
          salary :response.data.salary
        }
       navigate('/agentDashboard/profile', { state: dataToSend });
    }
    catch(error){
        console.log(error)
        alert(error.message)
      }
   }
  
  const toggleAgentEditProfileModel = () => {
    // console.log("indide")
    setIsAgentEditProfileModalOpen(!isAgentEditProfileModalOpen);
  };


  return (
    <>
        <nav className="customer-navbar navbar-expand-lg navbar-transparent navbar-light customer-fixed-top" id="nav">
          <div className="customer-nav-container">
              <a className="customer-navbar-brand" href="">
                 Insurance App
              </a>
              {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button> */}
              <div className="customer-collapsed " id="navbarSupportedContent">
                <ul className="customer-navbar-left mr-auto">
                    <li className="customer-nav-item ">
                    
                      <Link to="/" className='customer-nav-link' >Home</Link>
                        
                    </li>
                    <li className="nav-item ">
                    <Link to="/plan" className='customer-nav-link '>Insurance Plan</Link>
                      
                      </li>
                    <li className="customer-nav-item ">
                      <a href="#About-Us" className="customer-nav-link">About Us</a>
                    </li>
                    <li className="customer-nav-item ">
                      <a href="#Contact-Us" className="customer-nav-link">Contact Us</a>
                    </li>
                </ul>
                <ul className="customer-navbar-right">
                    
                    <li className="customer-nav-item">
                      <button  className="nav-link" >
                        <i class="ri-user-3-fill"  style={{height:"3rem", fontSize:"1.6rem", color:"#223464"}} onClick={toggleAgentProfile}></i>
                      </button>
                    
                    </li>
                    {isAgentProfileOpen && (
                    <div className="profile-popup">
                        
                        <Link to="" className='d-text' onClick={toggleMyProfile} >MyProfile</Link>
                        
                        <a href="" className='d-text' onClick={(e) => { e.preventDefault(); toggleAgentEditProfileModel(); }}>Edit Profile</a>
   
                        <Link to="/" className='d-text' onClick={(e)=> {localStorage.clear()}}>Logout</Link>
                        
                    </div>
                    )}
                    
                    
                </ul>
              </div>
          </div>
        </nav>

        <div>
          {isAgentEditProfileModalOpen && ( <AgentEditProfileModel isOpen={isAgentEditProfileModalOpen} toggleAgentEditProfileModel={toggleAgentEditProfileModel} />
          )}
        </div>
        
    </>
    
  )
}

export default AgentNavbar
