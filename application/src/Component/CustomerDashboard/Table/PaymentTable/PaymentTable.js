import React, { useState, useEffect} from 'react'
import PaymentModel from '../../Models/PaymentModel'
import { getAllPayment } from '../../../../Service/PaymentService'


const Table = ({policyNumber,numberOfYear, premiumType, installmentAmount}) => {
   
    const [numberOfInstallment, setNumberOfInstallment] = useState()
    const [date,setDates] =useState()
    const [disabledButtons, setDisabledButtons] = useState(Array(numberOfInstallment).fill(false));
   const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(null);

  const [paymentStatus, setPaymentStatus] = useState();
    
   
    const getNoOfInstallment = () => {
      const calculatedNumberOfInstallment = (numberOfYear * 12) / premiumType;
      setNumberOfInstallment(calculatedNumberOfInstallment);
    
      const startDate = new Date('2023-08-01');
      const installmentDates = Array.from({ length: calculatedNumberOfInstallment }, (_, index) => {
        const date = new Date(startDate);
        date.setMonth(startDate.getMonth() + index * premiumType);
        return date; // Store dates as date objects
      });
      setDates(installmentDates);
    };
    
    
    useEffect(() => {
      getNoOfInstallment();
    }, []);

    useEffect(() => {
      const fetchPaymentStatus = async () => {
        try {
          let response = await getAllPayment();
          console.log(response.data)
          setPaymentStatus(response.data); // Assuming data is an array of payment statuses
        } catch (error) {
          console.error('Error fetching payment statuses:', error);
        }
      };
    
      fetchPaymentStatus();
    }, [policyNumber]);

   
    const isPaymentDatePassed = (index) => {
      const currentDate = new Date();
      return currentDate > date[index];
    };

      const handlePayButtonClick = (index) => {
        setSelectedPaymentIndex(index);
        setPaymentModalOpen(true);
      };
    
      const handleClosePaymentModal = () => {
        setPaymentModalOpen(false);
        setSelectedPaymentIndex(null);
      };
   
    return (
    <>
        <table className="table table-striped " style={{"paddingLeft" :"1rem", "marginRight":"1rem"}}>
            <thead>
                <tr>
                    <th scope="col">Serial No.</th>
                    
                    <th scope="col">Installment Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Pay</th>

                </tr>
                
            </thead>
            
            <tbody>
              {Array.from({ length: numberOfInstallment }, (_, index) => {
                
                const installmentData = paymentStatus && paymentStatus.find((payment) => payment.installmentNo === index + 1 && payment.policyNo === policyNumber);
                const isPaid = installmentData && installmentData.status === 'paid';

                return (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{installmentAmount.toFixed(2)}</td>

                    <td>{date[index]?.toISOString().split('T')[0]}</td>
                    <td>
                      <button
                        style={{
                          width: '4rem',
                          backgroundColor: isPaid ? 'rgb(34, 52, 100)' : (isPaymentDatePassed(index) ? 'rgb(29 61 149)' : 'gray'),
    
                         border: 'none',
                          color: 'white',
                          height: '1.9rem',
                        }}
                        // disabled={disabledButtons[index] || !isPaymentDatePassed(index)}
                        // onClick={() => handlePayButtonClick(index)}
                        
                        disabled={isPaid || disabledButtons[index] || !isPaymentDatePassed(index)}
                        onClick={() => handlePayButtonClick(index)}
                      
                      >
                        {isPaid ? 'Paid' : 'Pay'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

        </table>
        


        {isPaymentModalOpen && (
        <PaymentModel
        isOpen={isPaymentModalOpen}
          onClose={handleClosePaymentModal}
          paymentDetails={{
            index: selectedPaymentIndex,
            date: date && date[selectedPaymentIndex],
            amount: installmentAmount,
            policyNumber:policyNumber
            // Add other payment details as needed
          }}
        />
      )}
    </>
  )
}

export default Table