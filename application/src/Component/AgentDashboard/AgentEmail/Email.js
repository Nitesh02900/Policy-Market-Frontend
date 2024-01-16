// import React, { useContext, useRef, useState } from "react";
// import emailjs from "emailjs-com";
// import './Email.css'
// import image from '../../../Image/email.svg'

// const Email = () => {

//   const form = useRef();
//   const [done, setDone] = useState(false)


//   const sendEmail = (e) => {
//         e.preventDefault();
//        emailjs
//       .sendForm("service_9plciv9","template_0bkeohb", form.current, "6VKNcJckGq6T5JsDH")
//       .then(
//         (result) => {
//           console.log(result.text);
//           setDone(true);
//           form.reset();
//         },
//         (error) => {
//           console.log(error.text);
//         }
//       );
//   };


// const sendEmail = (e) => {
//     e.preventDefault();
//     emailjs
//       .sendForm("service_9plciv9", "template_0bkeohb", form.current, "6VKNcJckGq6T5JsDH")
//       .then(
//         (result) => {
//           console.log(result.text);
//           setDone(true);
          // Clear the form fields using individual refs
//    

import React, { useContext, useRef, useState } from "react";
import emailjs from "emailjs-com";
import './Email.css'
import image from '../../../Image/email.svg'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Email = () => {

  const form = useRef();
  const [done, setDone] = useState(false)


//   const sendEmail = (e) => {
//         e.preventDefault();
//        emailjs
//       .sendForm("service_9plciv9","template_0bkeohb", form.current, "6VKNcJckGq6T5JsDH")
//       .then(
//         (result) => {
//           console.log(result.text);
//           setDone(true);
//           form.reset();
//         },
//         (error) => {
//           console.log(error.text);
//         }
//       );
//   };


const sendEmail = (e) => {
    e.preventDefault();

    const name = form.current.user_name.value.trim();
    const email = form.current.user_email.value.trim();
    const message = form.current.message.value.trim();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate Name (not digits or special characters)
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      toast.error("Name can only contain letters and spaces");
      return;
    }

    // Validate Email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }


    emailjs
      .sendForm("service_9plciv9", "template_0bkeohb", form.current, "6VKNcJckGq6T5JsDH")
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Thanks for Contacting me");
          setDone(true);
          // Clear the form fields using individual refs
          form.current.user_name.value = "";
          form.current.user_email.value = "";
          form.current.message.value = "";
          setTimeout(() => {
            setDone(false);
          }, 3000);
        },
        (error) => {
          console.log(error.text);
          toast.error("An error occurred while sending the email");
        }
      );
  };
  


  return (
    <>
        <div className="contact-form" id="contact">
            <div className="w-left">
                <div className="awesome">
                <img
                    style={{ height: '60vh', width: '60vh' }}
                    src={image}
                    alt="Phone image"
                />
                
                </div>
            </div>
        
            <div className="c-right">
                <div className="mail-tittle" style={{alignItems:"center"}}>

                    <h1>Email</h1>
                </div>
                <div className="mail-form"> 
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="form-group-mail">
                            {/* <label htmlFor="Name"> Name</label> */}
                            <input type="text" name="user_name" className="user"  placeholder="Name" />
                        
                        </div>
                        <div className="form-group-mail">
                            {/* <label htmlFor="Email"> Email</label> */}
                            <input type="email" name="user_email" className="user" placeholder="Email"/>
                        </div>
                        
                        <textarea name="message" className="user" placeholder="Message"/>
                        <input type="submit" value="Send" className="submit-button" style={{borderRadius:"6px" ,background:" rgb(34, 52, 100)"}}/>
                        <span>{done && "Thanks for Contacting me"}</span>
                    
                    </form>
                </div>
            </div>
        </div>
    

    
        <ToastContainer position='top-center' autoClose={3000}/>
    </>
  )
}

export default Email