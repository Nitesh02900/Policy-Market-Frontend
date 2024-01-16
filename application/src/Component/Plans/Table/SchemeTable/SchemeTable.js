import React, { useState } from 'react'
import './Table.css'

const SchemeTable = ({data, isUpdateButton, updateFunc, isDeleteButton, deleteFunc ,isSchemeButton,SchemeFunc, isCalculateButton,CalculateFunc}) => {
   const[isActive,setIsActive]= useState(true)

   const updateActiveStatus = (value, newStatus) => {
    console.log(`Updating active status of item ${value} to ${newStatus}`);

    setIsActive(newStatus === 'true'); // Convert string to boolean
  };
    let rowsOfUsers =<></>
    let tableHeaderRow = <></>
    let keys =[]
   
    if(data && data.content && data.content.length !== 0)
    {
        keys =Object.keys(data.content[0])
    
        
        if(isSchemeButton)
        {
            console.log("inside update-->" +isUpdateButton)
            keys.push('Scheme')
        }
        if(isDeleteButton)
        {
            keys.push('Active')
        }
        if(isCalculateButton)
        {
            keys.push('Calculate')
        }
        tableHeaderRow = keys.map(k => {
            if (k == "schemeId") {
              return <th scope="col">Scheme Id</th>;
            }
            else if(k=="schemeName"){
                return <th scope="col">Scheme Name</th>;
            }
            else if(k=="minAmount"){
                return <th scope="col">Min Amount</th>;
            }
            else if(k=="maxAmount"){
                return <th scope="col">Max Amount</th>;
            }
            else if(k=="minAge"){
                return <th scope="col">Min Age</th>;
            }
            else if(k=="maxAge"){
                return <th scope="col">Max Age</th>;
            }
            else if(k=="minTime"){
                return <th scope="col">Min Time</th>;
            }
            else if(k=="maxTime"){
                return <th scope="col">Max Time</th>;
            }
            else if(k=="profitRatio"){
                return <th scope="col">Profit Ratio</th>;
            }
            else if(k=='commission')
            {
              return <th scope="col">Agent Commission</th>;
            }
           
            else if(k=="Calculate"){
                return <th scope="col">Calculate</th>;
            }
          });
       
        rowsOfUsers = data.content.map((value) => {
            const { active, ...otherFields } = value;
          
            return (
              <tr>
                {Object.values(otherFields).map((i) => (
                  <td>{i !== null ? i.toString() : 'N/A'}</td>
                ))}
          
                {isUpdateButton && (
                  <td>
                    <button
                      onClick={() => {
                        updateFunc(value);
                      }}
                      style={{border: "none" }}
                    >
                      Update
                    </button>
                  </td>
                )}
                {isSchemeButton && ( 
                  <td>
                      <button   
                        onClick={(e)=>{  
                          e.preventDefault(); 
                          SchemeFunc(value, isSchemeButton)
                       }}  
                       style={{ backgroundColor: 'rgb(34, 52, 100)', color: 'white', height:"1.7rem",}}
                       
                       >Scheme</button>
                  </td>
                )}

                {isDeleteButton && (
                  <td>
                    <select 
                      onChange={(e) => updateActiveStatus(value, e.target.value)}
                      // style={{border: "1px" }}
                    >
                      <option onClick={()=>{deleteFunc(value ,"active")}}>Active</option>
                      <option  onClick={()=>{deleteFunc(value, "inactive")}}>Inactive</option>
                    </select>
                  </td>
                )}

                  {isCalculateButton && ( 
                  <td>
                      <button    
                      className='calculate-button'
                        onClick={(e)=>{  
                          e.preventDefault(); 
                          CalculateFunc(value)
                       }}  
                      
                       >Calculate</button>
                  </td>
                )}
              </tr>
            );
          });
    }

    return (
    <>
        <table className="table table-striped " style={{"paddingLeft" :"1rem", "marginRight":"1rem",}}>
            <thead>
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

export default SchemeTable

