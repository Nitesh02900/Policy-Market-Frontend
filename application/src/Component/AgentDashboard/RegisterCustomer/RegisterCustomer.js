// import React, { useState } from 'react'
// import image from "../../../Image/Register.svg"
// import "./RegisterCustomer.css"
// import { addCustomerByAgent } from '../../../Service/CustomerService'
// import { validateUser } from '../../../Service/Authentication';



// const RegisterCustomer = () => {
//     const[firstName, setFirstName] = useState()
//     const[lastName, setLastName] = useState()
//     const[userName,setUserName] = useState()
//     const[password, setPassword] = useState()
//     const[email,setEmail] = useState()
//     const[mobileNumber,setMobileNumber] = useState()
//     const[dateOfBirth,setDateOfBirth] = useState()
//     const [address,setAddress] = useState()
//     const [state,setState] = useState()
//     const [city , setCity] = useState()
//     const [zip, setZip] = useState()



    
// const isEmailValid = (email) => {
//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//     return emailRegex.test(email);
// };



// const isPasswordValid = (password) => {
//     return password.length >= 6;
// };

// const isMobileNumberValid = (mobileNumber) => {
//     const mobileNumberRegex = /^\d{10}$/;
//     return mobileNumberRegex.test(mobileNumber);
//   };

// const AddCustomer = async() =>{

//     if (!firstName|| !lastName || !userName || !password ||  !email || !address||!city || !state || !zip || !mobileNumber || !dateOfBirth) {
//         alert('Please fill in all required fields.');
//         return;
//     } else if (!firstName) {
//         alert('Please fill Name.');
//         return;
//     } else if (!lastName) {
//         alert('Please fill Name.');
//         return;
//     }
//     else if (!userName) {
//         alert('Please fill User Name.');
//         return;
//     } else if (!password) {
//         alert('Please fill password (min 6 characters).');
//         return;
//     } else if (!isPasswordValid(password)) {
//         alert('Password must be at least 6 characters long.');
//         return;
//     } else if (!email) {
//         alert('Please fill email (valid format).');
//         return;
//     } else if (!isEmailValid(email)) {
//         alert('Please enter a valid email address.');
//         return;
//     }else if (!mobileNumber) {
//         alert('Please enter a valid Mobile Number (10 digits).');
//         return;
//     } else if (!isMobileNumberValid(mobileNumber)) {
//         alert('Mobile Number must be 10 digits.');
//         return;
//     }else if (!dateOfBirth) {
//         alert('Please enter a valid Date Of Birth .');
//         return;
//     }


//     try{
//         const authToken = localStorage.getItem('authentication')
//         let resp = await validateUser(authToken)
     
//         let response = await addCustomerByAgent(firstName, lastName,userName,password,email,mobileNumber,dateOfBirth,address,state,city,zip,resp.data.sub)
//         // console.log(response)
//         setFirstName('');
//         setLastName('');
//         setUserName('');
//         setPassword('');
//         setEmail('');
//         if(response)
//         {
//                 alert("Customer is added successfully")
//         }
//     }
//     catch(error)
//     {
//         console.log(error)
//         alert(error.message)
//     }
// }



//   return (
//     <>
//         <div className='register-customer-container'>
//             <div class="register-customer-left-element">
//                 <img style ={{ height:"110vh", width:"115vh", paddingLeft:"1rem" }} src={image} alt="Phone image"/>
//             </div>

            
//             <div className="register-customer-right-element">
//                 <div className='register-customer-box'>
//                     <div className='register-customer-tittle'>
//                         <h1 className='register-customer-heading' >Register Customer </h1>
//                     </div>
//                     {/* <div className="n-blur" style={{ background: "rgb(238 210 255)" }}></div> */}
//                     <div className='register-customer-form'>
//                         <form className ='register-customer-postdata' >
//                             <div className='register-customer-form-group'>
//                                 <label htmlFor="FirstName" style ={{ marginRight:"47px"}} > First Name:</label>
//                                 <input type="text" className="register-customer-form-control" id="firstName"  value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
//                             </div>
//                             <div className='register-customer-form-group'>
//                                 <label htmlFor="lastName" style ={{ marginRight:"49px"}} > Last Name:</label>
//                                 <input type="text" className="register-customer-form-control" id="lastName"  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
//                             </div>
//                             <div className='register-customer-form-group'>
//                                 <label htmlFor="userName" style ={{ marginRight:'49px'}} > UserName:</label>
//                                 <input type="text" className="register-customer-form-control" id="userName"  value={userName} onChange={(e) => setUserName(e.target.value)}/>
//                             </div>

                            
//                             <div className='register-customer-form-group'>
//                                 <label htmlFor="password" style ={{ marginRight:"54px"}} > Password:</label>
//                                 <input type="password" className="register-customer-form-control" id="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        
//                             </div>
//                             <div className='register-customer-form-group'>
//                                 <label htmlFor="email" style ={{ marginRight:"82px"}} > Email:</label>
//                                 <input type="email" className="register-customer-form-control" id="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
//                             </div>
                        
