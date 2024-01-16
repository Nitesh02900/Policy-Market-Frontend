import React, { useState } from 'react';
import './PaymentForm.css'
import { addPayment } from '../../../Service/PaymentService';
import { toast, ToastContainer } from 'react-toastify';

const PaymentForm = ({  paymentDetails }) => {
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [nameOnCard, setNameOnCard] = useState('');
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
 

// const handlePaymentSuccess = () => {
//     setPaymentSuccess(true);
//   };
// const handleSubmit = async (e) => {
//     // console.log("sublit")
//     e.preventDefault();
//     const cardNumberPattern = /^\d{16}$/;
//     const cvvPattern = /^\d{3}$/;
//     const expiryDatePattern = /^(0[1-9]|1[0-2])\/2[2-9]$/; // Valid until 2029

   

//     if (!cardNumberPattern.test(cardNumber)) {
//         alert('Card number must be 16 digits')
     
//     }

//     if (!cvvPattern.test(cvv)) {
//         alert('CVV must be 3 digits')
//     }

//     if (!expiryDatePattern.test(expiryDate)) {
//         alert('Expiry date must be in MM/YY format and valid until 2029')
     
//     }

   


//     try {
//         console.log(paymentDetails.index+1)
//         let resp = await addPayment(paymentDetails.index+1,paymentDetails.amount,paymentDetails.policyNumber,cardNumber,nameOnCard)
//         if(resp)
//         {
//             handlePaymentSuccess();
//         }

//     } catch (error) {
//         alert('Payment failed:', error)
//       console.error('Payment failed:', error);
     
//     }
//   };

const [cardNumber, setCardNumber] = useState('');
const [expiryDate, setExpiryDate] = useState('');
const [cvv, setCvv] = useState('');
const [nameOnCard, setNameOnCard] = useState('');
const [paymentSuccess, setPaymentSuccess] = useState(false);


const handlePaymentSuccess = () => {
  setPaymentSuccess(true);
};
const handleSubmit = async (e) => {
  // console.log("sublit")
  e.preventDefault();
  const cardNumberPattern = /^\d{16}$/;
  const cvvPattern = /^\d{3}$/;
  const expiryDatePattern = /^(0[1-9]|1[0-2])\/2[2-9]$/; // Valid until 2029

  if (!cardNumber || !cvv || !expiryDate || !nameOnCard) {
    toast.error('All fields are required');
    return;
  }
  if (!cardNumberPattern.test(cardNumber)) {
    toast.error('Card number must be 16 digits');
    return;
   
  }

  if (!cvvPattern.test(cvv)) {
    toast.error('CVV must be 3 digits');
    return;
  }

  if (!expiryDatePattern.test(expiryDate)) {
    toast.error('Expiry date must be in MM/YY format and valid until 2029');
    return;
   
  }

 


  try {
      console.log(paymentDetails.index+1)
      let resp = await addPayment(paymentDetails.index+1,paymentDetails.amount,paymentDetails.policyNumber,cardNumber,nameOnCard)
      if(resp)
      {
          handlePaymentSuccess();
          toast.success('Payment Successful! Thank you.');
      }

  } catch (error) {
    toast.error('Payment failed:', error.message);
    console.error('Payment failed:', error);
   
  }
};
  return (
    <>  
        <div className='payment-form-box'>
        <form onSubmit={handleSubmit}>
          {paymentSuccess ? (
            <div className="payment-success-message">
              Payment Successful! Thank you .
            </div>
          ) : (
            <>
             <div className='payment-heading'>
                        <h1>Card Details</h1>
                    </div>
                    <div className="payment-form-group">
                        <label htmlFor="cardNumber" style={{ marginRight: '20px' }}>Card Number:</label>
                        <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        />
                    </div>
                    <div className="payment-form-group">
                        <label htmlFor="expiryDate" style={{ marginRight: '32px' }}>Expiry Date:</label>
                        <input
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        required
                        />
                    </div>
                    <div className="payment-form-group">
                        <label htmlFor="cvv" style={{ marginRight: '80px' }}>CVV:</label>
                        <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                        />
                    </div>
                    <div className="payment-form-group">
                        <label htmlFor="nameOnCard" style={{ marginRight: '14px' }}>Name on Card:</label>
                        <input
                        type="text"
                        id="nameOnCard"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        required
                        />
                    </div>
                    
                 
              
              <div className="payment-form-group" style={{ background: 'rgb(34, 52, 100);', color: 'white' }}>
                <button type="submit" className="btn btn-primary payment-button">
                  Pay Now
                </button>
              </div>
            </>
          )}
        </form>
        </div>
        <ToastContainer position="top-center" />
        </>
  );
};

export default PaymentForm;
