import React, {useState} from 'react'
import "./Navbar.css"
import LoginModal from '../../FrontPage/Modal/LoginModel'
import RegisterModel from '../../FrontPage/Modal/RegisterModel'


const Navbar = () => {
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
           <nav className="navbar navbar-expand-lg navbar-transparent navbar-light fixed-top" id="nav">
          <div className="nav-container">
              <a className="navbar-brand" href="">
                 Insurance App
              </a>
              {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button> */}
              <div className="collapsed " id="navbarSupportedContent">
                <ul className="navbar-left mr-auto">
                    <li className="nav-item ">
                    <a href="#home-page" className="nav-link">Home</a>
                    </li>
                    
                    <li className="nav-item ">
                      <a href="#insurance-plans-link" className="nav-link">Insurance Plans</a>
                    </li>
                    <li className="nav-item ">
                    <a href="" className="nav-link">About Us</a>
                    </li>
                    <li className="nav-item ">
                    <a href="" className="nav-link">Contact Us</a>
                    </li>
                </ul>
                <ul className="navbar-right">
                    
                    <li className="nav-item">
                      <button  className="nav-link" onClick={toggleRegistrationModal}>
                        <i className="ri-user-add-fill" style={{height:"2rem"}}></i>
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

export default Navbar
