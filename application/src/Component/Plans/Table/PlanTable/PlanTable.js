import React, { useState, useEffect } from 'react'
import "./PlanTable.css"


const Table = ({data,isUpdateButton, updateFunc, isDeleteButton, deleteFunc ,isSchemeButton,SchemeFunc, isCalculateButton,CalculateFunc}) => {
  
   const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    handleSearch();
  }, [data, searchTerm, currentPage]);

  const handleSearch = () => {
    if (data && data.content) {
      const filtered = data.content.filter((item) => {
        const values = Object.values(item).map((i) =>
          i !== null ? i.toString().toLowerCase() : ''
        );
        return values.some((val) => val.includes(searchTerm.toLowerCase()));
      });
  
      setCurrentPage(1);
  
      setFilteredData(filtered);
    }
  };
  

  const handleClear = () => {
    setFilteredData([]);
    setSearchTerm('');
    setCurrentPage(1); // Reset to the first page when clearing search
  };
   
    let rowsOfUsers =<></>
    let tableHeaderRow = <></>
    let keys =[]
 
    if(data && data.content && data.content.length !== 0)
    {
        keys =Object.keys(data.content[0])
      
        
        if(isSchemeButton)
        {
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
            if (k == "planId") {
              return <th scope="col">Plan Id</th>;
            }
            else if(k=="planName"){
                return <th scope="col">Plan Name</th>;
            }
            else if(k=="planDetails"){
              return <th scope="col">PlanDetails</th>;
          }
            else if(k=="Scheme"){
              return <th scope="col">Scheme</th>;
          }
          else if(k=="Active"){
                return <th scope="col">Active</th>;
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
          
               
                {isSchemeButton && ( 
                  <td>
                      <button   style={{ }}
                       className='scheme-button'
                        onClick={(e)=>{  
                          e.preventDefault(); 
                          SchemeFunc(value, isSchemeButton)
                       }}  >Scheme</button>
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

