import React, { useState, useEffect} from 'react'
import { getAllPayment } from '../../../../Service/PaymentService'
import ClaimModel from '../../Models/ClaimModel'
import { getAllClaim } from '../../../../Service/ClaimService'

const Table = ({policyNumber,numberOfYear, premiumType, installmentAmount,commission}) => {
   
    const [numberOfInstallment, setNumberOfInstallment] = useState()
    const [date,setDates] =useState()
    const [disabledButtons, setDisabledButtons] = useState(Array(numberOfInstallment).fill(false));
    const [interest, setInterest] = useState([]);
    const [isClaimModalOpen, setClaimModalOpen] = useState(false);
    const [selectedClaimIndex, setSelectedClaimIndex] = useState(null);
  
    const [paymentStatus, setPaymentStatus] = useState();
    const [claimStatus, setClaimStatus] = useState();

    
    const getNoOfInstallment = () =>{
        setNumberOfInstallment((numberOfYear*12)/premiumType)
   
    }
   
   
    useEffect(()=>{
        getNoOfInstallment ()
    },[]) 

    const calculateInterest = () => {
      
        const calculatedInterest = Array.from({ length: numberOfInstallment }, (_, index) => {
          const interestPercentage = commission / 100;
          const interestAmount = installmentAmount * interestPercentage;
          return interestAmount;
        });
        const startDate = new Date('2023-11-01');
        const installmentDates = Array.from({ length: numberOfInstallment }, (_, index) => {
        const date = new Date(startDate);
        date.setMonth(startDate.getMonth() + index * premiumType);
        return date.toISOString().split('T')[0]; // Extracting YYYY-MM-DD
        });
        setDates(installmentDates);
        setInterest(calculatedInterest);
      };

      useEffect(() => {
        calculateInterest();
      }, [commission, numberOfInstallment, installmentAmount]);
    
   

      useEffect(() => {
        const fetchPaymentStatus = async () => {
          try {
            let response = await getAllPayment();
            let resp = await getAllClaim();
            console.log(response.data)
            setPaymentStatus(response.data); 
            console.log(resp.data)
            setClaimStatus(resp.data)
            // Assuming data is an array of payment statuses
          } catch (error) {
            console.error('Error fetching payment statuses:', error);
          }
        };
      
        fetchPaymentStatus();
      }, [policyNumber]);

       const handleClaimButtonClick = (index) => {
          setSelectedClaimIndex(index);
          setClaimModalOpen(true);
      };

       const handleCloseclaimModal = () => {
        setClaimModalOpen(false);
        setSelectedClaimIndex(null);
      };
   
    return (
    <>
        <table className="table table-striped " style={{"paddingLeft" :"1rem", "marginRight":"1rem"}}>
            <thead>
                <tr>
                    <th scope="col">Serial No.</th>
                    
                    <th scope="col">Installment Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Intrest</th>
                    <th scope="col">Claims</th>

                </tr>
                
            </thead>
            <tbody>
                {Array.from({ length: numberOfInstallment }, (_, index) => {
                
                const installmentData = paymentStatus && paymentStatus.find((payment) => payment.installmentNo === index + 1 && payment.policyNo === policyNumber);
                const isPaid = installmentData && installmentData.status === 'paid';
                const claimedData = claimStatus && claimStatus.find((claim) => claim.installmentNo=== index + 1 && claim.policyNo === policyNumber);
                const isClaimed = claimedData && claimedData.status === 'Claimed';
          
                
                return(
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{installmentAmount.toFixed(2)}</td>
                    <td>{date[index]}</td>
                    
                    <td>{interest[index]}</td>

                    <td>
                      <button
                        style={{width :"4.5rem",
                              backgroundColor: isPaid?'rgb(34, 52, 100)': 'gray',
                              border: "none", 
                              color: 'white', 
                              height: '1.9rem' }}
                       
                              disabled={isPaid === undefined || isClaimed}
                       
                          onClick={() => handleClaimButtonClick(index)}
                      >
                      {console.log(isClaimed)}
                      {isClaimed ? 'Claimed' : 'Claim'}
                        
                     
                      </button>
                    </td>
                  </tr>
                );
              })}

                  
               
            </tbody>

        </table>
        {isClaimModalOpen && (
        <ClaimModel
          isOpen={isClaimModalOpen}
          onClose={handleCloseclaimModal }
          claimDetails={{
            index: selectedClaimIndex,
            date: date && date[selectedClaimIndex],
            amount: interest[selectedClaimIndex],
            policyNumber:policyNumber
            
          }}
        />
      )}
        
    </>
  )
}

export default Table