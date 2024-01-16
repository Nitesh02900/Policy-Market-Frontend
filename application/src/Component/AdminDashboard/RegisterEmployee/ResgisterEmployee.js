// import React, { useState } from 'react'
// import image from "../../../Image/Register.svg"
// import { addEmployee } from '../../../Service/EmployeeService'
// import "./RegisterEmployee.css"

// const ResgisterEmployee = () => {
//     const[firstName, setFirstName] = useState()
//     const[lastName, setLastName] = useState()
//     const[userName,setUserName] = useState()
//     const[password, setPassword] = useState()
//     const[email,setEmail] = useState()
//     const[salary,setSalary]=useState()
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
    
//     const AddEmployees = async() =>{

//         if (!firstName|| !lastName || !userName || !password ||  !email || !salary || !mobileNumber || !dateOfBirth) {
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
//         }else if (!salary) {
//             alert('Please enter a valid Salary .');
//             return;
//         }else if (!mobileNumber) {
//             alert('Please enter a valid Mobile Number (10 digits).');
//             return;
//         } else if (!isMobileNumberValid(mobileNumber)) {
//             alert('Mobile Number must be 10 digits.');
//             return;
//         }else if (!dateOfBirth) {
//             alert('Please enter a valid Date Of Birth .');
//             return;
//         }


//         try{
//             let response = await addEmployee(firstName, lastName,userName,password,email,salary,mobileNumber,dateOfBirth)
            // console.log(response)
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
//    <>
//           <div className='register-employee-container'>
//             <div class="register-employee-left-element">
//                 <img style ={{ height:"100vh", width:"80vh", paddingLeft:"1rem" }} src={image} alt="Phone image"/>
//             </div>

            
//             <div className="register-employee-right-element">
//                 <div className='register-employee-box'>
//                     <h1 className='register-employee-heading' >Register Employee </h1>
//                     {/* <div className="n-blur" style={{ background: "rgb(238 210 255)" }}></div> */}
//                     <form className ='register-employee-postdata' >
//                         <div className='register-employee-form-group'>
//                             <label htmlFor="FirstName" style ={{ marginRight:"49px"}} > First Name:</label>
//                             <input type="text" className="register-employee-form-control" id="firstName"  value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
//                         </div>
//                         <div className='register-employee-form-group'>
//                             <label htmlFor="lastName" style ={{ marginRight:"49px"}} > Last Name:</label>
//                             <input type="text" className="register-employee-form-control" id="lastName"  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
//                         </div>
//                         <div className='register-employee-form-group'>
//                             <label htmlFor="userName" style ={{ marginRight:'49px'}} > UserName:</label>
//                             <input type="text" className="register-employee-form-control" id="userName"  value={userName} onChange={(e) => setUserName(e.target.value)}/>
//                         </div>

                        
//                         <div className='register-employee-form-group'>
//                             <label htmlFor="password" style ={{ marginRight:"56px"}} > Password:</label>
//                             <input type="password" className="register-employee-form-control" id="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    
//                         </div>
//                         <div className='register-employee-form-group'>
//                             <label htmlFor="email" style ={{ marginRight:"87px"}} > Email:</label>
//                             <input type="email" className="register-employee-form-control" id="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
//                         </div>
//                         <div className='register-employee-form-group'>
//                             <label htmlFor="salary" style ={{ marginRight:"84px"}} > Salary:</label>
//                             <input type="text" className="register-employee-form-control" id="salary"  value={salary} onChange={(e) => setSalary(e.target.value)}/>
//                         </div>
//                         <div className='register-employee-form-group'>
//                             <label htmlFor="mobileNumber" style ={{ marginRight:"15px"}} > MobileNumber:</label>
//                             <input type="mobileNumber" className="register-employee-form-control" id=""  value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}/>
//                         </div>
//                         <div className='register-employee-form-group'>
//                             <label htmlFor="dateOfBirth" style ={{ marginRight:"40px"}} > DateOfBirth:</label>
//                             <input type="date" className="register-employee-form-control" id="dateOfBirth"  value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
//                         </div>
//                         <div className='register-employee-button-group'>
//                             <button type="button" className="btn btn-primary register-employee-button" onClick={ AddEmployees}>register-employee</button>
//                         </div>
                        
                                
//                     </form>
//                     </div>
//                 </div>
//             </div>
   
   
   
   
//    </>
//   )
// }

// export default ResgisterEmployee

import React, { useState } from 'react';
import image from '../../../Image/Register.svg';
import { addEmployee } from '../../../Service/EmployeeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterEmployee.css';
import { useNavigate } from 'react-router-dom';

const RegisterEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const navigate = useNavigate();


  const isNameValid = (name) => {
    const nameRegex = /^[^\d!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]+$/;
    return nameRegex.test(name);
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

  // const isNameValid = (name) => {
  //   const nameRegex = /^[^\d]+$/;
  //   return nameRegex.test(name);
  // };

  const isDateOfBirthValid = (dateOfBirth) => {
    const currentDate = new Date();
    const inputDate = new Date(dateOfBirth);
    return inputDate <= currentDate;
  };

  const AddEmployees = async () => {
    if (!firstName || !lastName || !userName || !password || !email || !salary || !mobileNumber || !dateOfBirth) {
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

    if (!userName) {
      toast.error('Please fill User Name.');
      return;
    }

    if (!password) {
      toast.error('Please fill Password (min 6 characters).');
      return;
    }

    if (!isPasswordValid(password)) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    if (!email) {
      toast.error('Please fill Email (valid format).');
      return;
    }

    if (!isEmailValid(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!salary) {
      toast.error('Please enter a valid Salary.');
      return;
    }

    if (!mobileNumber) {
      toast.error('Please enter a valid Mobile Number (10 digits).');
      return;
    }

    if (!isMobileNumberValid(mobileNumber)) {
      toast.error('Mobile Number must be 10 digits.');
      return;
    }

    if (!dateOfBirth) {
      toast.error('Please enter a valid Date Of Birth.');
      return;
    }

    const currentDate = new Date();
    const enteredDate = new Date(dateOfBirth);

    if (enteredDate > currentDate || (currentDate.getFullYear() - enteredDate.getFullYear()) < 18) {
      toast.error('Please enter a valid date of birth (must be at least 18 years old).');
      return;
    }

    try {
      let response = await addEmployee(firstName, lastName, userName, password, email, salary, mobileNumber, dateOfBirth);

      setFirstName('');
      setLastName('');
      setUserName('');
      setPassword('');
      setEmail('');
      setSalary('');
      setMobileNumber('');
      setDateOfBirth('');

      if (response) {
        toast.success('Employee added successfully');
        navigate('/adminDashboard'); 
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="register-employee-container">
        <div class="register-employee-left-element">
          <img style={{ height: '100vh', width: '80vh', paddingLeft: '1rem' }} src={image} alt="Phone" />
        </div>

        <div className="register-employee-right-element">
          <div className="register-employee-box">
            <h1 className="register-employee-heading">Register Employee</h1>
            <form className="register-employee-postdata">
              <div className="register-employee-form-group">
                <label htmlFor="FirstName" style={{ marginRight: '50px' }}>
                  {' '}
                  First Name:
                </label>
                <input
                  type="text"
                  className="register-employee-form-control"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="register-employee-form-group">
                <label htmlFor="lastName" style={{ marginRight: '52px' }}>
                  {' '}
                  Last Name:
                </label>
                <input
                  type="text"
                  className="register-employee-form-control"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="register-employee-form-group">
                <label htmlFor="userName" style={{ marginRight: '54px' }}>
                  {' '}
                  UserName:
                </label>
                <input
                  type="text"
                  className="register-employee-form-control"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="register-employee-form-group">
                <label htmlFor="password" style={{ marginRight: '58px' }}>
                  {' '}
                  Password:
                </label>
                <input
                  type="password"
                  className="register-employee-form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="register-employee-form-group">
                <label htmlFor="email" style={{ marginRight: '87px' }}>
                  {' '}
                  Email:
                </label>
                <input
                  type="email"
                  className="register-employee-form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="register-employee-form-group">
                <label htmlFor="salary" style={{ marginRight: '84px' }}>
                  {' '}
                  Salary:
                </label>
                <input
                  type="text"
                  className="register-employee-form-control"
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div className="register-employee-form-group">
                <label htmlFor="mobileNumber" style={{ marginRight: '28px' }}>
                  {' '}
                  MobileNumber:
                </label>
                <input
                  type="mobileNumber"
                  className="register-employee-form-control"
                  id=""
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
              <div className="register-employee-form-group">
                <label htmlFor="dateOfBirth" style={{ marginRight: '48px' }}>
                  {' '}
                  DateOfBirth:
                </label>
                <input
                  type="date"
                  className="register-employee-form-control"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="register-employee-button-group">
                <button type="button" className="btn btn-primary register-employee-button" onClick={AddEmployees}>
                  Register-Employee

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

export default RegisterEmployee;