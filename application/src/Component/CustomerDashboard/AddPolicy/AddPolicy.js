import React, {useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import {savePolicy} from "../../../Service/PolicyService"
import './AddPolicy.css'
import Button from 'react-bootstrap/Button';
import { validateUser as validate } from '../../../Service/Authentication';
import { updateCustomerdetails } from '../../../Service/CustomerService';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AddPolicy = () => {
const [mobileNumber,setMobileNumber] = useState()
const[dateOfBirth,setDateOfBirth] = useState()
const[username,setUsername] =useState()
const [address,setAddress] = useState()
const [state,setState] = useState()
const [city , setCity] = useState()
const [zip, setZip] = useState()
const [nominees,setNominees] = useState()
const [nomineesRelation,setNomineeRelation] = useState()
const [selectedState, setSelectedState] = useState()
const navigate = new useNavigate();



  const location = useLocation();
  const receivedData = location.state || {};
  const [selectedFiles, setSelectedFiles] = useState([])
  const maxFiles = 3;
  const validateUser = async() =>{
    const authToken = localStorage.getItem('authentication')
    let resp = await validate(authToken)
    setUsername(resp.data.sub)

 }
 useEffect(()=>{
  validateUser()
},[])

  const handleFileChange = (e) =>{
    const files = Array.from(e.target.files)
    const validFiles = []

    // Filter and validate the selected files
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

    if (selectedFiles.length === 0) {
      toast.error('Please select at least one document file.');
      return;
    }

     // New user validations
     if (!receivedData.dateOfBirth) {
      if (!mobileNumber || !dateOfBirth || !address || !selectedState || !city || !zip) {
        toast.error('Please fill in all required fields for new users.');
        return;
      }

      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobileNumber)) {
        toast.error('Please enter a valid 10-digit Mobile Number for new users.');
        return;
      }

      const currentDate = new Date();
      const selectedDate = new Date(dateOfBirth);
      const age = currentDate.getFullYear() - selectedDate.getFullYear();

      if (age < 18 || selectedDate > currentDate) {
        toast.error('Invalid date of birth. Age must be 18 or above for new users.');
        return;
      }

      const zipRegex = /^\d{6}$/;
      if (!zipRegex.test(zip)) {
        toast.error('ZIP code must be a valid 6-digit number for new users.');
        return;
      }
    }

    // Old user validations
    if (receivedData.dateOfBirth) {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(nominees) || !nameRegex.test(nomineesRelation)) {
        toast.error('Nominees and relation should only contain letters and spaces for old users.');
        return;
      }
    }

    if (selectedFiles.length > 0) { 
        const formDataWithFiles = []
        selectedFiles.forEach((file, index) => {
          formDataWithFiles.push('documentFiles', file)
        })
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        const maturityDate = new Date(currentDate);
        maturityDate.setFullYear(currentDate.getFullYear() + receivedData.noOfYear);
    const formattedMaturityDate = maturityDate.toISOString().split('T')[0];
    try{


          let resp = await updateCustomerdetails(username,mobileNumber,dateOfBirth,address,state,city,zip)
          let respose = await savePolicy(username,nominees, nomineesRelation,receivedData.schemeId,receivedData.noOfYear,receivedData.totalInvestmentAmount, receivedData.premiumType,receivedData.installmentAmount,receivedData.interestAmount,receivedData.totalAmount,receivedData.profitRatio, formattedDate,formattedMaturityDate,  formDataWithFiles)
          if(respose && resp)
          {
            toast.success('Policy is saved!');
            navigate('/customerDashboard/PolicyDetails')
          }
            setSelectedFiles([])
    }
    catch(error)
    {
      console.log(error)
        alert(error.message)
    }
    }
}

  return (
    <>
        <div className='plan-box'>
            <div className='plan-tittle'>

                <h1>Policy Details Form</h1>
            </div>
            <div className='plan-form-container'>
                <form className='plan-form-controlller' onSubmit={handleSubmit}>
                {/* {console.log(receivedData.dateOfBirth)} */}
                {receivedData.dateOfBirth==null
                 &&
                  <div className="plan-form-row">
                        <div className="form-group">
                            <label for="inputEmail4">Mobile</label>
                            <input type="Mobile" className="form-control" id="inputEmail" placeholder="Mobile" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label for="dataOfBirth">Date Of Birth</label>
                            <input type="Date" className="form-control" id="dataOfBirth" placeholder="dataOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                        </div>
                
                        <div className="form-group">
                            <label for="inputAddress">Address</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={address} onChange={(e) => setAddress(e.target.value)}/>
                        </div>
                        <div className="form-group ">
                            <label for="inputState">State</label>
                            <select id="inputState" className="form-control" size="5"  value={selectedState}  onChange={(e) => setSelectedState(e.target.value)} style={{height:"6rem"}}>
                                <option selected>Choose...</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Daman and Diu"> Daman and Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Puducherry">Puducherry</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="inputCity">City</label>
                            <input type="text" className="form-control" id="inputCity"  value={city} onChange={(e) => setCity(e.target.value)}/>
                        </div>
                        <div className="form-group ">
                            <label for="inputZip">Zip</label>
                            <input type="text" className="form-control" id="inputZip"  value={zip} onChange={(e) => setZip(e.target.value)}/>
                        </div>
                    </div>  
                  }
                        <div className="form-group ">
                            <label for="inputNominees">Nominees</label>
                            <input type="text" className="form-control" id="inputNominees"  value={nominees} onChange={(e) => setNominees(e.target.value)}/>
                        </div>
                        <div className="form-group ">
                            <label for="inputNomineesRelation">Nominees Relation</label>
                            <input type="text" className="form-control" id="inputNomineesRelation" value={nomineesRelation} onChange={(e) => setNomineeRelation(e.target.value)}/>
                        </div>
                 
                
                

                  <div>
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

                        
                        <div className="form-group" style={{ marginTop: '1rem' }}>
                          <label style={{ marginRight: '1rem' }}>Select Document Type:</label>
                            <div className='radio-button-container'>
                              <div className='radio-button'>
                                <label >
                                  <input
                                    type="radio"
                                    value="aadhar"
                                    name="documentType"
                                    style={{marginRight:'.5rem'}}
                                    
                                  />
                                  Aadhar Card
                                </label>
                              </div>
                              <div className='radio-button'>
                                <label>
                                  <input
                                    type="radio"
                                    value="pancard"
                                    name="documentType"
                                    style={{marginRight:'.5rem'}}
                                    
                                  />
                                  PAN Card
                                </label>
                              </div>
                              <div className='radio-button'>
                                <label>
                                  <input
                                    type="radio"
                                    value="voterid"
                                    name="documentType"
                                    style={{marginRight:'.5rem'}}
                                  />
                                  Voter ID
                                </label>
                              </div>
                          </div>
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
                      </div>

                      {renderSelectedFiles()}
    
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

export default AddPolicy
