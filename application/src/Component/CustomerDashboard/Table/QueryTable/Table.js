import React, { useState } from 'react'



const Table = ({data,isUpdateButton, updateFunc, isDeleteButton, deleteFunc }) => {
   const[isActive,setIsActive]= useState(true)
console.log(data)
   
    let rowsOfUsers =<></>
    let tableHeaderRow = <></>
    let keys =[]
    if(data && data.content && data.content.length !== 0)
    {
        keys =Object.keys(data.content[0])
        
        
        tableHeaderRow = keys.map(k => {
             if(k=="question"){
                  return <th scope="col">Question</th>;
            }
            else if (k == "id") {
              return <th scope="col">Id</th>;
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
                      style={{ backgroundColor: 'rgb(34, 52, 100)', color: 'white', height:"1.7rem",}}
                    >
                      Update
                    </button>
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

