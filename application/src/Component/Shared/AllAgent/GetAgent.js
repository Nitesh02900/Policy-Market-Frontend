import React, {useState,useEffect} from 'react'
import Table from './AgentTable'
import PageSize from '../Page/PageSize'
import PaginationOfApp from "../Page/PaginationOfApp"
import "./GetAgent.css"
import { getAllAgent } from '../../../Service/AgentService'
import { useNavigate } from 'react-router-dom';


const GetAgent = () => {
    const [pageSize,setPageSize] =useState(3)
    const [pageNumber, setPageNumber] = useState()
    const [numberOfPages, setNumberOfPages] = useState()
    const [totalNumberOfRecords, setTotalNumberOfRecord] = useState()
    const [data,setData] =useState([])
    const navigate = new useNavigate();
  
    
    const getAgent = async() =>{
      try{
           let response =await getAllAgent(pageNumber,pageSize)
         
              if(response.data)
              {
                  setData(response.data)
                  // console.log(response.data)
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
      getAgent()
    },[])
  
    
     useEffect(()=>{
      
      getAgent()
    }, [totalNumberOfRecords,pageSize, pageNumber])
  
  return (
    <>
       <div className='agent-details-box'>
          <div  className="agent-details-tittle"style={{textAlign:"center", marginTop:"1.5rem"}}>
            <h1>Agent Details</h1>
          </div>
          <div className="agent-container">
              
              <div className='agent-left'>
                <PageSize  pageSize={pageSize} setPageSize={setPageSize}  setNumberOfPages={setNumberOfPages}  totalNumberOfRecords={totalNumberOfRecords} />
              </div>
          </div>
        
          <div className="agent-table-container">
             
              <Table data={data} isDeleteButton={true}   />
          </div>
            <div className='agent-right'>
                <PaginationOfApp numberOfPages={numberOfPages} getFunction ={getAgent} pageNumber={pageNumber} setPageNumber ={setPageNumber}/>
            </div>
            <button
            onClick={() => navigate(-1)}
            style={{
              width:'5rem',
              padding: '2px',
              backgroundColor: 'rgb(34, 52, 100)',
              marginLeft: '92%',
              color: 'white',
            }}
          >
            Go Back
          </button>
        </div>
    
    
    
    
    </>
  )
}

export default GetAgent
