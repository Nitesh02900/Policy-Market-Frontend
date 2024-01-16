import React, { useState } from 'react'



const Table = ({data,isPaymentButton, paymentFunc}) => {
   const[isActive,setIsActive]= useState(true)

   
    let rowsOfUsers =<></>
    let tableHeaderRow = <></>
    let keys =[]
    if(data && data.content && data.content.length !== 0)
    {
        keys =Object.keys(data.content[0])
        
        if(isPaymentButton)
        {
      
            keys.push('Payment')
        }
        
        tableHeaderRow = keys.map(k => {
            if(k=="policyNumber"){
                return <th scope="col">Policy Number</th>;
            } 
            else if(k=="issueDate"){
                return <th scope="col">Issue Data</th>;
            }
            else if(k=="maturityDate"){
                return <th scope="col">Maturity Data</th>;
            }
            else if(k=="premiumType"){
                return <th scope="col">Premium Type</th>;
            }
            else if(k=="noOfYear"){
                return <th scope="col">Number Of Year</th>;
            }
            else if(k=="profitRatio"){
                return <th scope="col">Profit Ratio</th>;
            }
            else if(k=="totalPremiumAmount"){
                return <th scope="col">Total Premium Amount</th>;
            }
            else if(k=="installmentAmount"){
                return <th scope="col">Installment Amount</th>;
            }
            else if(k=="schemeName"){
                return <th scope="col">Scheme Name</th>;
            }
            else if(k=="planName"){
                return <th scope="col">Plan Name</th>;
            }
            
            
            
            else if(k=="intrestAmount"){
                return <th scope="col">Intrest Amount</th>;
            }
           
            else if(k=="maturityBenefit"){
                return <th scope="col">Maturity Benefit</th>;
            }
            else if(k=="View Document"){
                return <th scope="col">View Document</th>;
            }
            else if(k=="status"){
                return null;
            }
            else if(k=="Payment"){
                return <th scope="col">Payment</th>;
            }
          
              
      
          });
       
      

        rowsOfUsers = data.content.map((data, index) => (
            <tr key={index}>
              <td>{data.policyNumber}</td>
              <td>{data.planName}</td>
              <td>{data.schemeName}</td>
              <td>{data.noOfYear}</td>
              <td>{data.totalPremiumAmount}</td>
              <td>{data.installmentAmount.toFixed(2)}</td>

              <td>
                {data.premiumType === 3 && "Quarterly"}
                {data.premiumType === 6 && "Half-Yearly"}
                {data.premiumType === 1 && "Monthly"}
                {data.premiumType === 12 && "Yearly"}
                {/* {data.premiumType !== 3 && data.premiumType !== 6 && data.premiumType !== 1 && "Yearly (12 months)"} */}
            </td>
              
              {/* <td>{data.status}</td> */}
              {isPaymentButton && (
                <td>
                  <button
                     disabled={!data.status || !data.active}
                    onClick={() => {
                      paymentFunc(data)
                    }}
                    style={{  backgroundColor: (!data.status || !data.active) ? 'rgb(34, 52, 100)' : 'rgb(29 61 149)',border:"none", color: 'white', height: '1.9rem' , borderRadius:"4px"}}
                  >
                    Payment
                  </button>
                </td>
              )}
            </tr>
          ));
    }

    return (
    <>
        <table className="table table-striped custome-table">
            <thead className="table-header">
                <tr>
                {tableHeaderRow}
                </tr>
                
            </thead>
            <tbody>
                {rowsOfUsers}
                
            </tbody>

        </table>
        
    </>
  )
}

export default Table

