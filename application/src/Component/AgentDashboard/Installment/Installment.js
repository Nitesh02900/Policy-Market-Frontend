import React from 'react'
import "./Installment.css"
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Table from '../Table/Installment/InstallmentTable'


const Installment = () => {
    const navigate = new useNavigate();
    const location = useLocation();
    const receivedData = location.state || {};

  return (
    <>
         <div className='installment-box'>
            <div className ="installment-tittle"style={{textAlign:"center", marginTop:"1.5rem", background:"rgb(34, 52, 100)"}}>
                <h1>Installments</h1>
            </div>
            <div style={{  margin: '1rem'}} className="installment-table-container">
                <Table numberOfYear={receivedData.numberOfYear} policyNumber={receivedData.policyNumber} installmentAmount = {receivedData.installmentAmount} premiumType={receivedData.premiumType} commission={receivedData.commission}/>
            </div>
            <button
               
                style={{
                width: '10rem',
                padding: '2px',
                backgroundColor: 'rgb(34, 52, 100)',
                marginLeft: '45%',
                color: 'white',
                }}
                disabled
            >
                Claim All Interest
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

export default Installment
