import React, { useState } from 'react'
import "./PolicyTable.css"
import Dropdown from 'react-bootstrap/Dropdown';



const Table = ({data ,isinstallmentButton, installmentFunc }) => {
   
    let rowsOfUsers =<></>
    let tableHeaderRow = <></>
    let keys =[]
    if(data && data.content && data.content.length !== 0)
    {
        keys =Object.keys(data.content[0])
        // console.log("Keys:",keys)
        if(isinstallmentButton)
        {
      
            keys.push('Installemnt')
        }
        
       
        tableHeaderRow = keys.map(k => {
            if(k=="policyNumber"){
                return <th scope="col">Policy Number</th>;
            } 
            else if(k=="customerName"){
                return <th scope="col">Customer Name</th>;
            }
            else if(k=="premiumType"){
                return <th scope="col">Premium Type</th>;
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
           
            else if(k=="View Document"){
                return <th scope="col">View Document</th>;
            }
            else if(k=="fileDB"){
                return <th scope="col">FileDb</th>;
            }
           
            else if(k=="active"){
                return null;
            }
            else if(k=="Installemnt"){
                return <th scope="col">Installment</th>;
            }
          });
     

        rowsOfUsers = data.content.map((data, index) => (
            <tr key={index}>
              <td>{data.policyNumber}</td>
              <td>{data.customerName}</td>
              <td>{data.planName}</td>
              <td>{data.schemeName}</td>
              <td>{data.totalPremiumAmount}</td>
              <td>{data.installmentAmount.toFixed(2)}</td>

              <td>
                {data.premiumType === 3 && "Quarterly"}
                {data.premiumType === 6 && "Half-Yearly"}
                {data.premiumType === 1 && "Monthly"}
                {data.premiumType === 12 && "Yearly"}
               
            </td>
              
            

              {isinstallmentButton && (
                <td>
                  <button
                    className='installment-button'
                    onClick={() => {
                      installmentFunc(data)
                    }}
                    style={{border:"none", color: 'white', height: '2.2rem' }}
                  >
                    Installment
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

