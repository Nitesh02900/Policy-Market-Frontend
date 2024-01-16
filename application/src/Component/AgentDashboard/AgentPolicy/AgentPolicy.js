// import React,  {useState,useEffect} from 'react'
// import { validateUser as validate } from '../../../Service/Authentication';
// import './AgentPolicy.css'
// import Button from 'react-bootstrap/Button';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { savePolicyByAgent } from '../../../Service/PolicyService';

// const Policy = () => {
  
//     const[username,setUsername] =useState()
//     const [nominees,setNominees] = useState()
//     const [nomineesRelation,setNomineeRelation] = useState()
//     const navigate = new useNavigate();

    
//   const location = useLocation();
//   const receivedData = location.state || {};
//   const [selectedFiles, setSelectedFiles] = useState([])
//   const maxFiles = 3;
  

//   const handleFileChange = (e) =>{
//     const files = Array.from(e.target.files)
//     const validFiles = []

//     for (const file of files) {
//       const fileType = file.type.toLowerCase()
//       const fileName = file.name.toLowerCase()

//       const allowedTypes = [
//         'image/jpeg',
//         'image/jpg',
//         'image/png',
//         'application/pdf',
//         'application/msword',
//         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//       ]
//       if (allowedTypes.includes(fileType) && validFiles.length < maxFiles) {
       
//         validFiles.push(file)
//       } else {
//         alert(
//           `Invalid file: ${fileName}. Only images (jpeg, jpg, png) and PDF (pdf,
//              doc, docx) files are allowed, and you can upload a maximum of ${maxFiles} files.`
//         )
//       }
//     }
 
//     setSelectedFiles([...selectedFiles, ...validFiles])
//   }

//   const renderSelectedFiles = () =>{
//     if (selectedFiles.length === 0) {
//         return <p>No files selected.</p>
//       }
  
//       return (
//         <ul>
//           {selectedFiles.map((file, index) => (
//             <li key={index}>
//               {file.name}{' '}
//               <Button
//                 variant="danger"
//                 onClick={() => handleFileRemove(index)}
//                 style={{ maxWidth: '100px', marginTop: '2px' }}
//                 >
//                 Remove
//               </Button>
//             </li>
//           ))}
//         </ul>
//       )
//   }

//   const handleFileRemove = (index) => {
//     const updatedFiles = [...selectedFiles]
//     updatedFiles.splice(index, 1)
//     setSelectedFiles(updatedFiles)
//   }

            

//     const handleSubmit =  async(e)  =>{
//         e.preventDefault()
//         const authToken = localStorage.getItem('authentication')
//         let resp = await validate(authToken)
       
      
//     const formDataWithFiles = [];
//     if (selectedFiles.length > 0) {
//         selectedFiles.forEach((file, index) => {
//             formDataWithFiles.push(file);
//         });
        
            
//         try{
//             let response = await savePolicyByAgent(
//                 username,
//                 resp.data.sub,
//                 nominees,
//                 nomineesRelation,
//                 receivedData.schemeId,
//                 receivedData.noOfYear,
//                 receivedData.totalInvestmentAmount,
//                 receivedData.premiumType,
//                 receivedData.installmentAmount,
//                 receivedData.interestAmount,
//                 receivedData.totalAmount,
//                 receivedData.profitRatio,
//                 formDataWithFiles
//               );
//             if(response )
//               {
//                 alert("Policy is added")
//               }
//             setSelectedFiles([])
//         }
//         catch(error)
//         {
//           console.log(error)
//             alert(error.message)
//         }
//     }
// }
    


    
    
//   return (
//    <>
//         <div className='policy-box'>
//             <div className='policy-tittle'>

//                 <h1>Policy Details Form</h1>
//             </div>
//             <div className='policy-form-container'>
//                 <form className='policy-form-controlller' onSubmit={handleSubmit}>
//                     <div>
//                     <div className="form-group ">
//                             <label for="customer">UserName</label>
//                             <input type="text" className="form-control" id="inputNominees"  value={username} onChange={(e) => setUsername(e.target.value)}/>
//                         </div>
//                     <div className="form-group ">
//                             <label for="inputNominees">Nominees</label>
//                             <input type="text" className="form-control" id="inputNominees"  value={nominees} onChange={(e) => setNominees(e.target.value)}/>
//                         </div>
//                         <div className="form-group ">
//                             <label for="inputNomineesRelation">Nominees Relation</label>
//                             <input type="text" className="form-control" id="inputNomineesRelation" value={nomineesRelation} onChange={(e) => setNomineeRelation(e.target.value)}/>
//                         </div>
//                         <div className='form-group'>
//                             <label htmlFor="noOfYear">Number of year*</label>
//                             <input
                    
//                                 type="text"
//                                 className="form-control"
//                                 id="noOfYear"
//                                 value={receivedData.noOfYear}
                                
//                                 required
//                             />
//                         </div>
//                         <div className='form-group'>
//                             <label htmlFor="totalInvestmentAmount">Total Investment Amount *</label>
//                             <input
                                
