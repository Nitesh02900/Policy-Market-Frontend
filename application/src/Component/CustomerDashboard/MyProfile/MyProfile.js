// import React, {useState} from 'react'
// import "./MyProfile.css"
// import { useLocation } from 'react-router-dom';
// import { updateCustomer } from '../../../Service/CustomerService';

// import image from "../../../Image/ProfilePic.svg"

// const MyProfile = () => {
//   const location = useLocation();
//   const receivedData = location.state || {};


//   const [updatedData, setUpdatedData] = useState({
//     username: receivedData.username,
//     firstName: receivedData.firstName,
//     lastName: receivedData.lastName,
//     address: receivedData.address,
//     email: receivedData.email,
//     mobileNumber: receivedData.mobileNumber,
//     dateOfBirth: receivedData.dateOfBirth,
//     city: receivedData.city,
//   });


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setUpdatedData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const updateDetails = async () => {
//     try {
//       console.log("update customer my profilr")
//       let resp = await updateCustomer(updatedData);

//       location.state = {
//         ...location.state,
//         ...updatedData,
//       };
//     } catch (error) {
//       console.error('Error updating customer details:', error);
//     }
//   };
  

//   return (
//     <>
//           <div className="resume-container">
//             <div className='resume-box'>
//               <div className="resume_left">
//                 <div className="resume_profile">
//                   <img src={image} alt="profile_pic"  style={{width:"14rem", marginTop:"4rem"}}/>
//                 </div>
//               </div>
//               <div className="resume_right">
//                 <div className="myprofile-card">
//                   <form >
//                     <div className="resume_item resume_info">
//                       <div className="title">
//                         <h2 className="bold" style={{textAlign:'center', fontWeight:"500", fontSize:'2.5rem', paddingBottom:"1rem"}}>Customer Details</h2>
//                       </div>
//                       <div className="form-fields">
//                         <div className="form-field">
//                             <label htmlFor="username" style ={{ marginRight:"60px"}}>UserName:</label>
//                             <input
//                               type="text"
//                               id="username"
//                               name="username"
//                               disabled
//                               className='myprofile-form-control'
//                               value={receivedData.username}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                           <div className="form-field">
//                             <label htmlFor="firstName" style ={{ marginRight:"59px"}}>First Name:</label>
//                             <input
//                               type="text"
//                               id="firstName"
//                               name="firstName"
//                               className='myprofile-form-control'
//                               value={receivedData.firstName}
//                               onChange={handleInputChange}
                              
//                               required
//                             />
//                           </div>
//                           <div className="form-field">
//                             <label htmlFor="lastName" style ={{ marginRight:"60px"}}>Last Name:</label>
//                             <input
//                               type="text"
//                               id="lastName"
//                               name="lastName"
//                               className='myprofile-form-control'
//                               value={receivedData.lastName}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
                       
//                           <div className="form-field">
//                             <label htmlFor="address"style ={{ marginRight:"78px"}}>Address:</label>
//                             <input
//                               type="text"
//                               id="address"
//                               name="address"
//                               className='myprofile-form-control'
//                               value={receivedData.address}
//                               onChange={handleInputChange}
                              
//                             />
//                           </div>
//                           <div className="form-field">
//                             <label htmlFor="email" style ={{ marginRight:"96px"}}>Email:</label>
//                             <input
//                               type="email"
//                               id="email"
//                               name="email"
//                               className='myprofile-form-control'
//                               value={receivedData.email}
//                               onChange={handleInputChange}
//                             />
//                           </div>
//                         <div className="form-field">
//                           <label htmlFor="phone" style ={{ marginRight:"90px"}}>Phone:</label>
//                           <input
//                             type="tel"
//                             id="phone"
//                             name="phone"
//                             className='myprofile-form-control'
//                             value={receivedData.mobileNumber}
//                             onChange={handleInputChange}
                            
//                           />
//                         </div>
//                         <div className="form-field">
//                           <label htmlFor="dateOfBirth" style ={{ marginRight:"39px"}}>Date Of Birth:</label>
//                           <input
//                             type="text"
//                             id="dateOfBirth"
//                             name="dateOfBirth"
//                             className='myprofile-form-control'
//                             value={receivedData.dateOfBirth}
//                             onChange={handleInputChange}
                            
//                           />
//                         </div>
//                         <div className="form-field">
//                           <label htmlFor="city" style ={{ marginRight:"110px"}}>City:</label>
//                           <input
//                             type="text"
//                             id="city"
//                             name="city"
//                             className='myprofile-form-control'
//                             value={receivedData.city}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="form-field">
//                           <label htmlFor="pincode" style ={{ marginRight:"80px"}}>Pincode:</label>
//                           <input
//                             type="text"
//                             id="pincode"
//                             name="pincode"
//                             className='myprofile-form-control'
//                             value={receivedData.pincode}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                       </div>
//                       <button className='btn btn-primary login-button' onClick={updateDetails}>Update</button>
                       
//                     </div>
//                    </form>
                  
//                 </div>
                
//               </div>
//             </div>
//           </div>
//     </>
//   )
// }
// export default MyProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MyProfile.css";
import { useLocation } from 'react-router-dom';
import { updateCustomer } from '../../../Service/CustomerService';
import image from "../../../Image/ProfilePic.svg";
import { validateUser as validate } from '../../../Service/Authentication';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
  const [username, setUsername] = useState('');
  const location = useLocation();
  const receivedData = location.state || {};

  const [updatedData, setUpdatedData] = useState({
    username: receivedData.username,
    firstName: receivedData.firstName,
    lastName: receivedData.lastName,
    address: receivedData.address,
    email: receivedData.email,
    mobileNumber: receivedData.mobileNumber,
    dateOfBirth: receivedData.dateOfBirth,
    city: receivedData.city,
    pincode: receivedData.pincode,
    editableFields: ['firstName', 'lastName', 'email', 'address', 'mobileNumber', 'city', 'pincode'],
  });

  const isNameValid = (name) => {
    const nameRegex = /^[^\d!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]+$/;
    return nameRegex.test(name);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };
  const isPhoneNumberValid = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isPincodeValid = (pincode) => {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { firstName, lastName, email,address,mobileNumber,city,pincode } = updatedData;
  
    if (!firstName || !lastName || !email ||!address || !mobileNumber || !city || !pincode) {
      toast.error('Please fill in all required fields.');
      return;
    }
  
    if (!isNameValid(firstName) || !isNameValid(lastName)) {
      toast.error('First Name and Last Name should not contain digits or special characters.');
      return;
    }
  
    if (!isEmailValid(email)) {
      toast.error('Please fill Email in a valid format.');
      return;
    }
    if (!isPhoneNumberValid(updatedData.mobileNumber)) {
      toast.error('Phone number should be a 10-digit number.');
      return;
    }

    if (!isPincodeValid(updatedData.pincode)) {
      toast.error('Pincode should be a 6-digit number.');
      return;
    }
    try {
      const authToken = localStorage.getItem('authentication');
  
      await updateCustomer(updatedData.username, updatedData, authToken);
      
      toast.success('Profile updated successfully!', 'success');
  
      console.log('Editable fields updated successfully:', updatedData.editableFields);
      console.log('Customer details updated successfully:', updatedData);
    } catch (error) {
      console.error('Error updating customer details:', error);
      toast.error('Error updating customer details. Please try again.', 'error');
    }
  };
  
  return (
    <>
      <div className="resume-container">
        <div className='resume-box'>
          <div className="resume_left">
            <div className="resume_profile">
              <img src={image} alt="profile_pic" style={{ width: "14rem", marginTop: "4rem" }} />
            </div>
          </div>
          <div className="resume_right">
            <div className="myprofile-card">
              <form onSubmit={handleSubmit}>
                <div className="resume_item resume_info">
                  <div className="title">
                    <h2 className="bold" style={{ textAlign: 'center', fontWeight: "500", fontSize: '2.5rem', paddingBottom: "1rem" }}>Customer Details</h2>
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
                      <label htmlFor="address" style={{ marginRight: "60px" }}>Address:</label>
                      {updatedData.editableFields.includes('address') ? (
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className='myprofile-form-control'
                          value={updatedData.address}
                          onChange={handleInputChange}
                          required
                        />
                      ) : (
                        <span>{receivedData.address}</span>
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
                      <label htmlFor="phone" style={{ marginRight: "96px" }}>Phone:</label>
                      {updatedData.editableFields.includes('mobileNumber') ? (
                        <input
                          type="tel"
                          id="phone"
                          name="mobileNumber"
                          className='myprofile-form-control'
                          value={updatedData.mobileNumber}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <span>{receivedData.mobileNumber}</span>
                      )}
                    </div>


                    <div className="form-field">
                      <label htmlFor="dateOfBirth" style={{ marginRight: "39px" }}>Date Of Birth:</label>
                      <input
                        type="text"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        className='myprofile-form-control'
                        value={receivedData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="city" style={{ marginRight: "60px" }}>City:</label>
                      {updatedData.editableFields.includes('city') ? (
                        <input
                          type="text"
                          id="city"
                          name="city"
                          className='myprofile-form-control'
                          value={updatedData.city}
                          onChange={handleInputChange}
                          required
                        />
                      ) : (
                        <span>{receivedData.city}</span>
                      )}
                    </div>

                    <div className="form-field">
                      <label htmlFor="pincode" style={{ marginRight: "60px" }}>Pincode:</label>
                      {updatedData.editableFields.includes('pincode') ? (
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          className='myprofile-form-control'
                          value={updatedData.pincode}
                          onChange={handleInputChange}
                          required
                        />
                      ) : (
                        <span>{receivedData.pincode}</span>
                      )}
                    </div>
                  </div>
                  <button className='btn btn-primary login-button' type="submit">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default MyProfile;