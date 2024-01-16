import React, {useState,useEffect} from 'react'
import "./AdminPlan.css"
import PageSize from '../../Shared/Page/PageSize'
import PaginationOfApp from '../../Shared/Page/PaginationOfApp'
import Table from "../Table/Table"
import { getAllPlans } from '../../../Service/PlanService'
import AddPlanModel from '../Models/AddPlanModel'
import { useNavigate } from 'react-router-dom';
import { updatePlanActive } from '../../../Service/PlanService'



const AdminPlan = () => {
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
          navigate('/adminDashboard/Scheme', { state: dataToSend });
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
       
       const updateStatusActive = async(value) =>{
        let status = "True";
        try{
            let  response  = updatePlanActive(value.planId,status);
            if(response)
            {
                alert('Plan is updated Active')
                getPlan();
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
            let  response =updatePlanActive(value.planId,status);
            if(response)
            {
                alert('Plan is updated InActive')
                getPlan();
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
        <div className='admin-plan-details-box'>
            <div className ="admin-plan-details-tittle"style={{textAlign:"center", marginTop:"1.5rem", background:"rgb(34, 52, 100)"}}>
                <h1>Plans Details</h1>
            </div>
            <div className="admin-plan-container">
                <div className='admin-plan-left'>
                    <PageSize  pageSize={pageSize} setPageSize={setPageSize}  setNumberOfPages={setNumberOfPages}  totalNumberOfRecords={totalNumberOfRecords} />
                </div>
                <div className='admin-plan-right'>
                    <button className='btn  login-button' style={{ backgroundColor: 'rgb(34, 52, 100)', color: 'white' }} onClick={AddPlanFunc}>Add Plan</button>
                </div>
            </div>
        
            <div style={{  margin: '1rem'}} className="plan-table-container">
                
                <Table data={data}  isDeleteButton={true} isSchemeButton ={true} SchemeFunc={SchemeFunc} updateStatusActive={updateStatusActive} updateStatusInActive={updateStatusInActive}  />
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
              // border:'none',
              borderRadius:'4px'
            }}
          >
            Go Back
          </button>
               
        </div>
        <div>
        {showAddPlanModel && (
                  <AddPlanModel showAddPlanModal={showAddPlanModel} AddPlanFunc={ AddPlanFunc}  />
                  )}
        </div>
        
    
    
    </>
  )
}

export default AdminPlan
