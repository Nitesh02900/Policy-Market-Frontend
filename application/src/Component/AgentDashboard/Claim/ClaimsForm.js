import React, { useState } from 'react';
import './ClaimsForm.css'
import { addClaim } from '../../../Service/ClaimService';

const ClaimsForm = ({claimDetails}) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [claimSuccess, setClaimSuccess] = useState(false);
   
    
const handleClaimSuccess = () => {
    setClaimSuccess(true);
  };

const handleSubmit = async (e) => {

    e.preventDefault();
    const cardNumberPattern = /^\d{16}$/;
    const cvvPattern = /^\d{3}$/;
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/2[2-9]$/; // Valid until 2029

   

    if (!cardNumberPattern.test(cardNumber)) {
        alert('Card number must be 16 digits')
     
    }

    if (!cvvPattern.test(cvv)) {
        alert('CVV must be 3 digits')
    }

    if (!expiryDatePattern.test(expiryDate)) {
        alert('Expiry date must be in MM/YY format and valid until 2029')
     
    }

   


    try {
       
        let resp = await addClaim(claimDetails.index+1,claimDetails.amount,claimDetails.policyNumber,cardNumber,nameOnCard)
        if(resp)
        {
            handleClaimSuccess();
        }

    } catch (error) {
    
        alert('Payment failed:', error)
      console.error('Payment failed:', error);
     
    }
  };
  
  return (
    <>
        <div className='claim-form-box'>
        <form onSubmit={handleSubmit}>
          {claimSuccess ? (
            <div className="claim-success-message">
              Claim Successful! Thank you .
            </div>
          ) : (
            <>
                    <div className='claim-heading'>
                        <h1>Card Details</h1>
                    </div>
                    <div className="claim-form-group">
                        <label htmlFor="cardNumber" style={{ marginRight: '20px' }}>Card Number:</label>
                        <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        />
                    </div>
                    <div className="claim-form-group">
                        <label htmlFor="expiryDate" style={{ marginRight: '31px' }}>Expiry Date:</label>
                        <input
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        required
                        />
                    </div>
                    <div className="claim-form-group">
                        <label htmlFor="cvv" style={{ marginRight: '81px' }}>CVV:</label>
                        <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                        />
                    </div>
                    <div className="claim-form-group">
                        <label htmlFor="nameOnCard" style={{ marginRight: '14px' }}>Name on Card:</label>
                        <input
                        type="text"
                        id="nameOnCard"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        required
                        />
                    </div>
                    
                 
              
                    <div className="claim-form-group" style={{ background: 'rgb(34, 52, 100);', color: 'white' }}>
                        <button type="submit" className="btn btn-primary claim-button">
                        Pay Now
                        </button>
                    </div>
            </>
          )}
        </form>
        </div>
    
    </>
  )
}

export default ClaimsForm
