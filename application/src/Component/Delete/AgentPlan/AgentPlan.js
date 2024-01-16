import React, {useState,useEffect} from 'react'
import PageSize from '../../Shared/Page/PageSize'
import PaginationOfApp from '../../Shared/Page/PaginationOfApp'
import Table from '../../Plans/Table/PlanTable/PlanTable'
import './AgentPlan.css'
import { getAllPlans } from '../../../Service/PlanService'
import { useNavigate } from 'react-router-dom';



const AgentPlan = () => {
    const [pageSize,setPageSize] =useState(4)
    const [pageNumber, setPageNumber] = useState()
    const [numberOfPages, setNumberOfPages] = useState()
    const [totalNumberOfRecords, setTotalNumberOfRecord] = useState()
    const [data,setData] =useState([])
    const navigate = new useNavigate();
    const [showAddPlanModel, setShowAddPlanModel] = useState(false)
    const [planId,setPlanId]=useState()
    

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
        getPlan()
      }, [totalNumberOfRecords,pageSize, pageNumber])

      const SchemeFunc = async(value) =>{
        try{
          console.log(value)
          setPlanId(value.planId)
          const dataToSend = {
              planId:value.planId
          }
          navigate('/agentDashboard/scheme', { state: dataToSend });
        }
          catch(error)
          {
            console.log(error)
              alert(error.message)
          }
       }

       const AddPlanFunc = async() =>{
            setShowAddPlanModel(!showAddPlanModel)
       }
  return (
  <>
        <div className='agent-plan-details-box'>
            <div className ="agent-plan-details-tittle"style={{textAlign:"center", marginTop:"1.5rem", background:"rgb(34, 52, 100)"}}>
                <h1>Plans Details</h1>
            </div>
            <div className="agent-plan-container">
                <div className='agent-plan-left'>
                    <PageSize  pageSize={pageSize} setPageSize={setPageSize}  setNumberOfPages={setNumberOfPages}  totalNumberOfRecords={totalNumberOfRecords} />
                </div>
               
            </div>
        
            <div style={{  margin: '1rem'}} className="plan-table-container">
                {console.log(data)}
                <Table data={data}  isDeleteButton={false} isSchemeButton ={true} SchemeFunc={SchemeFunc} />
            
            </div>
            <div className='plan-right'>
                <PaginationOfApp numberOfPages={numberOfPages} getFunction ={getPlan} pageNumber={pageNumber} setPageNumber ={setPageNumber}/>
            </div> 
               
        </div>
        
  
  </>
  )
}

export default AgentPlan
