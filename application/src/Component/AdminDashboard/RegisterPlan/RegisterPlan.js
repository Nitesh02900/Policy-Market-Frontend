// import React, {useState} from 'react'
// import image from "../../../Image/AddIdea.svg"
// import "./RegisterPlan.css"
// import { addPlan } from '../../../Service/PlanService'
// import { useNavigate } from 'react-router-dom'; 

// const RegisterPlan = () => {
//     const[planName, setPlanName] = useState()
//     const[planDetails, setPlanDetails] = useState()
//     const navigate = useNavigate();
//     const registerNewPlan = async() =>{
//         try{
//              let response =await addPlan(planName,planDetails)
            
//              if(response)
//              {
//                 alert("Plan is Added")
//                 navigate(-1); 
//              }
//         }
//         catch(error)
//         {
//             console.log(error)
//             alert(error.message)
//         }
//     }
   
//   return (
//     <>
//          <div className='register-plan-container'>
//             <div class="register-plan-left-element">
//                 <img style ={{ height:"82vh", width:"55vh", paddingLeft:"1rem"}} src={image} alt="Phone image"/>
//             </div>

            
//             <div className="register-plan-right-element">
//                 <div className='register-plan-box'>
//                     <h1 className='register-plan-heading'>Register Plan </h1>
//                     {/* <div className="n-blur" style={{ background: "rgb(238 210 255)" }}></div> */}
//                     <form className ='register-plan-postdata' >
//                         <div className='register-plan-form-group'>
//                             <label htmlFor="PlanName" style ={{ marginRight:"10px"}} > Plan Name:</label>
//                             <input type="text" className="register-plan-form-control-1" id="planName"  value={planName} onChange={(e) => setPlanName(e.target.value)}/>
//                         </div>
//                         <div className='register-plan-form-group'>
//                             <label htmlFor="planDetails" style ={{ marginRight:"13px"}} >Plan Details:</label>
//                             <input type="text" className="register-plan-form-control-2" id="planDetails"  value={planDetails} onChange={(e) => setPlanDetails(e.target.value)}/>
//                         </div>
                       
//                         <div className='register-plan-button-group' style={{marginTop:"1rem"}}>
//                             <button type="button" className="btn btn-primary register-plan-button" onClick={registerNewPlan}>Register</button>
//                         </div>
                        
                                
//                     </form>
//                     </div>
//                 </div>
//             </div>
   
   
    
    
//     </>
//   )
// }

// export default RegisterPlan

import React, { useState } from 'react';
import image from '../../../Image/AddIdea.svg';
import './RegisterPlan.css';
import { addPlan, getAllPlans } from '../../../Service/PlanService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPlan = () => {
  const [planName, setPlanName] = useState('');
  const [planDetails, setPlanDetails] = useState('');
  const navigate = useNavigate();

  const registerNewPlan = async () => {
    try {
      
      if (!planName || !planDetails) {
        toast.error('Please fill the required details.', {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
  
     
      if (/\d/.test(planName)) {
        toast.error('Plan Name can not contain digits.', {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
  
      const response = await getAllPlans();
      const existingPlans = response.data.content.map((plan) => plan.planName.toLowerCase());
  
      const lowercasePlanName = planName.toLowerCase();
  
      if (existingPlans.includes(lowercasePlanName)) {
        console.log('Duplicate Plan Name:', lowercasePlanName);
        toast.error('Plan is already Exists, Please enter a Different Plan', {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
  
      const addResponse = await addPlan(planName, planDetails);
  
      if (addResponse) {
        toast.success('Plan is added', {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/plandetails');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error adding plan. Please try again.');
    }
  };
  

  return (
    <>
      <div className="register-plan-container">
        <div className="register-plan-left-element">
          <img style={{ height: '82vh', width: '55vh', paddingLeft: '1rem' }} src={image} alt="Phone image" />
        </div>

        <div className="register-plan-right-element">
          <div className="register-plan-box">
            <h1 className="register-plan-heading">Register Plan </h1>
            <form className="register-plan-postdata">
              <div className="register-plan-form-group">
                <label htmlFor="PlanName" style={{ marginRight: '10px' }}>
                  {' '}
                  Plan Name:
                </label>
                <input type="text" className="register-plan-form-control-1" id="planName" value={planName} onChange={(e) => setPlanName(e.target.value)} />
              </div>
              <div className="register-plan-form-group">
                <label htmlFor="planDetails" style={{ marginRight: '13px' }}>
                  Plan Details:
                </label>
                <input type="text" className="register-plan-form-control-2" id="planDetails" value={planDetails} onChange={(e) => setPlanDetails(e.target.value)}  />
              </div>

              <div className="register-plan-button-group" style={{ marginTop: '1rem' }}>
                <button type="button" className="btn btn-primary register-plan-button" onClick={registerNewPlan} style={{background: "rgb(34, 52, 100)"}} >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default RegisterPlan;