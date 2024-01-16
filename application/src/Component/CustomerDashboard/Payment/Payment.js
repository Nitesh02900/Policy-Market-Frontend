import React, {useState,useEffect}  from 'react'
import { useNavigate } from 'react-router-dom';
import Table from '../Table/PaymentTable/PaymentTable';
import { useLocation } from 'react-router-dom';
import './Payment.css'

const Payment = () => {
    const navigate = new useNavigate();
    const location = useLocation();
    const receivedData = location.state || {};


  return (
   <>
         <div className='payment-box'>
            <div className ="payment-tittle"style={{textAlign:"center", marginTop:"1.5rem", background:"rgb(34, 52, 100)"}}>
                <h1>Installments</h1>
            </div>
            <div style={{  margin: '1rem'}} className="payment-table-container">
                <Table numberOfYear={receivedData.numberOfYear} policyNumber={receivedData.policyNumber} installmentAmount = {receivedData.installmentAmount} premiumType={receivedData.premiumType}/>
            </div>
            <button
               
                style={{
                width: '5rem',
                padding: '2px',
                backgroundColor: 'rgb(34, 52, 100)',
                marginLeft: '45%',
                color: 'white',
                }}
                disabled
            >
                Claim
            </button>
           
            <button
                onClick={() => navigate(-1)}
                style={{
                width: '5rem',
                padding: '2px',
                backgroundColor: 'rgb(34, 52, 100)',
                marginLeft: '91%',
                color: 'white',
                }}
            >
                Go Back
            </button>
        </div>
               
        
        
   
   
   
   </>
  )
}

export default Payment
