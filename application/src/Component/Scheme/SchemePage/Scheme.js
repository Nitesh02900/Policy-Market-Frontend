import React, {useState} from 'react'
import logo1 from '../../../Image/Insurance-pana.svg'
import './Scheme.css'
import PolicyModel from '../PolicyModel/PolicyModel';
import { getSchemeDetails } from '../../../Service/SchemeService';

const Scheme = () => {

    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const[scheme,setScheme]=useState();
    const [schemeId, setSchemeId] = useState();


    const getSchemes = async (manualSchemeId) => {
        try {
            setSchemeId(manualSchemeId)
            let response = await getSchemeDetails(manualSchemeId);
            console.log("response-->", response);
            if (response.data) {
                setScheme(response.data);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    
    
    // }
    // const togglePlanDetails = () => {
       
    //   setShowDetailsModal(!showDetailsModal);
    //   getSchemes();
    // };
    const togglePlanDetails = (manualSchemeId) => {
        console.log("manualSchemeID--->", manualSchemeId);
    
    
        setShowDetailsModal(!showDetailsModal);
        if(!showDetailsModal){
        getSchemes(manualSchemeId);
        }
    };
    
    


  return (
    <>
        <div className='scheme-main'>
            <div className="scheme scheme-header">
                <div className="scheme-container">
                    <div className="scheme-row">
                        <div className="scheme-page-left">
                            <h2 className="scheme-text-title">Life Insurance</h2>
                            {/* <h1 className="scheme-text-title">The need of the hour</h1> */}
                            <p className="scheme-text-description">Life insurance is not about the end; it's about ensuring that the ones you love have the strength to face a new beginning when you're no longer there. It's a promise of financial security, a legacy of love that transcends time.</p>
                        
                        </div>
                        <div className="scheme-page-right">
                            <img  src={logo1} alt="asd" className="scheme-image d-lg-block d-none"/>
                            <div className="white-space"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='insurance-plan-scheme' >
                <div className='insurance-plan-content'>
                    <div className='insurance-scheme-details'>
                        <div  className='insurance-scheme-text'>
                            <h2 className="insurance-scheme-subtitle">Type of Scheme in Life Insurance</h2>
                    
                            <h3> 1 year Term Life Insurance</h3>
                            <div className='insurance-scheme-subtext'>
                                <p>A 1-Year Term Life Insurance offers insurance coverage for just one year. The policyholder can then choose to renew the policy at the end of the policy term, as opposed to a Term Insurance plan wherein the policyholder is committed to renewing the policy on a yearly basis in order to keep the policy active.</p>
                            </div>
                            <div className='insurance-scheme-list'>
                                <h6> <b>Eligibility Criteria:</b> </h6>
                                <li className='List-of-details'>
                                    <p><b>Minimum Age:</b> Typically, individuals between the ages of 18 and 65 are eligible.</p>
                                </li> 
                                <li className='List-of-details'>
                                    <p><b>Maximum Age:</b> The coverage may expire when the insured reaches a certain age, often 65 years.</p>
                                    
                                </li>
                            </div>
                            <div className='insurance-scheme-list'>
                                <h6> <b>Coverage Amount:</b> </h6>
                                <li className='List-of-details'>
                                    <p><b>Minimum Coverage:</b> Insurers may set a minimum coverage amount, often starting from ₹5,00,000.</p>
                                </li> 
                                <li className='List-of-details'>
                                    <p><b>Maximum Coverage:</b> There is usually a maximum limit on the coverage amount, depending on the insurer.</p>
                                    
                                </li>
                            </div>
                            <div className='insurance-scheme-list'>
                                <h6> <b>Policy Term:</b> </h6>
                                <li className='List-of-details'>
                                    <p><b>Minimum Age:</b> Typically, individuals between the ages of 18 and 65 are eligible.</p>
                                </li> 
                                <li className='List-of-details'>
                                    <p><b>Maximum Age:</b> The coverage may expire when the insured reaches a certain age, often 65 years.</p>
                                    
                                </li>
                            </div>
                            <div className='insurance-scheme-list'>
                                <h6> <b>Premium Payments:</b> </h6>
                                <li className='List-of-details'>
                                    <p><b>Minimum Age:</b> Typically, individuals between the ages of 18 and 65 are eligible.</p>
                                </li> 
                                <li className='List-of-details'>
                                    <p><b>Maximum Age:</b> The coverage may expire when the insured reaches a certain age, often 65 years.</p>
                                    
                                </li>
                            </div>
                            <div className='insurance-scheme-list'>
                                <h6> <b>Renewal:</b> </h6>
                                <li className='List-of-details'>
                                    <p><b>Minimum Age:</b> Typically, individuals between the ages of 18 and 65 are eligible.</p>
                                </li> 
                                <li className='List-of-details'>
                                    <p><b>Maximum Age:</b> The coverage may expire when the insured reaches a certain age, often 65 years.</p>
                                    
                                </li>
                            </div>
                            <button className='plan-details-button' type="button" onClick={()=>togglePlanDetails(1) } style={{ backgroundColor: 'rgb(34, 52, 100)', color: 'white', height:"3rem",}}
                       >

                                Plan details...
                            </button>
                                  
                        </div>
                        
                    </div>
                </div>
             </div>

             {showDetailsModal && (
            <PolicyModel showDetailsModal={showDetailsModal} togglePlanDetails={togglePlanDetails} data={scheme} schemeId={schemeId}/>
            )}




        </div>
    
    
    
    
    </>
  )
}

export default Scheme
