// import React, {useState} from 'react'
// import "./MyProfile.css"
// import { useLocation } from 'react-router-dom';
// import image from "../../../Image/ProfilePic.svg"
// import { useNavigate } from 'react-router-dom';
import React, { useState ,useEffect} from 'react'
import "./MyProfile.css"
import { useLocation } from 'react-router-dom';
import image from "../../../Image/ProfilePic.svg"
import { useNavigate } from 'react-router-dom';
import { validateUser as validate } from '../../../Service/Authentication';
import { updateAdminDetails } from '../../../Service/AdminService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {

    // const location = useLocation();
    // const receivedData = location.state || {};
    // const navigate = new useNavigate();
    
    // const [updatedData, setUpdatedData] = useState({
    //   username: receivedData.username,
    //   firstName: receivedData.firstName,
    //   lastName: receivedData.lastName,
     
    //   email: receivedData.email,
    //   mobileNumber: receivedData.mobileNumber,
    //   dateOfBirth: receivedData.dateOfBirth,
      
    // });
  
  
    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
  
    //   setUpdatedData((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    //   }));
    // };

    // const updateDetails = async () => {
    //   try {
        
    //     location.state = {
    //       ...location.state,
    //       ...updatedData,
    //     };
    //   } catch (error) {
    //     console.error('Error updating customer details:', error);
    //   }
    // };
    
    const [username, setUsername] = useState('');
  const location = useLocation();
  const receivedData = location.state || {};
  const navigate = new useNavigate();



  const [updatedData, setUpdatedData] = useState({
    username: receivedData.username,
    firstName: receivedData.firstName,
    lastName: receivedData.lastName,

    email: receivedData.email,
    mobileNumber: receivedData.mobileNumber,
    dateOfBirth: receivedData.dateOfBirth,
    editableFields: ['firstName', 'lastName', 'email'],
  });

  const isNameValid = (name) => {
    const nameRegex = /^[^\d!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]+$/;
    return nameRegex.test(name);
  };
  
  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validateUser = async () => {
    const authToken = localStorage.getItem('authentication');
    if (authToken) {
      try {
        const resp = await validate(authToken);
        console.log(resp);
        setUsername(resp.data.sub);
      } catch (error) {
        console.error('Error validating user:', error);
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    validateUser();
  }, []);


  const updateDetails = async () => {
    const { firstName, lastName, email } = updatedData;

    if (!firstName || !lastName || !email) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (!isNameValid(firstName)) {
      toast.error('First Name should not contain digits or special characters.');
      return;
    }

    if (!isNameValid(lastName)) {
      toast.error('Last Name should not contain digits or special characters.');
      return;
    }

    if (!isEmailValid(email)) {
      toast.error('Please fill Email (valid format).');
      return;
    }

    try {
      const authToken = localStorage.getItem('authentication');
      const dataForUpdate = {};
      updatedData.editableFields.forEach(field => {
        if ((field === 'email' || field === 'firstName' || field === 'lastName') && updatedData[field] !== null) {
          dataForUpdate[field] = updatedData[field];
        } else if (field !== 'email' && field !== 'firstName' && field !== 'lastName') {
          dataForUpdate[field] = updatedData[field];
        }
      });
      console.log('Data for update:', dataForUpdate);
      await updateAdminDetails(updatedData.username, dataForUpdate, authToken);
      console.log('Editable fields updated successfully:', updatedData.editableFields);
      console.log('Admin details updated successfully:', dataForUpdate);
      toast.success('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating admin details:', error);
      toast.error('Error updating customer details. Please try again.', 'error');
    }
  };


  return (
    <>
        {/* <div className="admin-resume-container">
            <div className='admin-resume-box'>
              <div className="admin-resume_left">
                <div className="admin-resume_profile">
                  <img src={image} alt="profile_pic"  style={{width:"18rem", marginTop:"4rem" ,marginLeft:"2rem"}}/>
                </div>
              </div>
              <div className="admin-resume_right">
                <div className="myprofile-card">
                  <form >
                    <div className="admin-resume_item admin-resume_info">
                      <div className="title">
                        <h2 className="bold" style={{textAlign:'center', fontWeight:"600", fontSize:'2.5rem', paddingBottom:"1rem"}}>My Profile</h2>
                      </div>
                      <div className="form-fields">
                        <div className="form-field">
                            <label htmlFor="username" style ={{ marginRight:"60px"}}>UserName:</label>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              disabled
                              className='myprofile-form-control'
                              value={receivedData.username}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="form-field">
                            <label htmlFor="firstName" style ={{ marginRight:"59px"}}>First Name:</label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              className='myprofile-form-control'
                              value={receivedData.firstName}
                              onChange={handleInputChange}
                              
                              required
                            />
                          </div>
                          <div className="form-field">
                            <label htmlFor="lastName" style ={{ marginRight:"60px"}}>Last Name:</label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              className='myprofile-form-control'
                              value={receivedData.lastName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                       
                          
                          <div className="form-field">
                            <label htmlFor="email" style ={{ marginRight:"96px"}}>Email:</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className='myprofile-form-control'
                              value={receivedData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                        <div className="form-field">
                          <label htmlFor="phone" style ={{ marginRight:"90px"}}>Phone:</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className='myprofile-form-control'
                            value={receivedData.mobileNumber}
                            onChange={handleInputChange}
                            
                          />
                        </div>
                        <div className="form-field">
                          <label htmlFor="dateOfBirth" style ={{ marginRight:"39px"}}>Date Of Birth:</label>
                          <input
                            type="text"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            className='myprofile-form-control'
                            value={new Date((new Date(receivedData.dateOfBirth)).getTime() - (new Date(receivedData.dateOfBirth)).getTimezoneOffset() * 60000).toISOString().split("T")[0]}
                            
                            onChange={handleInputChange}
                            
                          />
                        </div>
                        
                      </div>
                      <div className='button-container'>
                          <button className='btn btn-primary  left-button'>Update</button>
                          <button
                          className='btn btn-primary  right-button'
                            onClick={() => navigate(-1)}
                            style={{
                              width: '5rem',
                              padding: '2px',
                              backgroundColor: 'rgb(34, 52, 100)',
                              marginLeft: '50%',
                              color: 'white',
                              borderRadius:'5px'
                            }}
                          >
                            Go Back
                          </button>
                      </div>
                    </div>
                   </form>
                  
                </div>
                
              </div>
            </div>
          </div> */}
          <div className="admin-resume-container">
        <div className='admin-resume-box'>
          <div className="admin-resume_left">
            <div className="admin-resume_profile">
              <img src={image} alt="profile_pic" style={{ width: "18rem", marginTop: "4rem", marginLeft: "2rem" }} />
            </div>
          </div>
          <div className="admin-resume_right">
            <div className="myprofile-card">
              <form >
                <div className="admin-resume_item admin-resume_info">
                  <div className="title">
                    <h2 className="bold" style={{ textAlign: 'center', fontWeight: "600", fontSize: '2.5rem', paddingBottom: "1rem" }}>My Profile</h2>
                  </div>
                  <div className="form-fields">
                    <div className="form-field">
                      <label htmlFor="username" style={{ marginRight: "60px" }}>UserName:</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        disabled
                        className='myprofile-form-control'
                        value={receivedData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="firstName" style={{ marginRight: "59px" }}>First Name:</label>
                      {/* Conditionally render an input field if it's an editable field */}
                      {updatedData.editableFields.includes('firstName') ? (
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className='myprofile-form-control'
                          value={updatedData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      ) : (
                        // Display the current value if not editable
                        <span>{receivedData.firstName}</span>
                      )}
                    </div>
                    <div className="form-field">
                      <label htmlFor="lastName" style={{ marginRight: "60px" }}>Last Name:</label>
                      {updatedData.editableFields.includes('lastName') ? (
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className='myprofile-form-control'
                          value={updatedData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      ) : (
                        <span>{receivedData.lastName}</span>
                      )}
                    </div>
                    <div className="form-field">
                      <label htmlFor="email" style={{ marginRight: "96px" }}>Email:</label>
                      {updatedData.editableFields.includes('email') ? (
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className='myprofile-form-control'
                          value={updatedData.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <span>{receivedData.email}</span>
                      )}
                    </div>
                    <div className="form-field">
                      <label htmlFor="phone" style={{ marginRight: "90px" }}>Phone:</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        disabled
                        className='myprofile-form-control'
                        value={receivedData.mobileNumber}
                        onChange={handleInputChange}

                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="dateOfBirth" style={{ marginRight: "39px" }}>Date Of Birth:</label>
                      <input
                        type="text"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        disabled
                        className='myprofile-form-control'
                        value={receivedData.dateOfBirth}
                        onChange={handleInputChange}

                      />
                    </div>

                  </div>
                  <div className='button-container'>
                  <button type="button" className='btn btn-primary login-button' onClick={updateDetails}>Update</button>
                    <button
                      className='btn btn-primary  right-button'
                      onClick={() => navigate(-1)}
                      style={{
                        width: '5rem',
                        padding: '2px',
                        backgroundColor: 'rgb(34, 52, 100)',
                        marginLeft: '50%',
                        color: 'white',
                        borderRadius: '5px'
                      }}
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </form>

            </div>

          </div>
        </div>
      </div>
          <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}
export default MyProfile;