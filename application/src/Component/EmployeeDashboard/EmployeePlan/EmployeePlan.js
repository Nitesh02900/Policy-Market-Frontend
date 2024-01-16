import React, {useState,useEffect} from 'react'
import PageSize from '../../Shared/Page/PageSize'
import PaginationOfApp from '../../Shared/Page/PaginationOfApp'
import { useNavigate } from 'react-router-dom';
import { getAllPlans } from '../../../Service/PlanService';
import Table from '../Table/PlanTable/PlanTable'



const EmployeePlan = () => {
    const [pageSize,setPageSize] =useState(4)
    const [pageNumber, setPageNumber] = useState()
    const [numberOfPages, setNumberOfPages] = useState()
    const [totalNumberOfRecords, setTotalNumberOfRecord] = useState()
    const [data,setData] =useState([])
    const [planId,setPlanId]=useState()
    const navigate = new useNavigate()

    const getPlan = async() =>{
        try{
             let response =await getAllPlans(pageNumber,pageSize)
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
        getPlan()
    },[])
    
      
    useEffect(()=>{
        console.log("useEffect called")
        getPlan()
    }, [totalNumberOfRecords,pageSize, pageNumber])

    const SchemeFunc = async(value) =>{
        try{
          console.log(value)
          setPlanId(value.planId)
          const dataToSend = {
              planId:value.planId
          }
          navigate('/employeeDashboard/Scheme', { state: dataToSend });
        }
        catch(error)
        {
            console.log(error)
            alert(error.message)
        }
    }




  return (
    <>
         <div className='admin-plan-details-box'>
            <div className ="admin-plan-details-tittle"style={{textAlign:"center", marginTop:"1.5rem", background:"rgb(34, 52, 100)"}}>
                <h1>Plans Details</h1>
            </div>
            <div className="admin-plan-container">
                <div className='admin-plan-left'>
                    <PageSize  pageSize={pageSize} setPageSize={setPageSize}  setNumberOfPages={setNumberOfPages}  totalNumberOfRecords={totalNumberOfRecords} />
                </div>
                
            </div>
        
            <div style={{  margin: '1rem'}} className="plan-table-container">
                {console.log(data)}
                <Table data={data}   isSchemeButton ={true} SchemeFunc={SchemeFunc} />
            </div>
            <div className='plan-right'>
                <PaginationOfApp numberOfPages={numberOfPages} getFunction ={getPlan} pageNumber={pageNumber} setPageNumber ={setPageNumber}/>
            </div> 
            <button
                onClick={() => navigate(-1)}
                style={{
                width: '5rem',
                padding: '2px',
                backgroundColor: 'rgb(34, 52, 100)',
                marginLeft: '91%',
                color: 'white',
                }}
            >
                Go Back
            </button>
               
        </div>
        
    
    
    
    </>
  )
}

export default EmployeePlan
