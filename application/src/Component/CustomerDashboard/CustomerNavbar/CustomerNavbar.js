import React, {useState} from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom';
import QueryModel from '../Models/QueryModel';
import EditProfileModel from '../Models/EditProfileModel';
import { validateUser as validate } from '../../../Service/Authentication';
import { getCustomerByUserName } from '../../../Service/CustomerService';
import { useNavigate } from 'react-router-dom';


const CustomerNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [isEditProfileModalOpen,setIsEditProfileModalOpen] =useState(false);

  const [username,setUsername] =useState()
  const navigate=new useNavigate();

 
  
  

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleQueryModel = () => {
    setIsQueryModalOpen(!isQueryModalOpen);
  };


  const toggleEditProfileModel = () => {
    setIsEditProfileModalOpen(!isEditProfileModalOpen);
  };

  const toggleMyProfile= async() =>{
    try{
        const authToken = localStorage.getItem('authentication')
        let resp = await validate(authToken)
        console.log("username------>", resp.data.sub)
        let response = await getCustomerByUserName(resp.data.sub)
      console.log("response------",response)
   
        
        const dataToSend = {
          
          username :response.data.userdetails.username,
          firstName:response.data.userdetails.firstname,
          lastName:response.data.userdetails.lastname,
          address:response.data.address,
          mobileNumber:response.data.userdetails.mobileNumber,
          dateOfBirth:response.data.userdetails.dateOfBirth,
          email:response.data.userdetails.emailId,
          city:response.data.city,
          state:response.data.userdetails.state,
          pincode : response.data.pincode
        }
        
          
    
       navigate('/customerDashboard/profile', { state: dataToSend });
    }
    catch(error){
        console.log(error)
        alert(error.message)
      }
   }

  return (
    <>
        <nav className="customer-navbar customer-fixed-top" id="nav">
          <div className="customer-nav-container">
              <a className="customer-navbar-brand" href="">
                 Insurance App
              </a>
            
              <div className="customer-collapsed " id="navbarSupportedContent">
                <ul className="customer-navbar-left mr-auto">
                    <li className="customer-nav-item ">
                    
                      <Link to="/" className='customer-nav-link' >Home</Link>
                        
                    </li>
                    <li className="customer-nav-item ">
                      <Link to="/plan" className='customer-nav-link '>Insurance Plan</Link>
                        
                    {/* <a href="#insurance-plans-link" className="customer-nav-link">Insurance Plans</a> */}
                    </li>
                    <li className="customer-nav-item ">
                      <Link to="/customerDashboard/PolicyDetails" className='customer-nav-link '>Policy</Link>
                        
                    {/* <a href="#insurance-plans-link" className="customer-nav-link">Insurance Plans</a> */}
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
                        <i class="ri-user-3-fill"  style={{height:"3rem", fontSize:"1.6rem", color:"#223464"}} onClick={toggleProfile}></i>
                      </button>
                    
                    </li>
                    {isProfileOpen && (
                    <div className="profile-popup">
                        <Link to="" className='d-text' onClick={toggleMyProfile}>My Profile</Link>
                        <a href="" className='d-text' onClick={(e) => { e.preventDefault(); toggleEditProfileModel(); }}>Edit Profile</a>
                        <a href="" className='d-text' onClick={(e) => { e.preventDefault(); toggleQueryModel(); }}>Query</a>
                        <Link to="/" className='d-text' onClick={(e)=> {localStorage.clear()}}>Logout</Link>
                        
                    </div>
                    )}
                    
                    
                </ul>
              </div>
          </div>
        </nav>

        <div>
          {isEditProfileModalOpen && ( <EditProfileModel isOpen={isEditProfileModalOpen} toggleEditProfileModel={toggleEditProfileModel} />
          )}
        </div>
        <div>
          {isQueryModalOpen && ( <QueryModel isOpen={isQueryModalOpen} toggleQueryModel={toggleQueryModel} />
          )}
        </div>
    </>
    
  )
}

export default CustomerNavbar
