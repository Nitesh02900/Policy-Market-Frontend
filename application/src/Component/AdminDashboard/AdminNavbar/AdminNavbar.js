import React, {useState} from 'react'
import "./AdminNavbar.css"
import { Link } from 'react-router-dom';
import AdminEditProfileModel from '../Models/AdminEditProfileModel';
import { useNavigate } from 'react-router-dom';
import { validateUser as validate } from '../../../Service/Authentication';
import { getAdminByUserName } from '../../../Service/AdminService';

const CustomerNavbar = () => {
  const [isAdminProfileOpen, setIsAdminProfileOpen] = useState(false);
  const [isAdminEditProfileModalOpen,setIsAdminEditProfileModalOpen] =useState(false);
  const navigate = new useNavigate();
  
  const toggleAdminProfile = () => {
      setIsAdminProfileOpen(!isAdminProfileOpen);
    };

  
  const toggleAdminEditProfileModel = () => {
    setIsAdminEditProfileModalOpen(!isAdminEditProfileModalOpen);
  };

  const toggleMyProfile= async() =>{
    try{
        const authToken = localStorage.getItem('authentication')
        let resp = await validate(authToken)
        console.log("username------>", resp.data.sub)
        let response = await getAdminByUserName(resp.data.sub)
      
        const dataToSend = {
          username :response.data.userdetails.username,
          firstName:response.data.userdetails.firstname,
          lastName:response.data.userdetails.lastname,
          address:response.data.address,
          mobileNumber:response.data.userdetails.mobileNumber,
          dateOfBirth:response.data.userdetails.dateOfBirth,
          email:response.data.userdetails.emailId,
          city:response.data.userdetails.city,
          state:response.data.userdetails.state,
          pincode : response.data.pincode
        }
       navigate('/adminDashboard/profile', { state: dataToSend });
    }
    catch(error){
        console.log(error)
        alert(error.message)
      }
   }



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
                    {/* <a href="#insurance-plans-link" className="customer-nav-link">Insurance Plans</a> */}
                    <Link to="/plandetails" className='customer-nav-link '>Insurance Plan</Link>
                      
                    </li>
                    <li className="nav-item ">
                   <Link to="/adminDashboard/policy" className='customer-nav-link '>Poilcy</Link>
                      
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
                        <i class="ri-user-3-fill"  style={{height:"3rem", fontSize:"1.6rem", color:"#223464"}} onClick={toggleAdminProfile}></i>
                      </button>
                    
                    </li>
                    {isAdminProfileOpen && (
                    <div className="profile-popup">
                        <Link to="" className='d-text'  onClick={toggleMyProfile}>My Profile</Link>
                        <a href="" className='d-text' onClick={(e) => { e.preventDefault(); toggleAdminEditProfileModel(); }}>Edit Profile</a>
   
                        <Link to="/" className='d-text' onClick={(e)=> {localStorage.clear()}}>Logout</Link>
                        
                    </div>
                    )}
                    
                    
                </ul>
              </div>
          </div>
        </nav>

        <div>
          {isAdminEditProfileModalOpen && ( <AdminEditProfileModel isOpen={isAdminEditProfileModalOpen} toggleAdminEditProfileModel={toggleAdminEditProfileModel} />
          )}
        </div>
        
    </>
    
  )
}

export default CustomerNavbar
