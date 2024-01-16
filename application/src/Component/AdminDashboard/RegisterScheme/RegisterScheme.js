// import React, {useState} from 'react'
// import "./RegisterScheme.css"
// import image from "../../../Image/AddIdea.svg"
// import { addScheme } from '../../../Service/SchemeService'
// import { useNavigate } from 'react-router-dom';

// const RegisterScheme = ({planId}) => {
//     const[schemeName, setSchemeName] = useState()
//     const[minAmount, setMinAmount] = useState()
//     const[maxAmount, setMaxAmount] = useState()
//     const[minAge,setMinAge] = useState()
//     const[maxAge,setMaxAge] =useState()
//     const[minTime, setMinTime] = useState()
//     const[maxTime, setMaxTime] = useState()
//     const[profitRatio, setProfitRatio] = useState()
//     const [totalCommission, setTotalCommission] = useState('');
//     const navigate = useNavigate();


//     const registerNewScheme = async() =>{
//         console.log(planId)
//         try{
//              let response =await addScheme(planId, schemeName, minAmount, maxAmount, minAge,maxAge,minTime,maxTime,profitRatio,totalCommission)
//              if(response)
//              {
//                 alert("Scheme is Added")
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
//         <div className='register-scheme-container'>
//             <div class="register-scheme-left-element">
//                 <img style ={{ height:"115vh", width:"78vh", paddingLeft:"1rem"}} src={image} alt="Phone image"/>
//             </div>
//             <div className="register-scheme-right-element">
//                 <div className='register-scheme-box'>
//                     <h1 className='register-scheme-heading'>Register Scheme </h1>
//                      <form className ='register-scheme-postdata' >
//                         <div className='register-scheme-form-group'>
//                             <label htmlFor="SchemeName" style ={{ marginRight:"35px"}} > Scheme Name :</label>
//                             <input type="text" className="register-scheme-form-control" id="schemeName"  value={schemeName} onChange={(e) => setSchemeName(e.target.value)}/>
//                         </div>
//                         <div className='register-scheme-form-group'>
//                             <label htmlFor="minAmount" style ={{ marginRight:"51px"}} >MinAmount :</label>
//                             <input type="text" className="register-scheme-form-control" id="minAmount"  value={minAmount} onChange={(e) => setMinAmount(e.target.value)}/>
//                         </div>
//                         <div className='register-scheme-form-group'>
//                             <label htmlFor="maxAmount" style ={{ marginRight:"47px"}} >MaxAmount :</label>
//                             <input type="text" className="register-scheme-form-control" id="maxAmount"  value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)}/>
//                         </div>
//                         <div className='register-scheme-form-group'>
//                             <label htmlFor="minAge" style ={{ marginRight:"81px"}} >MinAge :</label>
//                             <input type="text" className="register-scheme-form-control" id="maxAge"  value={minAge} onChange={(e) => setMinAge(e.target.value)}/>
//                         </div>
//                         <div className='register-scheme-form-group'>
//                             <label htmlFor="maxAge" style ={{ marginRight:"79px"}} >MaxAge :</label>
//                             <input type="text" className="register-scheme-form-control" id="maxAmount"  value={maxAge} onChange={(e) => setMaxAge(e.target.value)}/>
//                         </div>
//                         <div className='register-scheme-form-group'>
//                             <label htmlFor="minTime" style ={{ marginRight:"75px"}} >MinTime :</label>
//                             <input type="text" className="register-scheme-form-control" id="minTime"  value={minTime} onChange={(e) => setMinTime(e.target.value)}/>
//                         </div>
//                         <div className='register-scheme-form-group'>
//                             <label htmlFor="maxTime" style ={{ marginRight:"73px"}} >MaxTime :</label>
//                             <input type="text" className="register-scheme-form-control" id="maxTime"  value={maxTime} onChange={(e) => setMaxTime(e.target.value)}/>
//                         </div>
//                         <div className='register-scheme-form-group'>
//                             <label htmlFor="profitRatio" style ={{ marginRight:"60px"}} >Profit Ratio:</label>
//                             <input type="text" className="register-scheme-form-control" id="profitRatio"  value={profitRatio} onChange={(e) => setProfitRatio(e.target.value)}/>
//                         </div>
//                         <div className='register-scheme-form-group'>
//                             <label htmlFor="totalCommission" style={{ marginRight: "10px" }}> AgentCommission:</label>
//                             <input type="text" className="register-agent-form-control" id="totalCommission" value={totalCommission} onChange={(e) => setTotalCommission(e.target.value)} />
//                         </div>
                       
