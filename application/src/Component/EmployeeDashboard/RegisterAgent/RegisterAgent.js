// import React, {useState} from 'react'
// import { addAgent } from '../../../Service/AgentService'
// import image from "../../../Image/Register.svg"
// import "./RegisterAgent.css"

// const RegisterAgent = () => {
//     const[firstName, setFirstName] = useState()
//     const[lastName, setLastName] = useState()
//     const[userName,setUserName] = useState()
//     const[password, setPassword] = useState()
//     const[email,setEmail] = useState()
//     const[totalCommission,setTotalCommission]=useState()
//     const[mobileNumber,setMobileNumber] = useState()
//     const[dateOfBirth,setDateOfBirth] = useState()


//     const isEmailValid = (email) => {
//         const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//         return emailRegex.test(email);
//     };

    

//     const isPasswordValid = (password) => {
//         return password.length >= 6;
//     };

//     const isMobileNumberValid = (mobileNumber) => {
//         const mobileNumberRegex = /^\d{10}$/;
//         return mobileNumberRegex.test(mobileNumber);
//       };

//     const AddAgents = async() =>{

//         if (!firstName|| !lastName || !userName || !password ||  !email || !totalCommission || !mobileNumber || !dateOfBirth) {
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
//         }else if (!totalCommission) {
//             alert('Please enter a valid Salary .');
//             return;
//         }else if (!mobileNumber) {
//             alert('Please enter a valid Mobile Number (10 digits).');
//             return;
//         } else if (!isMobileNumberValid(mobileNumber)) {
//             alert('Mobile Number must be 10 digits.');
//             return;
//         } else if (!dateOfBirth) {
//             alert('Please enter a valid Date Of Birth .');
//             return;
//         }


//         try{
//             let response = await addAgent(firstName, lastName,userName,password,email,totalCommission,mobileNumber,dateOfBirth)
//             // console.log(response)
//             setFirstName('');
//             setLastName('');
//             setUserName('');
//             setPassword('');
//             setEmail('');
//             if(response)
//             {
//                     alert("Employee is added successfully")
//             }
//         }
//         catch(error)
//         {
//             console.log(error)
//             alert(error.message)
//         }
//     }
//   return (
//     <>
//         <div className='register-agent-container'>
//             <div class="register-agent-left-element">
//                 <img style ={{ height:"100vh", width:"80vh", paddingLeft:"1rem"}} src={image} alt="Phone image"/>
//             </div>

            
//             <div className="register-agent-right-element">
//                 <div className='register-agent-box'>
//                     <h1 className='register-agent-heading'>Register Agent </h1>
//                     {/* <div className="n-blur" style={{ background: "rgb(238 210 255)" }}></div> */}
//                     <form className ='register-agent-postdata' >
//                         <div className='register-agent-form-group'>
//                             <label htmlFor="FirstName" style ={{ marginRight:"62px"}} > FirstName:</label>
//                             <input type="text" className="register-agent-form-control" id="firstName"  value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
//                         </div>
//                         <div className='register-agent-form-group'>
//                             <label htmlFor="lastName" style ={{ marginRight:"63px"}} > LastName:</label>
//                             <input type="text" className="register-agent-form-control" id="lastName"  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
//                         </div>
//                         <div className='register-agent-form-group'>
//                             <label htmlFor="userName" style ={{ marginRight:'60px'}} > UserName:</label>
//                             <input type="text" className="register-agent-form-control" id="userName"  value={userName} onChange={(e) => setUserName(e.target.value)}/>
//                         </div>

                        
//                         <div className='register-agent-form-group'>
//                             <label htmlFor="password" style ={{ marginRight:"67px"}} > Password:</label>
//                             <input type="password" className="register-agent-form-control" id="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    
//                         </div>
//                         <div className='register-agent-form-group'>
//                             <label htmlFor="email" style ={{ marginRight:"98px"}} > Email:</label>
//                             <input type="email" className="register-agent-form-control" id="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
//                         </div>
//                         <div className='register-agent-form-group'>
//                             <label htmlFor="totalCommission" style ={{ marginRight:"10px"}} > TotalCommission:</label>
//                             <input type="text" className="register-agent-form-control" id="totalCommission"  value={totalCommission} onChange={(e) => setTotalCommission(e.target.value)}/>
//                         </div>
//                         <div className='register-agent-form-group'>
//                             <label htmlFor="mobileNumber" style ={{ marginRight:"25px"}} > MobileNumber:</label>
//                             <input type="mobileNumber" className="register-agent-form-control" id=""  value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}/>
//                         </div>
//                         <div className='register-agent-form-group'>
//                             <label htmlFor="dateOfBirth" style ={{ marginRight:"51px"}} > DateOfBirth:</label>
//                             <input type="date" className="register-agent-form-control" id="dateOfBirth"  value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
//                         </div>
//                         <div className='register-agent-button-group'>
//                             <button type="button" className="btn btn-primary register-agent-button" onClick={ AddAgents}>register-agent</button>
//                         </div>
                        
                                
//                     </form>
//                     </div>
//                 </div>
//             </div>
    
