import React, {useState,useEffect} from 'react'
import Table from './CustomerTable'
import PageSize from '../Page/PageSize'
import PaginationOfApp from "../Page/PaginationOfApp"
import { getAllCustomer, deleteCustomer,updateActiveStatus } from '../../../Service/CustomerService'
import "./GetCustomer.css"
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar'; 
import { updateCustomerActive } from '../../../Service/CustomerService'

const GetCustomer = () => {
  const [pageSize,setPageSize] =useState(4)
  const [pageNumber, setPageNumber] = useState()
  const [numberOfPages, setNumberOfPages] = useState()
  const [totalNumberOfRecords, setTotalNumberOfRecord] = useState()
  const [data,setData] =useState([])
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredData, setFilteredData] = useState([]);
  const navigate = new useNavigate();
    

  
  const getCustomer = async() =>{
    try{
         let response =await getAllCustomer(pageNumber,pageSize)
         console.log(response)
            if(response.data)
            {
                setData(response.data)
               
            }
      
        let totalNumberOfRecords = response.headers['x-total-count']
        setTotalNumberOfRecord(totalNumberOfRecords)
        setNumberOfPages(Math.ceil(totalNumberOfRecords /pageSize))
    //     const updatedFilteredData = Array.isArray(data)
    //   ? data.filter((customer) =>
    //       customer.username.toLowerCase().includes(searchTerm.toLowerCase())
    //     )
    //   : [];

    // setFilteredData(updatedFilteredData);
       
    }
      catch(error)
      {
        console.log(error)
          alert(error.message)
      }
   }
   
   useEffect(()=>{
    getCustomer()
  },[])

  
   useEffect(()=>{
    console.log("useEffect called")
    getCustomer()
  }, [totalNumberOfRecords,pageSize, pageNumber])

  const updateStatusActive = async(value) =>{
    let status = "True";
    try{
        let  response  = updateCustomerActive(value.username,status);
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
        let  response =updateCustomerActive(value.username,status);
    }
    catch(error)
    {
        console.log(error)
        alert(error.message)
    }
  }
 
  return (
    <>
      <div className='customer-detail-box'>
        <div  style={{textAlign:"center", marginTop:"1.5rem"}} className='customer-details-tittle'>
          <h1>Customer Details</h1>
        </div>
        <div className="customer-container">
            
            <div className='customer-left'>
              <PageSize  pageSize={pageSize} setPageSize={setPageSize}  setNumberOfPages={setNumberOfPages}  totalNumberOfRecords={totalNumberOfRecords} />
            </div>
           
        </div>
      
          <div style={{  margin: '1rem', borderRadius:'20%'}} className="customer-table-container">
          
              <Table data={data} isDeleteButton={true}   updateStatusActive={updateStatusActive}  updateStatusInActive={updateStatusInActive}/>
           </div>
          <div className='customer-pagination'>
              <PaginationOfApp numberOfPages={numberOfPages} getFunction ={getCustomer} pageNumber={pageNumber} setPageNumber ={setPageNumber}/>
            </div>
            <input className='button'
            onClick={() => navigate(-1)}
            style={{

             
              backgroundColor: 'rgb(34, 52, 100)',
              marginLeft: '90%',
              cursor: "pointer",
              color: 'white',
            }}
            value="Go Back"
            type="submit" 
         />
            
          {/* </button> */}
      </div>
    </>
  )
}

export default GetCustomer
