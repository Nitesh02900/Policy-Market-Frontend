import React, {useState,useEffect} from 'react'
import Table from './EmployeeTable'
import PageSize from '../Page/PageSize'
import PaginationOfApp from "../Page/PaginationOfApp"
import { getAllEmployee } from '../../../Service/EmployeeService'
import "./GetEmployee.css"
import { useNavigate } from 'react-router-dom';
import { updateEmployeeActive } from '../../../Service/EmployeeService'


const GetEmployee = () => {
    const [pageSize,setPageSize] =useState(3)
    const [pageNumber, setPageNumber] = useState()
    const [numberOfPages, setNumberOfPages] = useState()
    const [totalNumberOfRecords, setTotalNumberOfRecord] = useState()
    const [data,setData] =useState([])
    const navigate = new useNavigate();

    const getEmployee = async() =>{
        try{
             let response =await getAllEmployee(pageNumber,pageSize)
            
                if(response.data)
                {
                    setData(response.data)
                    
                }
          
            let totalNumberOfRecords = response.headers['x-total-count']
            setTotalNumberOfRecord(totalNumberOfRecords)
            setNumberOfPages(Math.ceil(totalNumberOfRecords /pageSize))
           
        }
          catch(error)
          {
            console.log(error)
              alert(error.message)
          }
       }
       
       useEffect(()=>{
        
        getEmployee()
      }, [totalNumberOfRecords,pageSize, pageNumber])
    
      
      const updateStatusActive = async(value) =>{
        let status = "True";
        try{
            let  response  = updateEmployeeActive(value.username,status);
            if(response)
            {
                alert('Employee is updated Active')
                getEmployee();
            }
        }
        catch(error)
        {
            console.log(error)
            alert(error.message)
        }
      }
      const updateStatusInActive =async(value)=>{
        console.log(value)
        let status = "False";
        try{
            let  response =updateEmployeeActive(value.username,status);
            if(response)
            {
                alert('Employee is updated InActive')
                getEmployee()
            }
        }
        catch(error)
        {
            console.log(error)
            alert(error.message)
        }
      }


  return (
    <>
      <div className='employee-details-box'>
     
        <div  style={{textAlign:"center", marginTop:"1.5rem"}} className='employee-details-tittle'>
          <h1>Employee Details</h1>
        </div>
        <div className="employee-container">
            
            <div className='employee-left'>
              <PageSize  pageSize={pageSize} setPageSize={setPageSize}  setNumberOfPages={setNumberOfPages}  totalNumberOfRecords={totalNumberOfRecords} />
            </div>
           
            
        </div>
      
          <div style={{  margin: '1rem', borderRadius:'20%'}} className="employee-table-container">
           
            <Table data={data}  isDeleteButton={true} updateStatusActive={updateStatusActive} updateStatusInActive={updateStatusInActive}/>
          </div>
          <div className='employee-right'>
              <PaginationOfApp numberOfPages={numberOfPages} getFunction ={getEmployee} pageNumber={pageNumber} setPageNumber ={setPageNumber}/>
          </div> 
          <button
            onClick={() => navigate(-1)}
            style={{
              width:'5rem',
              padding: '2px',
              backgroundColor: 'rgb(34, 52, 100)',
              marginLeft: '90%',
              color: 'white',
            }}
          >
            Go Back
          </button>
      </div>
    
    
    </>
  )
}

export default GetEmployee