//                         <div className='register-scheme-button-group' style={{marginTop:"1rem"}}>
//                             <button type="button" className="btn btn-primary register-scheme-button"  onClick={registerNewScheme}>Register</button>
//                         </div>
                        
                                
//                     </form>
//                 </div>
//             </div>
//         </div>
    
//     </>
//   )
// }

// export default RegisterScheme


import React, { useState } from 'react'
import "./RegisterScheme.css"
import image from "../../../Image/AddIdea.svg"
import { addScheme } from '../../../Service/SchemeService'
import { useNavigate } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegisterScheme = ({ planId }) => {
    const [schemeName, setSchemeName] = useState()
    const [minAmount, setMinAmount] = useState()
    const [maxAmount, setMaxAmount] = useState()
    const [minAge, setMinAge] = useState()
    const [maxAge, setMaxAge] = useState()
    const [minTime, setMinTime] = useState()
    const [maxTime, setMaxTime] = useState()
    const [profitRatio, setProfitRatio] = useState()
    const [totalCommission, setTotalCommission] = useState('');
    const navigate = useNavigate();


    const registerNewScheme = async () => {
        console.log(planId)
        try {
            
            if (!schemeName || !minAmount || !maxAmount || !minAge || !maxAge || !minTime || !maxTime || !profitRatio || !totalCommission) {
                toast.error('All fields are required.', { position: toast.POSITION.TOP_CENTER });
                return;
            }
            
            if (/\d/.test(schemeName)) {
                toast.error('Scheme Name can only contain letters and spaces.', { position: toast.POSITION.TOP_CENTER });
                return;
            }

           
            const minAmountValue = parseInt(minAmount, 10);
            if (isNaN(minAmountValue) || minAmountValue < 20000) {
                toast.error('Min Amount must be a numeric value greater than or equal to 20000.', { position: toast.POSITION.TOP_CENTER });
                return;
            }

            
            const maxAmountValue = parseInt(maxAmount, 10);
            if (isNaN(maxAmountValue) || maxAmountValue <= minAmountValue) {
                toast.error('Max Amount must be a numeric value greater than Min Amount.', { position: toast.POSITION.TOP_CENTER });
                return;
            }

            
            const minAgeValue = parseInt(minAge, 10);
            if (!/^\d{2}$/.test(minAge) || isNaN(minAgeValue) || minAgeValue < 18) {
                toast.error('Min Age must be a 2-digit numeric value and not less than 18.', { position: toast.POSITION.TOP_CENTER });
                return;
            }

            
            if (!/^\d{2}$/.test(maxAge) || parseInt(maxAge, 10) <= minAgeValue) {
                toast.error('Max Age must be a 2-digit numeric value greater than Min Age.', { position: toast.POSITION.TOP_CENTER });
                return;
            }

            
            const minTimeValue = parseInt(minTime, 10);
            if (isNaN(minTimeValue) || minTimeValue < 0 || !/^\d+$/.test(minTime)) {
                toast.error('Min Time must be a non-negative numeric value containing only digits.', { position: toast.POSITION.TOP_CENTER });
                return;
            }

            
            const maxTimeValue = parseInt(maxTime, 10);
            if (isNaN(maxTimeValue) || maxTimeValue <= minTimeValue || maxTimeValue < 0 || !/^\d+$/.test(maxTime)) {
                toast.error('Max Time must be a non-negative numeric value greater than Min Time and containing only digits.', { position: toast.POSITION.TOP_CENTER });
                return;
            }

            
            const profitRatioValue = parseFloat(profitRatio);
            if (isNaN(profitRatioValue) || profitRatioValue < 0) {
                toast.error('Profit Ratio must be a non-negative numeric value.', { position: toast.POSITION.TOP_CENTER });
                return;
            }

            
            const totalCommissionValue = parseFloat(totalCommission);
            if (isNaN(totalCommissionValue) || totalCommissionValue < 0) {
                toast.error('Total Commission must be a non-negative numeric value.', { position: toast.POSITION.TOP_CENTER });
                return;
            }

            let response = await addScheme(planId, schemeName, minAmount, maxAmount, minAge, maxAge, minTime, maxTime, profitRatio, totalCommission)
            if (response) {
                toast.success('Scheme is added', { position: toast.POSITION.TOP_CENTER });
                navigate('/plandetails');
            }
        }
        catch (error) {
            console.log(error)
            toast.error('Error adding scheme. Please try again.', { position: toast.POSITION.TOP_CENTER });
        }
    }

    return (
        <>
            <div className='register-scheme-container'>
                <div class="register-scheme-left-element">
                    <img style={{ height: "115vh", width: "78vh", paddingLeft: "1rem" }} src={image} alt="Phone image" />
                </div>
                <div className="register-scheme-right-element">
                    <div className='register-scheme-box'>
                        <h1 className='register-scheme-heading'>Register Scheme </h1>
                        <form className='register-scheme-postdata' >
                            <div className='register-scheme-form-group'>
                                <label htmlFor="SchemeName" style={{ marginRight: "35px" }} > Scheme Name :</label>
                                <input type="text" className="register-scheme-form-control" id="schemeName" value={schemeName} onChange={(e) => setSchemeName(e.target.value)} />
                            </div>
                            <div className='register-scheme-form-group'>
                                <label htmlFor="minAmount" style={{ marginRight: "51px" }} >MinAmount :</label>
                                <input type="text" className="register-scheme-form-control" id="minAmount" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} />
                            </div>
                            <div className='register-scheme-form-group'>
                                <label htmlFor="maxAmount" style={{ marginRight: "47px" }} >MaxAmount :</label>
                                <input type="text" className="register-scheme-form-control" id="maxAmount" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} />
                            </div>
                            <div className='register-scheme-form-group'>
                                <label htmlFor="minAge" style={{ marginRight: "81px" }} >MinAge :</label>
                                <input type="text" className="register-scheme-form-control" id="maxAge" value={minAge} onChange={(e) => setMinAge(e.target.value)} />
                            </div>
                            <div className='register-scheme-form-group'>
                                <label htmlFor="maxAge" style={{ marginRight: "79px" }} >MaxAge :</label>
                                <input type="text" className="register-scheme-form-control" id="maxAmount" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} />
                            </div>
                            <div className='register-scheme-form-group'>
                                <label htmlFor="minTime" style={{ marginRight: "75px" }} >MinTime :</label>
                                <input type="text" className="register-scheme-form-control" id="minTime" value={minTime} onChange={(e) => setMinTime(e.target.value)} />
                            </div>
                            <div className='register-scheme-form-group'>
                                <label htmlFor="maxTime" style={{ marginRight: "73px" }} >MaxTime :</label>
                                <input type="text" className="register-scheme-form-control" id="maxTime" value={maxTime} onChange={(e) => setMaxTime(e.target.value)} />
                            </div>
                            <div className='register-scheme-form-group'>
                                <label htmlFor="profitRatio" style={{ marginRight: "60px" }} >Profit Ratio:</label>
                                <input type="text" className="register-scheme-form-control" id="profitRatio" value={profitRatio} onChange={(e) => setProfitRatio(e.target.value)} />
                            </div>
                            <div className='register-scheme-form-group'>
                                <label htmlFor="totalCommission" style={{ marginRight: "10px" }}> AgentCommission:</label>
                                <input type="text" className="register-agent-form-control" id="totalCommission" value={totalCommission} onChange={(e) => setTotalCommission(e.target.value)} />
                            </div>

                            <div className='register-scheme-button-group' style={{ marginTop: "1rem" }}>
                                <button type="button" className="btn btn-primary register-scheme-button" onClick={registerNewScheme}>Register</button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default RegisterScheme