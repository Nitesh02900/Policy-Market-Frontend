import React, {useState,useEffect}  from 'react'
import PageSize from '../../Shared/Page/PageSize'
import PaginationOfApp from '../../Shared/Page/PaginationOfApp'
import Table from '../Table/PolicyTable/PolicyTable'
import {getAllPolicy, getDocument} from '../../../Service/PolicyService'
import "./AdminPolicy.css"
import { useNavigate } from 'react-router-dom';
import { updatePolicyStatus } from '../../../Service/PolicyService'

const AdminPolicy = () => {
    const [pageSize,setPageSize] =useState(4)
    const [pageNumber, setPageNumber] = useState()
    const [numberOfPages, setNumberOfPages] = useState()
    const [totalNumberOfRecords, setTotalNumberOfRecord] = useState()
    const [data,setData] =useState([])
    const navigate = new useNavigate();

    
    const getPolicy = async() =>{
        try{
           let response =await getAllPolicy(pageNumber,pageSize)
             console.log(response)
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
        getPolicy()
      },[])
    
      
       useEffect(()=>{
        console.log("useEffect called")
        getPolicy()
      }, [totalNumberOfRecords,pageSize, pageNumber])

      
      const viewDocFunc = async(value) =>{
        try{
            let response = getDocument(value.policyNumber)
            }
            catch(error)
            {
                console.log(error)
                alert(error.message)
            }
      }

  return (
    <>
        <div className='admin-policy-details-box'>
            <div className ="admin-policy-details-tittle"style={{textAlign:"center", marginTop:"1.5rem", background:"rgb(34, 52, 100)"}}>
                <h1>Policy Details</h1>
            </div>
            <div className="admin-policy-container">
                <div className='admin-policy-left'>
                    <PageSize  pageSize={pageSize} setPageSize={setPageSize}  setNumberOfPages={setNumberOfPages}  totalNumberOfRecords={totalNumberOfRecords} />
                </div>
            </div>
        
            <div style={{  margin: '1rem'}} className="admin-plan-table-container">
                {console.log(data)}
                <Table data={data} isVerifyButton={false} isViewDocumentButton={true} viewDocFunc={viewDocFunc}  />
            </div>
            <div className='admin-policy-right'>
                <PaginationOfApp numberOfPages={numberOfPages} getFunction ={getPolicy} pageNumber={pageNumber} setPageNumber ={setPageNumber}/>
            </div> 
            <button
            onClick={() => navigate(-1)}
            style={{

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

export default AdminPolicy