//                                 type="text"
//                                 className="form-control"
//                                 id="totalInvestmentAmount"
//                                 value={receivedData.totalInvestmentAmount}
                            
//                                 required
//                             />
//                         </div>
//                         <div className='form-group'>
//                             <label htmlFor="premiumType">Premium Type *</label>
//                             <input
                                
//                                 type="text"
//                                 className="form-control"
//                                 id="premiumType"
//                                 value={receivedData.premiumType}
                            
//                                 required
//                             />
//                         </div>
//                         <div className='investment-form-group'>
//                             <label htmlFor="installmentAmount">Installment Amount*</label>
//                             <input
//                                 disabled={true}
//                                 type="text"
//                                 className="form-control"
//                                 id="installmentAmount"
//                                 value={receivedData.installmentAmount}
                                
                            
//                                 required
//                             />
//                         </div>
//                         <div className='investment-form-group'>
//                             <label htmlFor="interestAmount">Interest Amount *</label>
//                             <input
//                                 disabled={true}
//                                 type="text"
//                                 className="form-control"
//                                 id="Interest Amount"
//                                 value={receivedData.interestAmount}
//                                 required
//                             />
//                         </div>
//                         <div className='investment-form-group'>
//                             <label htmlFor="totalAmount">Total Amount *</label>
//                             <input
//                                 disabled={true}
//                                 type="text"
//                                 className="form-control"
//                                 id="totalAmount"
//                                 value={receivedData.totalAmount}
                            
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <div className="form-group" style={{marginTop:"1rem"}}>
//                               <label htmlFor="documentfile" style={{marginRight:"1rem"}}>Upload Document</label>
//                               <input
//                                   type="file"
//                                   accept=".pdf,.doc,.docx,.png,.jpeg,.jpg"
//                                   name="documentfile"
//                                   onChange={handleFileChange}
//                                   multiple 
//                               />
//                             </div>
//                             {renderSelectedFiles()}
//                         </div>
//                     </div>
                
            
//                     <div className='policy-button'>
//                         <button type="submit" className="btn btn-primary policy-button-1" style={{marginTop:"1rem",backgroundColor: 'rgb(34, 52, 100)', color: 'white', height:"2.5rem"}} >Buy Now</button>
//                         <button
//                         className="btn btn-primary policy-button-2"
//                           onClick={() => navigate(-1)}
//                           style={{
//                           width: '8rem',
//                           height: '2.5rem',
//                           padding: '2px',
//                           backgroundColor: 'rgb(34, 52, 100)',
//                           border:'none',
//                           marginLeft: '60%',
//                           marginTop:'1rem',
//                           color: 'white',
//                           }}
//                       >
//                           Go Back
//                       </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
   
   
   
//    </>
//   )
// }


