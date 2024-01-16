// import React, {useEffect, useState} from 'react'
// import image from '../../../Image/Laptop.svg'
// import './EditProfile.css'
// import {validateUser as validate} from "../../../Service/Authentication"

// const EditProfile = () => {
// const[ username,setUsername] = useState()

//     const validateUser = async() =>{
//         const authToken = localStorage.getItem('authentication')
//         if(authToken)
//         {
//             console.log("authtoken--->"+authToken)
//             let resp = await validate(authToken)
//             console.log(resp)
//             setUsername(resp.data.sub)
//         }
//      }
//      useEffect(()=>{
//         validateUser()
//       },[])


//   return (
//     <>

//         <div className="edit-profile-container">
//             <div className="edit-profile-Left-element">
//                 <img style={{ height: '45vh', width: '50vh' }} src={image} alt="Query image" />
//             </div>

//             <div className="edit-profile-right-element">
//                 <div className="edit-profile-box">
//                     <h1 className="edit-profile-heading">Edit Profile</h1>
//                     <form className="edit-profile-postdata">
//                         <div className="edit-profile-form-group">
//                             <label htmlFor="username">Username</label>
//                             <input type="text" className="form-control" id="username" disabled  value={username}/>
//                         </div>

//                         <div className="edit-profile-form-group">
//                             <label htmlFor="password">Change Password</label>
//                             <input type="password" className="form-control" id="password" />
//                         </div>

//                         <div className="edit-profile-button" style={{ marginTop: '1rem' }}>
//                             <button type="button" className="btn btn-primary edit-profile-button">
//                             Save Changes
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }

// export default EditProfile

import React, { useEffect, useState } from 'react';
import image from '../../../Image/Laptop.svg';
import './EditProfile.css';
import { validateUser as validate } from '../../../Service/Authentication';
import { updatePassword } from '../../../Service/CustomerService'; // Import the updatePassword service
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {
  const navigate = new useNavigate();
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState(''); 

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

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleSaveChanges = async (e) => {

    e.preventDefault();
    if (!newPassword) {
      toast.error('Please fill in all required fields.');
      return;
    }

   

    if (!isPasswordValid(newPassword)) {
      toast.error('New Password should be at least 6 characters.');
      return;
    }

    try {
      
      await updatePassword(username, newPassword);
      console.log('Password updated successfully');
      toast.success('Password updated successfully');
      alert('Password updated successfully')
      localStorage.clear()
      navigate('/')              
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Error updating password:', error);
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <>
      <div className="edit-profile-container">
        <div className="edit-profile-Left-element">
          <img style={{ height: '45vh', width: '50vh' }} src={image} alt="Query image" />
        </div>

        <div className="edit-profile-right-element">
          <div className="edit-profile-box">
            <h1 className="edit-profile-heading">Edit Profile</h1>
            <form className="edit-profile-postdata">
              <div className="edit-profile-form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" disabled value={username} />
              </div>

              {/* <div className="edit-profile-form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div> */}

              <div className="edit-profile-form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="edit-profile-button" style={{ marginTop: '1rem' }}>
                <button type="button" className="btn btn-primary edit-profile-button" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default EditProfile;