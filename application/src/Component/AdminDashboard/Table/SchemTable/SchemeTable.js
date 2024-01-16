import React, { useState } from 'react'
import "./SchemeTable.css"
import Dropdown from 'react-bootstrap/Dropdown';



const Table = ({data,isUpdateButton, updateFunc, isDeleteButton,  updateStatusActive,updateStatusInActive}) => {
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
        
        if(isUpdateButton)
        {
            keys.push('Update')
        }
        if(isDeleteButton)
        {
            keys.push('Active')
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
              else if(k=="commission"){
                return <th scope="col">Agent Commission</th>;
            }
            else if(k=="active"){
              return <th scope="col">IsActive</th>;
          }
              else if(k=="Active"){
                return <th scope="col">Active</th>;
              }
              else if(k=="Update"){
                return <th scope="col">Update</th>;
            }


            
           
          });
       
        rowsOfUsers = data.content.map((value) => {
            const { active, ...otherFields } = value;
          
            return (
              <tr>
                {Object.values(otherFields).map((i) => (
                  <td>{i !== null ? i.toString() : 'N/A'}</td>
                ))}
                 <td>{value.active ? 'Active' : 'Inactive'}</td>
          
                {isUpdateButton && (
                  <td>
                    <button
                      onClick={() => {
                        updateFunc(value);
                      }}
                      style={{ border:"none",backgroundColor: 'rgb(34, 52, 100)', color: 'white', height:"2rem",borderRadius:"4px"}}
                    >
                      Update
                    </button>
                  </td>
                )}

                {isDeleteButton && (
                 <td>
                 <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic"  style={{ width:"5rem", backgroundColor: 'rgb(34, 52, 100)', color: 'white', height:"2rem",borderRadius:"3px", alignItems:'center'}}>
                    Active
                  </Dropdown.Toggle>

                  <Dropdown.Menu > 
                      <Dropdown.Item  onClick={()=>{updateStatusActive(value )}}>Active</Dropdown.Item>
                      <Dropdown.Item onClick={()=>{updateStatusInActive(value)}}>InActive</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
               
              </td>
                )}

                 
              </tr>
            );
          });
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