// export default Policy
import React,  {useState,useEffect} from 'react'
import { validateUser as validate } from '../../../Service/Authentication';
import './AgentPolicy.css'
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { savePolicyByAgent } from '../../../Service/PolicyService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const nameRegex = /^[a-zA-Z\s]*$/;
const Policy = () => {
  
    const[username,setUsername] =useState()
    const [nominees,setNominees] = useState()
    const [nomineesRelation,setNomineeRelation] = useState()
    const navigate = new useNavigate();

    
  const location = useLocation();
  const receivedData = location.state || {};
  const [selectedFiles, setSelectedFiles] = useState([])
  const maxFiles = 3;
  

  const handleFileChange = (e) =>{
    const files = Array.from(e.target.files)
    const validFiles = []

    for (const file of files) {
      const fileType = file.type.toLowerCase()
      const fileName = file.name.toLowerCase()

      // Define allowed file types (image or PDF)
      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
      if (allowedTypes.includes(fileType) && validFiles.length < maxFiles) {
       
        validFiles.push(file)
      } else {
        alert(
          `Invalid file: ${fileName}. Only images (jpeg, jpg, png) and PDF (pdf,
             doc, docx) files are allowed, and you can upload a maximum of ${maxFiles} files.`
        )
      }
    }
 
    setSelectedFiles([...selectedFiles, ...validFiles])
  }

  const renderSelectedFiles = () =>{
    if (selectedFiles.length === 0) {
        return <p>No files selected.</p>
      }
  
      return (
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>
              {file.name}{' '}
              <Button
                variant="danger"
                onClick={() => handleFileRemove(index)}
                style={{ maxWidth: '100px', marginTop: '2px' }}
                >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )
  }

  const handleFileRemove = (index) => {
    const updatedFiles = [...selectedFiles]
    updatedFiles.splice(index, 1)
    setSelectedFiles(updatedFiles)
  }

            

    const handleSubmit =  async(e)  =>{
        e.preventDefault()

         // Common validations for both old and new users
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one document file.');
      return;
    }
    if (!nameRegex.test(nominees) || !nameRegex.test(nomineesRelation)) {
      toast.error('Nominees and relation should only contain letters and spaces');
      return;
    }
        const authToken = localStorage.getItem('authentication')
        let resp = await validate(authToken)
       
        // if (selectedFiles.length > 0) { 
        //     const formDataWithFiles = []
        //     selectedFiles.forEach((file, index) => {
        //       formDataWithFiles.push('documentFiles', file)
        //     })
    const formDataWithFiles = [];
    if (selectedFiles.length > 0) {
        selectedFiles.forEach((file, index) => {
            formDataWithFiles.push(file);
        });
        
            
        try{
            //   let respose = await savePolicyByAgent(username,resp.data.sub,nominees, nomineesRelation,receivedData.schemeId,receivedData.noOfYear,receivedData.totalInvestmentAmount, receivedData.premiumType,receivedData.installmentAmount,receivedData.interestAmount,receivedData.totalAmount,receivedData.profitRatio,   formDataWithFiles)
            let response = await savePolicyByAgent(
                username,
                resp.data.sub,
                nominees,
                nomineesRelation,
                receivedData.schemeId,
                receivedData.noOfYear,
                receivedData.totalInvestmentAmount,
                receivedData.premiumType,
                receivedData.installmentAmount,
                receivedData.interestAmount,
                receivedData.totalAmount,
                receivedData.profitRatio,
                formDataWithFiles
              );
            if(response )
              {
                toast.success('Policy is saved!');
                navigate('/agentDashboard/viewPolicy');
              }
            setSelectedFiles([])
        }
        catch(error)
        {
          console.log(error)
          toast.error(error.message);
        }
    }
}
    


    
    
  return (
   <>
        <div className='policy-box'>
            <div className='policy-tittle'>

                <h1>Policy Details Form</h1>
            </div>
            <div className='policy-form-container'>
                <form className='policy-form-controlller' onSubmit={handleSubmit}>
                    <div>
                    <div className="form-group ">
                            <label for="customer">UserName</label>
                            <input type="text" className="form-control" id="inputNominees"  value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                    <div className="form-group ">
                            <label for="inputNominees">Nominees</label>
                            <input type="text" className="form-control" id="inputNominees"  value={nominees} onChange={(e) => setNominees(e.target.value)}/>
                        </div>
                        <div className="form-group ">
                            <label for="inputNomineesRelation">Nominees Relation</label>
                            <input type="text" className="form-control" id="inputNomineesRelation" value={nomineesRelation} onChange={(e) => setNomineeRelation(e.target.value)}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="noOfYear">Number of year*</label>
                            <input
                    
                                type="text"
                                className="form-control"
                                id="noOfYear"
                                value={receivedData.noOfYear}
                                // onChange={(e) => setNoOfYear(e.target.value)}
                            
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="totalInvestmentAmount">Total Investment Amount *</label>
                            <input
                                
                                type="text"
                                className="form-control"
                                id="totalInvestmentAmount"
                                value={receivedData.totalInvestmentAmount}
                            
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="premiumType">Premium Type *</label>
                            <input
                                
                                type="text"
                                className="form-control"
                                id="premiumType"
                                value={receivedData.premiumType}
                            
                                required
                            />
                        </div>
                        <div className='investment-form-group'>
                            <label htmlFor="installmentAmount">Installment Amount*</label>
                            <input
                                disabled={true}
                                type="text"
                                className="form-control"
                                id="installmentAmount"
                                value={receivedData.installmentAmount}
                                
                            
                                required
                            />
                        </div>
                        <div className='investment-form-group'>
                            <label htmlFor="interestAmount">Interest Amount *</label>
                            <input
                                disabled={true}
                                type="text"
                                className="form-control"
                                id="Interest Amount"
                                value={receivedData.interestAmount}
                                required
                            />
                        </div>
                        <div className='investment-form-group'>
                            <label htmlFor="totalAmount">Total Amount *</label>
                            <input
                                disabled={true}
                                type="text"
                                className="form-control"
                                id="totalAmount"
                                value={receivedData.totalAmount}
                            
                                required
                            />
                        </div>
                        <div>
                            <div className="form-group" style={{marginTop:"1rem"}}>
                              <label htmlFor="documentfile" style={{marginRight:"1rem"}}>Upload Document</label>
                              <input
                                  type="file"
                                  accept=".pdf,.doc,.docx,.png,.jpeg,.jpg"
                                  name="documentfile"
                                  onChange={handleFileChange}
                                  multiple 
                              />
                            </div>
                            {renderSelectedFiles()}
                        </div>
                    </div>
                
            
                    <div className='policy-button'>
                        <button type="submit" className="btn btn-primary policy-button-1" style={{marginTop:"1rem",backgroundColor: 'rgb(34, 52, 100)', color: 'white', height:"2.5rem"}} >Buy Now</button>
                        <button
                        className="btn btn-primary policy-button-2"
                          onClick={() => navigate(-1)}
                          style={{
                          width: '8rem',
                          height: '2.5rem',
                          padding: '2px',
                          backgroundColor: 'rgb(34, 52, 100)',
                          border:'none',
                          marginLeft: '60%',
                          marginTop:'1rem',
                          color: 'white',
                          }}
                      >
                          Go Back
                      </button>
                    </div>
                </form>
            </div>
        </div>
   
        <ToastContainer position='top-center' autoClose={3000} />
   
   </>
  )
}


export default Policy