//     </>
//   )
// }

// export default RegisterAgent



import React, { useState } from 'react';
import { addAgent } from '../../../Service/AgentService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from "../../../Image/Register.svg";
import "./RegisterAgent.css";
import { useNavigate } from 'react-router-dom';


const RegisterAgent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const navigate = useNavigate();

  const showToast = (message, type) => {
    toast[type](message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  const isNameValid = (name) => {
    // Ensure the name does not contain digits or special characters
    return /^[a-zA-Z\s]+$/.test(name);
  };
  
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

  const isDateOfBirthValid = (dob) => {
    const currentDate = new Date();
    const selectedDate = new Date(dob);
    return selectedDate < currentDate;
  };

  const AddAgents = async () => {
    if (!firstName || !lastName || !userName || !password || !email ||  !mobileNumber || !dateOfBirth) {
      showToast('Please fill in all required fields.', 'error');
      return;
    } else if (!firstName) {
      showToast('Please fill Name.', 'error');
      return;
    }else if (!isNameValid(firstName)) {
        showToast('First Name can only contain letters and spaces.', 'error');
        return;
    } else if (!lastName) {
      showToast('Please fill Name.', 'error');
      return;
    } else if (!isNameValid(lastName)) {
        showToast('Last Name can only contain letters and spaces.', 'error');
        return;
    } else if (!userName) {
      showToast('Please fill User Name.', 'error');
      return;
    } else if (!password) {
      showToast('Please fill password (min 6 characters).', 'error');
      return;
    } else if (!isPasswordValid(password)) {
      showToast('Password must be at least 6 characters long.', 'error');
      return;
    } else if (!email) {
      showToast('Please fill email (valid format).', 'error');
      return;
    } else if (!isEmailValid(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    } else if (!mobileNumber) {
      showToast('Please enter a valid Mobile Number (10 digits).', 'error');
      return;
    } else if (!isMobileNumberValid(mobileNumber)) {
      showToast('Mobile Number must be 10 digits.', 'error');
      return;
    } else if (!dateOfBirth) {
      showToast('Please enter a valid Date Of Birth.', 'error');
      return;
    } else if (!isDateOfBirthValid(dateOfBirth)) {
      showToast('Date of Birth should not be future or current date.', 'error');
      return;
    }

    try {
      let resp =await addAgent(firstName, lastName, userName, password, email, mobileNumber, dateOfBirth);
      if(resp){
        showToast("Agent is added successfully", 'success');
        
        setFirstName('');
        setLastName('');
        setUserName('');
        setPassword('');
        setEmail('');
        setMobileNumber('');
        setDateOfBirth('');
        navigate(-1); 
      }
    } catch (error) {
      console.log(error);
      showToast(error.message, 'error');
    }
  };

  return (
    <>
      <div className='register-agent-container'>
        <div className="register-agent-left-element">
          <img style={{ height: "100vh", width: "80vh", paddingLeft: "1rem" }} src={image} alt="Phone image" />
        </div>

        <div className="register-agent-right-element">
          <div className='register-agent-box'>
            <h1 className='register-agent-heading'>Register Agent </h1>
            <form className='register-agent-postdata'>
              <div className='register-agent-form-group'>
                <label htmlFor="FirstName" style={{ marginRight: "62px" }}> FirstName:</label>
                <input type="text" className="register-agent-form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className='register-agent-form-group'>
                <label htmlFor="lastName" style={{ marginRight: "63px" }}> LastName:</label>
                <input type="text" className="register-agent-form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className='register-agent-form-group'>
                <label htmlFor="userName" style={{ marginRight: '60px' }}> UserName:</label>
                <input type="text" className="register-agent-form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className='register-agent-form-group'>
                <label htmlFor="password" style={{ marginRight: "67px" }}> Password:</label>
                <input type="password" className="register-agent-form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className='register-agent-form-group'>
                <label htmlFor="email" style={{ marginRight: "98px" }}> Email:</label>
                <input type="email" className="register-agent-form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
             
              <div className='register-agent-form-group'>
                <label htmlFor="mobileNumber" style={{ marginRight: "25px" }}> MobileNumber:</label>
                <input type="text" className="register-agent-form-control" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
              </div>
              <div className='register-agent-form-group'>
                <label htmlFor="dateOfBirth" style={{ marginRight: "51px" }}> DateOfBirth:</label>
                <input type="date" className="register-agent-form-control" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
              </div>
              <div className='register-agent-button-group'>
                <button type="button" className="btn btn-primary register-agent-button" onClick={AddAgents}>Register Agent</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterAgent;