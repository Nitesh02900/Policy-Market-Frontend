import React, {useState,useEffect}  from 'react'
import PageSize from '../../Shared/Page/PageSize'
import PaginationOfApp from '../../Shared/Page/PaginationOfApp'
import Table from '../Table/PolicyTable/PolicyTable'
import { getAllPolicyByUsername } from '../../../Service/PolicyService'
import { validateUser } from '../../../Service/Authentication';
import { useNavigate } from 'react-router-dom';


const CustomerPolicy = () => {
    const [pageSize,setPageSize] =useState(4)
    const [pageNumber, setPageNumber] = useState()
    const [numberOfPages, setNumberOfPages] = useState()
    const [totalNumberOfRecords, setTotalNumberOfRecord] = useState()
    const [data,setData] =useState([])
    const navigate = new useNavigate();


    const getPolicy = async() =>{
        try{
            const authToken = localStorage.getItem('authentication')
            let resp = await validateUser(authToken)
         
             let response =await getAllPolicyByUsername(pageNumber,pageSize,resp.data.sub)
             console.log(response)
            if(response.data){
                    setData(response.data)
                }
        //   console.log('recode',response.headers['x-total-count'])
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
      

      const paymentFunc = async(data) =>{
        console.log(data)

        const dataToSend = {
            numberOfYear:data.noOfYear,
            policyNumber:data.policyNumber,
            premiumType:data.premiumType,
            installmentAmount:data.installmentAmount,

        }
            navigate('/customerDashboard/payment',{ state: dataToSend })
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
            
                <Table data={data} isPaymentButton={true} isDeleteButton={true} paymentFunc={paymentFunc} />
            </div>
            <div className='plan-right'>
                <PaginationOfApp numberOfPages={numberOfPages} getFunction ={getPolicy} pageNumber={pageNumber} setPageNumber ={setPageNumber}/>
            </div> 
            <button
                onClick={() => navigate(-1)}
                style={{
                width: '5rem',
                height:"2rem",
                borderRadius:"4px",
                padding: '2px',
                backgroundColor: 'rgb(34, 52, 100)',
                marginLeft: '90%',
                border:"none",
                color: 'white',
                }}
            >
                Go Back
            </button>
               
        </div>
        
    
    
    </>
  )
}

export default CustomerPolicy
