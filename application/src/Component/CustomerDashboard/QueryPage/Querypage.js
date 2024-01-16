// import React, { useState,useEffect } from 'react'
// import image from '../../../Image/Questions.svg'
// import "./QueryPage.css"
// import { useNavigate } from 'react-router-dom';
// import { validateUser as validate } from '../../../Service/Authentication';
// import { addQuery } from '../../../Service/QueryService';

// const QueryPage = () => {
//     const navigate=new useNavigate();
//     const [query, setquery] =useState();
//     const [data,setData] = useState()
//     const [username, setUsername] = useState()


//     const validateUser = async() =>{
//         const authToken = localStorage.getItem('authentication')
//         let resp = await validate(authToken)
//         console.log(resp)
//         if(resp)
//         {
//             setData(resp)
//         }

//      }
//      useEffect(()=>{
//         validateUser()
//       },[])

   
//     const toggleAllquery = () => {
       
//         const dataToSend = {
//             username:data.data.sub,
//         }
//         navigate('/customerDashboard/query',  { state: dataToSend });
//     }
    
//     const submitquestion =async() =>{
//         try{
          
//         let resp = await addQuery(query,data.data.sub)
//         if(resp)
//         {
//             alert("Queryis sended")
//         }
//         }
//          catch(error)
//         {
//             console.log(error)
//             alert(error)
            
//         }
//     }

    

//   return (
//         <>
//            <div className='query-page-container'>
//                 <div className="query-page-top-element">
//                     <img style={{ height: "45vh", width: "50vh" }} src={image} alt="query-page image" />
//                 </div>

//                 <div className="query-page-bottom-element">
//                     <div className='query-page-box'>
//                     <h1 className='query-page-heading'>Query Submission </h1>
//                     <form className='query-page-postdata'>
//                         <div className='query-page-form-group'>
//                             <label htmlFor="query-page"> Enter Your Query</label>
//                             <input type="text" className="form-control" id="query-" value ={query}  onChange={(e) => setquery(e.target.value)}/>
//                         </div>

//                         <div className='query-page-button' style={{marginTop:"1rem"}}>
//                             <button type="button" className="btn btn-primary query-page-button"  onClick={submitquestion}>Submit</button>
//                             <button type="button" className="btn btn-primary query-page-button" style={{marginLeft:"12rem"}} onClick={toggleAllquery}>All query-page</button>
//                         </div>
//                     </form>
//                     </div>
//                 </div>
//             </div>
           
//         </>
//   )
// }

// export default QueryPage
// import React, { useState,useEffect } from 'react'
// import image from '../../../Image/Questions.svg'
// import "./QueryPage.css"
// import { useNavigate } from 'react-router-dom';
// import { validateUser as validate } from '../../../Service/Authentication';
// import { addQuery } from '../../../Service/QueryService';

// const QueryPage = () => {
//     const navigate=new useNavigate();
//     const [query, setquery] =useState();
//     const [data,setData] = useState()
//     const [username, setUsername] = useState()


//     const validateUser = async() =>{
//         const authToken = localStorage.getItem('authentication')
//         let resp = await validate(authToken)
//         console.log(resp)
//         if(resp)
//         {
//             setData(resp)
//         }

//      }
//      useEffect(()=>{
//         validateUser()
//       },[])

   
//     const toggleAllquery = () => {
       
//         const dataToSend = {
//             username:data.data.sub,
//         }
//         navigate('/customerDashboard/query',  { state: dataToSend });
//     }
    
//     const submitquestion =async() =>{
//         try{
          
//         let resp = await addQuery(query,data.data.sub)
//         if(resp)
//         {
//             alert("query-page is sended")
//         }
//         }
//          catch(error)
//         {
//             console.log(error)
//             alert(error)
//             // alert("Wrong Username Or Password")
//         }
//     }

    

//   return (
//         <>
//            <div className='query-page-container'>
//                 <div className="query-page-top-element">
//                     <img style={{ height: "45vh", width: "50vh", marginTop:"2rem" }} src={image} alt="query-page image" />
//                 </div>

//                 <div className="query-page-bottom-element">
//                     <div className='query-page-box'>
//                     <h1 className='query-page-heading'>Query Submission </h1>
//                     <form className='query-page-postdata'>
//                         <div className='query-page-form-group'>
//                             <label htmlFor="query-page"> Enter Your Query</label>
//                             <textarea  type="text" className="form-control" id="query-" value ={query}  onChange={(e) => setquery(e.target.value)}/>
//                         </div>

//                         <div className='query-page-button-container' style={{marginTop:"1rem"}}>
//                             <button type="button" className="btn btn-primary query-page-button"  onClick={submitquestion}  style={{ width:'5rem', height:'2rem'}}>Submit</button>
//                             <button type="button" className="btn btn-primary query-page-button" style={{marginLeft:"12rem" , width:'5rem', height:'2rem'}} onClick={toggleAllquery}>All Query</button>
//                         </div>
//                     </form>
//                     </div>
//                 </div>
//             </div>
//             {/* value={userquery-page} onChange={(e) => setUserquery-page(e.target.value)}  */}
//             {/* onClick={submitquery-page} */}

//         </>
//   )
// }

// export default QueryPage


import React, { useState,useEffect } from 'react'
import image from '../../../Image/Questions.svg'
import "./QueryPage.css"
import { useNavigate } from 'react-router-dom';
import { validateUser as validate } from '../../../Service/Authentication';
import { addQuery } from '../../../Service/QueryService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QueryPage = () => {
    const navigate=new useNavigate();
    const [query, setquery] =useState();
    const [data,setData] = useState()
    const [username, setUsername] = useState()


    const validateUser = async() =>{
        const authToken = localStorage.getItem('authentication')
        let resp = await validate(authToken)
        console.log(resp)
        if(resp)
        {
            setData(resp)
        }

     }
     useEffect(()=>{
        validateUser()
      },[])

   
    const toggleAllquery = () => {
       
        const dataToSend = {
            username:data.data.sub,
        }
        navigate('/customerDashboard/query',  { state: dataToSend });
    }
    
    const submitquestion =async() =>{
        try{
            if (!query) {
                toast.error('Please enter your query before submitting.');
                return;
              }
        let resp = await addQuery(query,data.data.sub)
        if(resp)
        {
            toast.success('Query submitted successfully!');
        }
        }
         catch(error)
        {
            console.log(error)
            toast.error(`toast.error(Error: ${error.message}`);
        }
    }

    

  return (
        <>
           <div className='query-page-container'>
                <div className="query-page-top-element">
                    <img style={{ height: "45vh", width: "50vh", marginTop:"2rem" }} src={image} alt="query-page image" />
                </div>

                <div className="query-page-bottom-element">
                    <div className='query-page-box'>
                    <h1 className='query-page-heading'>Query Submission </h1>
                    <form className='query-page-postdata'>
                        <div className='query-page-form-group'>
                            <label htmlFor="query-page"> Enter Your Query</label>
                            <textarea type="text" className="form-control" id="query-" value ={query}  onChange={(e) => setquery(e.target.value)}/>
                        </div>

                        <div className='query-page-button-container' style={{marginTop:"1rem"}}>
                            <button type="button" className="btn btn-primary query-page-button"  onClick={submitquestion}>Submit</button>
                            <button type="button" className="btn btn-primary query-page-button" style={{marginLeft:"13rem"}} onClick={toggleAllquery}>All Query</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={3000} />
            {/* value={userquery-page} onChange={(e) => setUserquery-page(e.target.value)}  */}
            {/* onClick={submitquery-page} */}

        </>
  )
}

export default QueryPage