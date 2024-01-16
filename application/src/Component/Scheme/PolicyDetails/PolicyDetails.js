import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { validateUser as validate } from '../../../Service/Authentication';
import { getCustomerByUserName } from '../../../Service/CustomerService';
import './PolicyDetails.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PolicyDetails = ({value,schemeId}) => {

    const [maxAmount, setMaxAmount] = useState(value?.maxAmount || "");
    const [minAmount, setMinAmount] = useState(value?.minAmount || "");
    const [minAge, setMinAge] = useState(value?.minAge || "");
    const [maxAge, setMaxAge] = useState(value?.maxAge || "");
    const [minTime, setMinTime] = useState(value?.minTime || "");
    const [maxTime, setMaxTime] = useState(value?.maxTime || "");
    const [profitRatio, setProfitRatio] = useState(value?.profitRatio || "");

    const [noOfYear,setNoOfYear] = useState()
    const [totalInvestmentAmount, setTotalInvestmentAmount] = useState()
    const [premiumType, setPremiumType] = useState()
    const [installmentAmount, setInstallmentAmount] = useState();
    const [interestAmount, setInterestAmount] = useState();
    const [totalAmount, setTotalAmount] = useState();

    const navigate=new useNavigate();

    const openPolicy =async() =>{
 
        if(localStorage.getItem('authentication'))
        {
            const authToken = localStorage.getItem('authentication')
            let resp = await validate(authToken)
            console.log("username------>", resp)
           
            const dataToSend = {
                schemeId:schemeId,
                noOfYear,
                totalInvestmentAmount,
                premiumType,
                installmentAmount,
                interestAmount,
                totalAmount,
                profitRatio,
               
              };
          
            // const authToken = localStorage.getItem('authentication')
            console.log(resp.data.role[0].authority)
            if(resp.data.role[0].authority === 'ROLE_AGENT')
            {
                navigate('/agentDashboard/Policy',  { state: dataToSend })
            }
            else if(resp.data.role[0].authority === 'ROLE_CUSTOMER')
            {

                let response = await getCustomerByUserName(resp.data.sub)
          
            const datatoBeSend = {
                    schemeId:schemeId,
                    noOfYear,
                    totalInvestmentAmount,
                    premiumType,
                    installmentAmount,
                    interestAmount,
                    totalAmount,
                    profitRatio,
                    username :response.data.userdetails.username,
                    firstName:response.data.userdetails.firstname,
                    lastName:response.data.userdetails.lastname,
                    address:response.data.address,
                    mobileNumber:response.data.userdetails.mobileNumber,
                    dateOfBirth:response.data.userdetails.dateOfBirth,
                    email:response.data.userdetails.emailId,
                    city:response.data.userdetails.city,
                    state:response.data.userdetails.state,
                    pincode : response.data.pincode
                };
            // console.log("authtoken--->"+authToken)
           
       
                navigate('/customerDashboard/Policy', { state: datatoBeSend });
            }
        }
        else{
            alert("First login")
            navigate('/')
        }

    }
    // const calculateInterest = () => {

    //     const parsedNoOfYear = parseFloat(noOfYear);
    //     const parsedTotalInvestmentAmount = parseFloat(totalInvestmentAmount);
    //     const parsedPremiumType = parseFloat(premiumType);

    //     if (isNaN(parsedNoOfYear) || isNaN(parsedTotalInvestmentAmount) || isNaN(parsedPremiumType)) {

    //         console.error("Invalid input. Please enter valid numbers.");
    //         return;
    //     }

    //     const noOfInstallment = (parsedNoOfYear * 12) / parsedPremiumType;
    //     setInstallmentAmount(parsedTotalInvestmentAmount / noOfInstallment);

    //     const interest = (profitRatio / 100) * parsedTotalInvestmentAmount;
    //     setInterestAmount(interest);
        
    //     const sum = interest * parsedNoOfYear + parsedTotalInvestmentAmount;
    //     setTotalAmount(sum);
    // };

    const calculateInterest = () => {
        if (!noOfYear || !totalInvestmentAmount || !premiumType) {
            toast.error('Please enter all required fields.');
            return;
        }

        const parsedNoOfYear = parseFloat(noOfYear);
        const parsedTotalInvestmentAmount = parseFloat(totalInvestmentAmount);
        const parsedPremiumType = parseFloat(premiumType);

        if (isNaN(parsedNoOfYear) || isNaN(parsedTotalInvestmentAmount) || isNaN(parsedPremiumType)) {

            console.error("Invalid input. Please enter valid numbers.");
            return;
        }
        if (parsedNoOfYear < minTime || parsedNoOfYear > maxTime) {
            toast.error('Number of years should be between Min Policy Term and Max Policy Term.');
            return;
        }

        // Validate totalInvestmentAmount against min and max investment amount
        if (
            parsedTotalInvestmentAmount < minAmount ||
            parsedTotalInvestmentAmount > maxAmount
        ) {
            toast.error('Total Investment Amount should be between Min and Max Investment Amount.');
            return;
        }
        const noOfInstallment = (parsedNoOfYear * 12) / parsedPremiumType;
        setInstallmentAmount(parsedTotalInvestmentAmount / noOfInstallment);

        const interest = (profitRatio / 100) * parsedTotalInvestmentAmount;
        setInterestAmount(interest);

        const sum = interest * parsedNoOfYear + parsedTotalInvestmentAmount;
        setTotalAmount(sum);
        toast.success('Calculated successful!');
    };
   


  return (
    <>
    
        <h1 className='investment-heading' style={{textAlign:"center"}}>Investment Details</h1>
        <div className="investment-blur" style={{ background: "rgb(238 210 255)" }}></div>
        <form className='investment-postdata'>
            
            <div className='investment-form-group'>
                <label htmlFor="investmentAmount">Minimum Investment Amount *</label>
                <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    id="investmentAmount"
                    value={minAmount}
                
                    required
                />
            </div>
            <div className='investment-form-group'>
                <label htmlFor="investmentAmount">Maximum Investment Amount *</label>
                <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    id="investmentAmount"
                    value={maxAmount}
                    required
                />
            </div>
            <div className='investment-form-group'>
                <label htmlFor="minAge">Minimum Age *</label>
                <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    id="minAge"
                    value={minAge}
                    required
                />
            </div>
            <div className='investment-form-group'>
                <label htmlFor="maxAge">Maximum Age *</label>
                <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    id="maxAge"
                    value={maxAge}
                    onChange={(e) => setMaxAge(e.target.value)}
                    required
                />
            </div>
            <div className='investment-form-group'>
                <label htmlFor="minPolicyTerm">Minimum Policy Term *</label>
                <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    id="minPolicyTerm"
                    value={minTime}
                    onChange={(e) => setMinTime(e.target.value)}
                    required
                />
            </div>
            <div className='investment-form-group'>
                <label htmlFor="maxPolicyTerm">Maximum Policy Term *</label>
                <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    id="maxPolicyTerm"
                    value={maxTime}
                    onChange={(e) => setMaxTime(e.target.value)}
                    required
                />
            </div>
            <div className='investment-form-group'>
                <label htmlFor="profitRatio">Profit Ratio *</label>
                <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    id="profitRatio"
                    value={profitRatio}
                    onChange={(e) => setProfitRatio(e.target.value)}
                    required
                />
            </div>
        </form>

           
               
                

               
                <form className='investment-postdata'>
                    <h4 className='investment-heading' style={{ textAlign: "center" }}>Interest Calculate</h4>
                    <div className='investment-form-group'>
                        <label htmlFor="noOfYear">Number of year*</label>
                        <input

                            type="text"
                            className="form-control"
                            id="noOfYear"
                            value={noOfYear}
                            onChange={(e) => setNoOfYear(e.target.value)}

                            required
                        />
                    </div>
                    <div className='investment-form-group'>
                        <label htmlFor="totalInvestmentAmount">Total Investment Amount *</label>
                        <input

                            type="text"
                            className="form-control"
                            id="totalInvestmentAmount"
                            value={totalInvestmentAmount}
                            onChange={(e) => setTotalInvestmentAmount(e.target.value)}
                            required
                        />
                    </div>
                   
                    <div className="investment-form-group">
                        <label htmlFor="premiumType">
                            Premium Type{' '}
                        </label>
                        
                        <select
                            className="form-control"
                            id="premiumType"
                            value={premiumType}
                            onChange={(e) => setPremiumType(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                            Select Premium Type
                            </option>
                            <option value="1">Monthly</option>
                            <option value="3">Quarterly</option>
                            <option value="6">Half-Yearly</option>
                            <option value="12">Yearly</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "1rem" }}>
                        <button type="button" className="calculate-premium-button"onClick={calculateInterest} style={{  color: 'white', height:"1.9rem",}}
                       >
                            Calculate
                        </button>
                    </div>
                </form>

                
            

            <form className='investment-postdata'>
                <div className='investment-form-group'>
                    <label htmlFor="installmentAmount">Installment Amount*</label>
                    <input
                        disabled={true}
                        type="text"
                        className="form-control"
                        id="installmentAmount"
                        value={installmentAmount}
                        
                    
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
                        value={interestAmount}
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
                        value={totalAmount}
                       
                        required
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:"1rem"}}>
                    <button  className='buynow-button' type="button"  onClick={openPolicy} style={{  color: 'white', height:"2rem",}}
                       >
                        BuyNow
                    </button>
                </div>
                
            </form>
           


            {/* onClick={submitInvestmentDetails} */}
        </>
    )
}

export default PolicyDetails
