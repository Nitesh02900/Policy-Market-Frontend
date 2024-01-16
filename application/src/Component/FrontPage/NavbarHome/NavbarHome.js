import React, {useState} from 'react'
import "./NavbarHome.css"
import LoginModal from '../Modal/LoginModel'
import RegisterModel from '../Modal/RegisterModel'

const NavbarHome = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

 
  const toggleRegistrationModal = () => {
    setShowRegistrationModal(!showRegistrationModal);
  };

  
  // Function to toggle the visibility of the login modal
  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };
  return (
  
    <>
        <nav className="navbar-home navbar-expand-lg  navbar-light fixed-top-element" id="nav">
          <div className="nav-container">
              <a className="navbar-brand" href="">
                 Insurance App
              </a>
             
              <div className="navbar-collapsed " id="navbarSupportedContent">
                <ul className="navbar-left-ele mr-auto">
                    <li className="nav-item ">
                    <a href="" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item ">
                    <a href="#insurance-plans-link" className="nav-link">Insurance Plans</a>
                    </li>
                    <li className="nav-item ">
                    <a href="#About-Us" className="nav-link">About Us</a>
                    </li>
                    <li className="nav-item ">
                    <a href="#Contact-Us" className="nav-link">Contact Us</a>
                    </li>
                </ul>
                <ul className="navbar-right-ele">
                    
                    <li className="nav-item"  >
                      <button  className="nav-link"  onClick={toggleRegistrationModal}>
                        <i className="ri-user-add-fill" ></i>
                      </button>
                    
                    </li>
                    <li className="nav-item"  >
                      <button className="nav-link"  onClick={toggleLoginModal}>
                        <i className="ri-user-2-fill"></i>
                      </button>
                    </li>
                    
                </ul>
              </div>
          </div>
        </nav>

        <div>
          {showLoginModal && <LoginModal  showLoginModal={showLoginModal} toggleLoginModal={toggleLoginModal} />}
        </div>
        <div>
        { showRegistrationModal && <RegisterModel
          showRegistrationModal={showRegistrationModal}
          toggleRegistrationModal={toggleRegistrationModal}/>}
        </div>
      
        
    </>
  )
}


export default NavbarHome
