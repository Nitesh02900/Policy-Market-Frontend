import React, { useState } from 'react'
import "./SchemeTable.css"


const Table = ({data,isUpdateButton, updateFunc, isDeleteButton, deleteFunc }) => {
   const[isActive,setIsActive]= useState(true)

   
    let rowsOfUsers =<></>
    let tableHeaderRow = <></>
    let keys =[]
    if(data && data.content && data.content.length !== 0)
    {
        keys =Object.keys(data.content[0])
        
        
        
       
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
              else if(k=="Active"){
                return <th scope="col">Active</th>;
              }
              else if(k=="Update"){
                return <th scope="col">Update</th>;
            }

            
            else if(k=="active"){
                return null;
            }
          });
       
        rowsOfUsers = data.content.map((value) => {
            const { active, ...otherFields } = value;
          
            return (
              <tr>
                {Object.values(otherFields).map((i) => (
                  <td>{i !== null ? i.toString() : 'N/A'}</td>
                ))}
          
                 
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

