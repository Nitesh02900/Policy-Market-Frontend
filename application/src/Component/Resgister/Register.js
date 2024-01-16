// import React, {useState} from 'react'
// import './Register.css'
// import image from "../../Image/Register.svg"
// import { addCustomer } from '../../Service/CustomerService'

// const Register = () => {
    
//     const[firstName, setFirstName] = useState()
//     const[lastName, setLastName] = useState()
//     const[userName,setUserName] = useState()
//     const[password, setPassword] = useState()
//     const[email,setEmail] = useState()

//     const isEmailValid = (email) => {
//         const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//         return emailRegex.test(email);
//     };

    

//     const isPasswordValid = (password) => {
//         return password.length >= 6;
//     };


//     const AddCustomers = async() =>{

//         if (!firstName|| !lastName || !userName || !password ||  !email) {
//             alert('Please fill in all required fields.');
//             return;
//         } else if (!firstName) {
//             alert('Please fill Name.');
//             return;
//         } else if (!lastName) {
//             alert('Please fill Name.');
//             return;
//         }
//         else if (!userName) {
//             alert('Please fill User Name.');
//             return;
//         } else if (!password) {
//             alert('Please fill password (min 6 characters).');
//             return;
//         } else if (!isPasswordValid(password)) {
//             alert('Password must be at least 6 characters long.');
//             return;
//         } else if (!email) {
//             alert('Please fill email (valid format).');
//             return;
//         } else if (!isEmailValid(email)) {
//             alert('Please enter a valid email address.');
//             return;
//         }


//         try{
//             let response = await addCustomer(firstName, lastName,userName,password,email)
//             // console.log(response)
//             setFirstName('');
//             setLastName('');
//             setUserName('');
//             setPassword('');
//             setEmail('');
//             if(response)
//             {
//                     alert("Customer is added successfully")
//             }
//         }
//         catch(error)
//         {
//             console.log(error)
//             alert(error.message)
//         }
//     }
    



//   return (
//    <>
//         <div className='register-container'>
//             <div class="register-left-element">
//                 <img style ={{ height:"80vh", width:"70vh", paddingLeft:"1rem"}} src={image} alt="Phone image"/>
//             </div>

            
//             <div className="register-right-element">
//                 <div className='register-box'>
//                     <h1 className='register-heading'>Register </h1>
//                     {/* <div className="n-blur" style={{ background: "rgb(238 210 255)" }}></div> */}
//                     <form className ='register-postdata' >
//                         <div className='register-form-group'>
//                             <label htmlFor="FirstName" style ={{ marginRight:"10px"}} > First Name:</label>
//                             <input type="text" className="register-form-control" id="firstName"  value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
//                         </div>
//                         <div className='register-form-group'>
//                             <label htmlFor="lastName" style ={{ marginRight:"13px"}} > Last Name:</label>
//                             <input type="text" className="register-form-control" id="lastName"  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
//                         </div>
//                         <div className='register-form-group'>
//                             <label htmlFor="userName" style ={{ marginRight:"14px"}} > UserName:</label>
//                             <input type="text" className="register-form-control" id="userName"  value={userName} onChange={(e) => setUserName(e.target.value)}/>
//                         </div>

                        
//                         <div className='register-form-group'>
//                             <label htmlFor="password" style ={{ marginRight:"22px"}} > Password:</label>
//                             <input type="password" className="register-form-control" id="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    
//                         </div>
//                         <div className='register-form-group'>
//                             <label htmlFor="email" style ={{ marginRight:"52px"}} > Email:</label>
//                             <input type="email" className="register-form-control" id="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
//                         </div>
//                         <div className='register-button-group' style={{marginTop:"1rem"}}>
//                             <button type="button" className="btn btn-primary register-button" onClick={ AddCustomers}>Register</button>
//                         </div>
                        
                                
//                     </form>
//                     </div>
//                 </div>
//             </div>
   
   
   
   
//    </>
//   )
// }

// export default Register


import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin } from 'react-loader-spinner';
import './Register.css';
import image from '../../Image/Register.svg';
import { addCustomer } from '../../Service/CustomerService';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const isEmailValid = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const isPasswordValid = (password) => password.length >= 6;

  const showToast = (message, type) => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const AddCustomers = async () => {
    if (!firstName || !lastName || !userName || !password || !email) {
      showToast('Please fill in all required fields.', 'error');
      return;
    } else if (!isPasswordValid(password)) {
      showToast('Password must be at least 6 characters long.', 'error');
      return;
    } else if (!isEmailValid(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    try {
      setLoading(true);
      let response = await addCustomer(firstName, lastName, userName, password, email);
      setFirstName('');
      setLastName('');
      setUserName('');
      setPassword('');
      setEmail('');
      if (response) {
        showToast('Customer is added successfully', 'success');
      }
    } catch (error) {
      console.log(error);
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register-left-element">
          <img style={{ height: '80vh', width: '70vh', paddingLeft: '1rem' }} src={image} alt="Phone image" />
        </div>

        <div className="register-right-element">
          <div className="register-box">
            <h1 className="register-heading">Register </h1>
            <form className="register-postdata">
              <div className="register-form-group">
                <label htmlFor="firstName" style={{ marginRight: '10px' }}>
                  First Name:
                </label>
                <input type="text" className="register-form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="register-form-group">
                <label htmlFor="lastName" style={{ marginRight: '13px' }}>
                  Last Name:
                </label>
                <input type="text" className="register-form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="register-form-group">
                <label htmlFor="userName" style={{ marginRight: '14px' }}>
                  UserName:
                </label>
                <input type="text" className="register-form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className="register-form-group">
                <label htmlFor="password" style={{ marginRight: '22px' }}>
                  Password:
                </label>
                <input type="password" className="register-form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="register-form-group">
                <label htmlFor="email" style={{ marginRight: '52px' }}>
                  Email:
                </label>
                <input type="email" className="register-form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="register-button-group" style={{ marginTop: '1rem' }}>
                <button type="button" className="btn btn-primary register-button" onClick={AddCustomers} disabled={loading}>
                  {loading ? <TailSpin color="#FFF" height={20} width={20} /> : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;