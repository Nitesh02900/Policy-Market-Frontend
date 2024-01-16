import React, { useState } from 'react'
import "./PolicyTable.css"
import Dropdown from 'react-bootstrap/Dropdown';



const Table = ({data ,isViewDocumentButton,isVerifyButton, viewDocFunc, updateStatusVerified,updateStatusDeclined}) => {
   
    let rowsOfUsers =<></>
    let tableHeaderRow = <></>
    let keys =[]
    if(data && data.content && data.content.length !== 0)
    {
        keys =Object.keys(data.content[0])
        // console.log("Keys:",keys)
        
        if(isViewDocumentButton)
        {
      
            keys.push('View Document')
        }
        if(isVerifyButton)
        {
      
            keys.push('Verify')
        }
       
        tableHeaderRow = keys.map(k => {
            if(k=="policyNumber"){
                return <th scope="col">Policy Number</th>;
            } 
            
            else if(k=="customerName"){
                return <th scope="col">Customer Name</th>;
            }
            else if(k=="schemeName"){
                return <th scope="col">Scheme Name</th>;
            }
            else if(k=="planName"){
                return <th scope="col">Plan Name</th>;
            }
           
            else if(k=="premiumType"){
                return <th scope="col">Premium Type</th>;
            }
            else if(k=="numberOfYear"){
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
           
            else if(k=="maturityBenefit"){
                return <th scope="col">Maturity Benefit</th>;
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
           
          });
       
      
        rowsOfUsers = data.content.map((data, index) => (
            <tr key={index}>
              <td>{data.policyNumber}</td>
              <td>{data.customerName}</td>
              <td>{data.planName}</td>
              <td>{data.schemeName}</td>
              <td>{data.totalPremiumAmount}</td>
              <td>{data.installmentAmount}</td>
              {/* <td>{data.premiumType}</td> */}
              <td>
                {data.premiumType === 3 && "Quarterly"}
                {data.premiumType === 6 && "Half-Yearly"}
                {data.premiumType === 1 && "Monthly"}
                {data.premiumType === 12 && "Yearly"}
                {/* {data.premiumType !== 3 && data.premiumType !== 6 && data.premiumType !== 1 && "Yearly (12 months)"} */}
            </td>
              {/* <td>{data.status}</td> */}
              {isViewDocumentButton && ( 
                  <td>
                      <button  
                        onClick={(e)=>{  
                          e.preventDefault(); 
                          viewDocFunc(data)
                       }} 
                       style={{ backgroundColor: 'rgb(34, 52, 100)', color: 'white', height:"2rem",}}
                       >ViewDocument</button>
                  </td>
                )}
                {isVerifyButton && ( 
                  <td>
                     <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic"  style={{ width:"5rem", backgroundColor: 'rgb(34, 52, 100)', color: 'white', height:"2rem", borderRadius:"0"}}
                      >
                           Verify
                        </Dropdown.Toggle>

                        <Dropdown.Menu > 
                            <Dropdown.Item href="#/action-1" onClick={(e)=>{updateStatusVerified(data)}} >Verified</Dropdown.Item>
                            <Dropdown.Item href="#/action-2"onClick={(e)=>{updateStatusDeclined(data)}}>Declined</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                      
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

