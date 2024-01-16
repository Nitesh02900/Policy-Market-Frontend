import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';



const Table = ({data,isUpdateButton, updateFunc, isDeleteButton, updateStatusActive,updateStatusInActive}) => {
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
              return <th scope="col">IsActive</th>;
          
              }
          });
        
       
        // rowsOfUsers = data.content.map((value) => {
        //   const { active, dateOfBirth, ...otherFields } = value;
        rowsOfUsers = (filteredData.length > 0 ? filteredData : data.content).map((value) => {
          const { active, dateOfBirth, ...otherFields } = value;
          
            return (
            
              <tr>
                  {Object.values(otherFields).map((i) => (
                    <td>{i !== null ? i.toString() : 'N/A'}</td>
                  ))}
                  <td>{dateOfBirth ? dateOfBirth.split('T')[0] : 'N/A'}</td>
                  <td>{value.active ? 'Active' : 'Inactive'}</td>
          
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
                  

                  {isDeleteButton && (
                    <td>
                       <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic"  style={{ width:"5rem", backgroundColor: 'rgb(34, 52, 100)', color: 'white', height:"2rem", borderRadius:"0"}}>
                          Active
                        </Dropdown.Toggle>

                        <Dropdown.Menu > 
                            <Dropdown.Item href="#/action-1" onClick={()=>{updateStatusActive(value )}}>Active</Dropdown.Item>
                            <Dropdown.Item href="#/action-2"onClick={()=>{updateStatusInActive(value)}}>InActive</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      {/* <select 
                        style={{ backgroundColor: 'rgb(34, 52, 100)', color: 'white', height:"1.7rem",}}
                    
                      >
                        <option onClick={()=>{updateStatusActive(value )}}>Active</option>
                        <option  onClick={()=>{updateStatusInActive(value)}}>Inactive</option>
                      </select> */}
                    </td>
                  )}

                </tr>
              
            );
          });
    }

   
    return (
    <>
    <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} style={{
            padding: '8px',
            height: '2.1rem',
            marginRight: '8px',
            borderRadius: '4px',
            border: '1px solid rgb(34, 52, 100)',
            marginBottom: '15px',
          }}
        />
        <button
          style={{
            backgroundColor: 'rgb(34, 52, 100)',
            color: '#ffffff',
            height: '2.1rem',
            // padding: '8px',
            marginRight: '8px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={handleSearch}
        >
          Search
        </button>

        <button
          style={{
            backgroundColor: '#7f8c8d', 
            color: '#ffffff', // White text color
           
            borderRadius: '4px',
            height: '2.1rem',
            marginBottom:"1rem",
            cursor: 'pointer',
          }}
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
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