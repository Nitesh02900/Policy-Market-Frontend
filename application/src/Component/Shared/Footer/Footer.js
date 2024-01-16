import React from 'react'

const Footer = () => {
  return (
    <>
         <div>
            <footer className='footer-Container'>
                <div className="footer-column-1">
                    <div className='footer-left-element' id="Contact-Us">
                        <h2>Contact Us</h2>
                        <div className="contact-info">
                            <div ><i class="ri-mail-fill" style={{marginRight:"1rem"}}></i>Email: contact@example.com</div>
                            <div>< i class="ri-phone-fill" style={{marginRight:"1rem"}}></i>Phone: +123 456 789</div>
                        </div>
                    </div>
                    <div className='footer-right-element' id="About-Us">

                        <h2>Useful Link</h2>
                        <div className='support-link'>
                            <a className='footer-a' href="#">Policy</a>
                            <a className='footer-a' href="#">Plan</a>
                            <a className='footer-a' href="#">Query</a>
                            <a className='footer-a' href="#">Info</a>
                      
                       
                        </div>
                    </div>
                </div>

                <div className="footer-column-2">
                    <h2>About Us</h2>
                    <p>  Insurance plans compensate for the financial risks that you suffer in unforeseen contingencies and provide financial security.Sometimes you might suffer an unforeseen loss.
                         Insurance plans act as an umbrella during such times and protect you financially.
                         If you insure your losses, the insurance policy shoulders the financial burden of such losses, whenever they may occur. This safeguards your savings, allowing you to use them for their intended purposes, i.e., meeting your financial goals.</p>
               
                </div>
            </footer>

        </div>
    </>
  )
}

export default Footer