//                             <div className='register-customer-form-group'>
//                                 <label htmlFor="mobileNumber" style ={{ marginRight:"22px"}} > MobileNumber:</label>
//                                 <input type="mobileNumber" className="register-customer-form-control" id=""  value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}/>
//                             </div>
//                             <div className='register-customer-form-group'>
//                                 <label htmlFor="dateOfBirth" style ={{ marginRight:"40px"}} > DateOfBirth:</label>
//                                 <input type="date" className="register-customer-form-control" id="dateOfBirth"  value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
//                             </div>
//                             <div className='register-customer-form-group'>
//                                 <label htmlFor="address" style ={{ marginRight:"68px"}} > Address</label>
//                                 <input type="text" className="register-customer-form-control" id="address"  value={address} onChange={(e) => setAddress(e.target.value)}/>
//                             </div>
//                             <div className='register-customer-form-group'>
//                                 <label htmlFor="state" style ={{ marginRight:"86px"}} > State:</label>
//                                 <input type="text" className="register-customer-form-control" id="state"  value={state} onChange={(e) => setState(e.target.value)}/>
//                             </div>
//                             <div className='register-customer-form-group'>
//                                 <label htmlFor="city" style ={{ marginRight:"94px"}} > City:</label>
//                                 <input type="text" className="register-customer-form-control" id="dateOfBirth"  value={city} onChange={(e) => setCity(e.target.value)}/>
//                             </div>
//                             <div className='register-customer-form-group'>
//                                 <label htmlFor="zip" style ={{ marginRight:"64px"}} > PinCode:</label>
//                                 <input type="text" className="register-customer-form-control" id="zip"  value={zip} onChange={(e) => setZip(e.target.value)}/>
//                             </div>
//                             <div className='register-customer-button-group'>
//                                 <button type="button" className="btn btn-primary register-customer-button" onClick={ AddCustomer}>Register Customer</button>
//                             </div>
                            
                                    
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
    
//     </>
//   )
// }

// export default RegisterCustomer


import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from "../../../Image/Register.svg";
import "./RegisterCustomer.css";
import { addCustomerByAgent } from '../../../Service/CustomerService';
import { validateUser } from '../../../Service/Authentication';

