import React, {useState,useEffect}  from 'react'
import './Viewpolicy.css'
import PageSize from '../../Shared/Page/PageSize'
import PaginationOfApp from '../../Shared/Page/PaginationOfApp'
import { useNavigate } from 'react-router-dom';
import {getAllPolicy, getDocument} from '../../../Service/PolicyService'
import Table from '../Table/PolicyTable/PolicyTable';
import { validateUser as validate } from '../../../Service/Authentication';
import { getAllPolicyByAgent } from '../../../Service/PolicyService';



const Viewpolicy = () => {

    const [pageSize,setPageSize] =useState(4)
    const [pageNumber, setPageNumber] = useState()
    const [numberOfPages, setNumberOfPages] = useState()
    const [totalNumberOfRecords, setTotalNumberOfRecord] = useState()
    const [data,setData] =useState([])
    const navigate = new useNavigate();

    const getPolicy = async() =>{
        try{
        //    let response =await getAllPolicyForAgent(pageNumber,pageSize)
        const authToken = localStorage.getItem('authentication')
        let resp = await validate(authToken)
        let response =await getAllPolicyByAgent(pageNumber,pageSize,resp.data.sub)
           
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
        getPolicy()
      }, [totalNumberOfRecords,pageSize, pageNumber])

      const installmentFunc = async(data) =>{
        console.log(data)

        const dataToSend = {
            numberOfYear:data.noOfYear,
            policyNumber:data.policyNumber,
            commission:data.commission,
            premiumType:data.premiumType,
            installmentAmount:data.installmentAmount,

        }
            navigate('/agentDashboard/installment',{ state: dataToSend })
      }

  return (
    <>
        <div className='policy-details-box'>
            <div className ="policy-details-tittle"style={{textAlign:"center", marginTop:"1.5rem", background:"rgb(34, 52, 100)"}}>
                <h1>Policy Details</h1>
            </div>
            <div className="policy-container">
                <div className='policy-left'>
                    <PageSize  pageSize={pageSize} setPageSize={setPageSize}  setNumberOfPages={setNumberOfPages}  totalNumberOfRecords={totalNumberOfRecords} />
                </div>
            </div>
        
            <div style={{  margin: '1rem'}} className="plan-table-container">
                
                <Table data={data}  isinstallmentButton={true} installmentFunc ={installmentFunc }  />
           
            </div>
            <div className='plan-right'>
                <PaginationOfApp numberOfPages={numberOfPages} getFunction ={getPolicy} pageNumber={pageNumber} setPageNumber ={setPageNumber}/>
            </div> 
                <button
                className='go-back-button'
                onClick={() => navigate(-1)}
                style={{
                width: '5rem',
                padding: '2px',
                // backgroundColor: 'rgb(34, 52, 100)',
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

export default Viewpolicy
