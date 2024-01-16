// import React from 'react'
// import AdminNavbar from "../AdminNavbar/AdminNavbar"
// import AdminPage from '../AdminPage/AdminPage'
// import Footer from '../../FrontPage/Footer/Footer'
// import { validateUser as validate } from '../../../Service/Authentication';
// import {useState,useEffect} from 'react'

// const Admin = () => {
//   const [isUserValid, setIsUserValid] = useState(false)
//   const validateUser = async() =>{
//     const authToken = localStorage.getItem('authentication')
//     if(!authToken)
//     {
//       setIsUserValid(false)
//       return;
//     }
   
//     try {
//       const resp = await validate(authToken);
//       if (resp.data.role[0].authority !== 'ROLE_ADMIN') {
//         setIsUserValid(false);
//       } else {
//         setIsUserValid(true);
//       }
//     } catch (error) {
//       console.error('Error validating user:', error);
//       setIsUserValid(false); 
//     }
//   };

//  useEffect(()=>{
//   validateUser()
// },[])

// if(isUserValid)
//   {
//   return (
//     <>
//     <div style={{backgroundColor:"none"}}>
//        <AdminNavbar/>
//        <AdminPage/>
//        <div style={{marginTop:"10rem"}}>
//         <Footer/>
//         </div>
//         </div>
//     </>
//   )
// }
// else{
//   return (
//     <>
//       <a href='/'>Please Login First</a> 
//    </>
//   )
// }
// }
// export default Admin
import React, { useState, useEffect } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminPage from '../AdminPage/AdminPage';
import Footer from '../../FrontPage/Footer/Footer';
import { validateUser as validate } from '../../../Service/Authentication';

const LoginMessage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <div
      style={{
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        transition: 'box-shadow 0.3s ease-in-out',
        ':hover': {
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Login Required</h2>
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        You need to log in to access this page. Click below to log in.
      </p>
      {/* You can add a login button or a link to the login page here */}
      <a href="/" style={{ fontSize: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#3498db', color: '#fff', textDecoration: 'none' }}>
        Login
      </a>
    </div>
  </div>
);

const Admin = () => {
  const [isUserValid, setIsUserValid] = useState(false);

  const validateUser = async () => {
    const authToken = localStorage.getItem('authentication');
    if (!authToken) {
      setIsUserValid(false);
      return;
    }

    try {
      const resp = await validate(authToken);
      if (resp.data.role[0].authority !== 'ROLE_ADMIN') {
        setIsUserValid(false);
      } else {
        setIsUserValid(true);
      }
    } catch (error) {
      console.error('Error validating user:', error);
      setIsUserValid(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await validateUser();
      } catch (error) {
        console.error('Error validating user:', error);
      }
    };

    fetchData();
  }, []);

  if (isUserValid) {
    return (
      <>
        <div style={{ backgroundColor: 'none' }}>
          <AdminNavbar />
          <AdminPage />
          <div style={{ marginTop: '10rem' }}>
            <Footer />
          </div>
        </div>
      </>
    );
  } else {
    return <LoginMessage />;
  }
};

export default Admin;