const RegisterCustomer = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const isMobileNumberValid = (mobileNumber) => {
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(mobileNumber);
  };

  const AddCustomer = async () => {
    if (!firstName || !lastName || !userName || !password || !email || !address || !city || !state || !zip || !mobileNumber || !dateOfBirth) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Validate First and Last Name
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      toast.error('First name can only contain letters.');
      return;
    }

    if (!/^[a-zA-Z]+$/.test(lastName)) {
      toast.error('Last name can only contain letters.');
      return;
    }

    // Validate Password
    if (!isPasswordValid(password)) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    // Validate Email
    if (!isEmailValid(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Validate Mobile Number
    if (!/^\d{10}$/.test(mobileNumber)) {
      toast.error('Mobile number must be 10 digits.');
      return;
    }

    if (!isMobileNumberValid(mobileNumber)) {
      toast.error('Please enter a valid mobile number.');
      return;
    }

    // Validate Date of Birth
    const currentDate = new Date();
    const enteredDate = new Date(dateOfBirth);

    if (enteredDate > currentDate || (currentDate.getFullYear() - enteredDate.getFullYear()) < 18) {
      toast.error('Please enter a valid date of birth (must be at least 18 years old).');
      return;
    }

    // Validate ZIP Code
    if (zip.length < 6) {
      toast.error('ZIP Code must be at least 6 characters long.');
      return;
    }

    try {
      const authToken = localStorage.getItem('authentication');
      let resp = await validateUser(authToken);

      let response = await addCustomerByAgent(firstName, lastName, userName, password, email, mobileNumber, dateOfBirth, address, state, city, zip, resp.data.sub);

      setFirstName('');
      setLastName('');
      setUserName('');
      setPassword('');
      setEmail('');

      if (response) {
        toast.success('Customer is added successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  return (
    <>
        <div className='register-customer-container'>
            <div class="register-customer-left-element">
                <img style ={{ height:"110vh", width:"115vh", paddingLeft:"1rem" }} src={image} alt="Phone image"/>
            </div>
            {/* <div class="register-customer-left-element">
              <img style ={{ height:"110vh", width:"115vh", paddingLeft:"1rem" }} src={image} alt="Phone image"/>
           </div> */}

            
            <div className="register-customer-right-element">
                <div className='register-customer-box'>
                    <div className='register-customer-tittle'>
                        <h1 className='register-customer-heading' >Register Customer </h1>
                    </div>
                    {/* <div className="n-blur" style={{ background: "rgb(238 210 255)" }}></div> */}
                    <div className='register-customer-form'>
                        <form className ='register-customer-postdata' >
                            <div className='register-customer-form-group'>
                                <label htmlFor="FirstName" style ={{ marginRight:"47px"}} > First Name:</label>
                                <input type="text" className="register-customer-form-control" id="firstName"  value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                            </div>
                            <div className='register-customer-form-group'>
                                <label htmlFor="lastName" style ={{ marginRight:"49px"}} > Last Name:</label>
                                <input type="text" className="register-customer-form-control" id="lastName"  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                            </div>
                            <div className='register-customer-form-group'>
                                <label htmlFor="userName" style ={{ marginRight:'49px'}} > UserName:</label>
                                <input type="text" className="register-customer-form-control" id="userName"  value={userName} onChange={(e) => setUserName(e.target.value)}/>
                            </div>

                            
                            <div className='register-customer-form-group'>
                                <label htmlFor="password" style ={{ marginRight:"54px"}} > Password:</label>
                                <input type="password" className="register-customer-form-control" id="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        
                            </div>
                            <div className='register-customer-form-group'>
                                <label htmlFor="email" style ={{ marginRight:"82px"}} > Email:</label>
                                <input type="email" className="register-customer-form-control" id="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        
                            <div className='register-customer-form-group'>
                                <label htmlFor="mobileNumber" style ={{ marginRight:"22px"}} > MobileNumber:</label>
                                <input type="mobileNumber" className="register-customer-form-control" id=""  value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}/>
                            </div>
                            <div className='register-customer-form-group'>
                                <label htmlFor="dateOfBirth" style ={{ marginRight:"40px"}} > DateOfBirth:</label>
                                <input type="date" className="register-customer-form-control" id="dateOfBirth"  value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                            </div>
                            <div className='register-customer-form-group'>
                                <label htmlFor="address" style ={{ marginRight:"68px"}} > Address</label>
                                <input type="text" className="register-customer-form-control" id="address"  value={address} onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            <div className='register-customer-form-group'>
                                <label htmlFor="state" style ={{ marginRight:"86px"}} > State:</label>
                                <input type="text" className="register-customer-form-control" id="state"  value={state} onChange={(e) => setState(e.target.value)}/>
                            </div>
                            <div className='register-customer-form-group'>
                                <label htmlFor="city" style ={{ marginRight:"94px"}} > City:</label>
                                <input type="text" className="register-customer-form-control" id="dateOfBirth"  value={city} onChange={(e) => setCity(e.target.value)}/>
                            </div>
                            <div className='register-customer-form-group'>
                                <label htmlFor="zip" style ={{ marginRight:"64px"}} > PinCode:</label>
                                <input type="text" className="register-customer-form-control" id="zip"  value={zip} onChange={(e) => setZip(e.target.value)}/>
                            </div>
                            <div className='register-customer-button-group'>
                                <button type="button" className="btn btn-primary register-customer-button" onClick={ AddCustomer}>Register Customer</button>
                            </div>
                            
                                    
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer position='top-center' autoClose={3000}/>
    </>
  )
}

export default RegisterCustomer