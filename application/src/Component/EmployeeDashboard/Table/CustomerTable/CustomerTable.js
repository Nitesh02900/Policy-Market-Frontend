import React, { useState } from 'react'


const Table = ({data,isUpdateButton, updateFunc, isDeleteButton, updateStatusActive,updateStatusInActive}) => {
   const[isActive,setIsActive]= useState(true);

   const updateActiveStatus = (value, newStatus) => {
    setIsActive(newStatus === 'true'); // Convert string to boolean
  }
  
    let rowsOfUsers =<></>
    let tableHeaderRow = <></>
    let keys =[]
    console.log(data)
    if(data && data.content && data.content.length !== 0)
    {
        keys =Object.keys(data.content[0])
        console.log("Keys:",keys)
        
        
        if(isDeleteButton)
        {
            keys.push('Active')
        }
       
        tableHeaderRow = keys.map(k => {
            if (k == "firstname") {
                return <th scope="col">FirstName</th>;
              }
              else if(k=="lastname"){
                  return <th scope="col">Last Name</th>;
              }
              else if(k=="username"){
                  return <th scope="col">User Name</th>;
              }
              else if(k=="emailId"){
                  return <th scope="col">Email Id</th>;
              }
              else if(k=="mobileNumber"){
                return <th scope="col">Mobile Number</th>;
            }
            else if(k=="dateOfBirth"){
                return <th scope="col">Date Of Birth</th>;
            } 
            else if(k=="Active"){
                return <th scope="col">Active</th>;
            }
            else if(k=="active"){
                  return null;
              }
          });
        
       
        rowsOfUsers = data.content.map((value) => {
          const { active, dateOfBirth, ...otherFields } = value;
          
            return (
            
              <tr>
                  {Object.values(otherFields).map((i) => (
                    <td>{i !== null ? i.toString() : 'N/A'}</td>
                  ))}
                  <td>{dateOfBirth ? dateOfBirth.split('T')[0] : 'N/A'}</td>
          
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
                  

                  

                </tr>
              
            );
          });
    }

   
    return (
    <>
        <table className="table table-striped " style={{"paddingLeft" :"1rem", "marginRight":"1rem"}}>
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

export default Table