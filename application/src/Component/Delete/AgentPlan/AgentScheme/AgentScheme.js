import React, {useState,useEffect} from 'react'
import PageSize from '../../../Shared/Page/PageSize'
import PaginationOfApp from '../../../Shared/Page/PaginationOfApp'
import { getAllSchemes } from '../../../../Service/SchemeService'
import Table from '../../../AgentDashboard/Table/SchemeTable/SchemeTable'
import "./AgentScheme.css"
import { useLocation } from 'react-router-dom';

const Scheme = () => {
    const location = useLocation();
    const receivedData = location.state || {};
  

    const [pageSize,setPageSize] =useState(4)
    const [pageNumber, setPageNumber] = useState()
    const [numberOfPages, setNumberOfPages] = useState()
    const [totalNumberOfRecords, setTotalNumberOfRecord] = useState()
    const [data,setData] =useState([])
    const [showAddSchemeModel, setShowAddSchemeModel] = useState(false)
    const [planId, setPlanId] = useState(receivedData.planId)
    

    
    const getScheme = async() =>{
        try{
             let response =await getAllSchemes(pageNumber,pageSize, receivedData.planId)
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
        getScheme()
    },[])
    useEffect(()=>{
        console.log("useEffect called")
        getScheme()
    }, [totalNumberOfRecords,pageSize, pageNumber])

    const UpdateFunc = async(value) =>{
        try{
          
        }
        catch(error){
            console.log(error)
            alert(error.message)
        }
    }

    const AddSchemeFunc = async() =>{
        setShowAddSchemeModel(!showAddSchemeModel)
    }


  return (
    <>
        <div className='agent-scheme-details-box'>
            <div className ="agent-scheme-details-tittle"style={{textAlign:"center", marginTop:"1.5rem", background:"rgb(34, 52, 100)"}}>
                <h1>Scheme Details</h1>
            </div>
            <div className="agent-scheme-container">
                <div className='agent-scheme-left'>
                    <PageSize  pageSize={pageSize} setPageSize={setPageSize}  setNumberOfPages={setNumberOfPages}  totalNumberOfRecords={totalNumberOfRecords} />
                </div>
            </div>
        
            <div style={{  margin: '1rem'}} className="plan-table-container">
             
                <Table data={data}  isDeleteButton={true}  SchemeFunc={UpdateFunc} />
            </div>
            <div className='scheme-right'>
                <PaginationOfApp numberOfPages={numberOfPages} getFunction ={getScheme} pageNumber={pageNumber} setPageNumber ={setPageNumber}/>
            </div> 
               
        </div>
       
    
    
    </>
  )
}

export default Scheme
