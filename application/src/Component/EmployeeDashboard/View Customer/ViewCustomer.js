import React, {useState,useEffect} from 'react'
import Table from '../Table/CustomerTable/CustomerTable'
import PageSize from '../../Shared/Page/PageSize'
import PaginationOfApp from "../../Shared/Page/PaginationOfApp"
import { getAllCustomer, deleteCustomer,updateActiveStatus, getAllCustomerActive } from '../../../Service/CustomerService'
import "./ViewCustomer.css"
import { useNavigate } from 'react-router-dom';

// import SearchBar from '../../Shared/'; 

const ViewCustomer = () => {
  const [pageSize,setPageSize] =useState(4)
  const [pageNumber, setPageNumber] = useState()
  const [numberOfPages, setNumberOfPages] = useState()
  const [totalNumberOfRecords, setTotalNumberOfRecord] = useState()
  const [data,setData] =useState([])
  const navigate = new useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredData, setFilteredData] = useState([]);
  

  
  const getCustomer = async() =>{
    try{
         let response =await  getAllCustomerActive (pageNumber,pageSize)
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
          
            <Table data={data} />
          </div>
          <div className='customer-pagination'>
              <PaginationOfApp numberOfPages={numberOfPages} getFunction ={getCustomer} pageNumber={pageNumber} setPageNumber ={setPageNumber}/>
          </div>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: '5rem',
              padding: '2px',
              backgroundColor: 'rgb(34, 52, 100)',
              marginLeft: '91%',
              color: 'white',
              cursor:"pointer"
            }}
          >
            Go Back
          </button>
      </div>
    </>
  )
}

export default ViewCustomer
