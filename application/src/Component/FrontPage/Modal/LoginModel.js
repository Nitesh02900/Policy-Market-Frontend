import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import Login from '../../Login/Login';


const LoginModel = ({ showLoginModal, toggleLoginModal }) => {
    const [show, setShow] = useState(showLoginModal);

    if (show !== showLoginModal) {
        setShow(showLoginModal);
    }

    const handleClose = () => {
        setShow(false);
        toggleLoginModal();
    };




  return (
    <>
         <Modal
        show={show}
        onHide={(handleClose)}
        size="lg" 
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        
       
      >
        {/* <Modal.Header closeButton> */}
          {/* <Modal.Title id="example-custom-modal-styling-title">
           
          </Modal.Title> */}
        {/* </Modal.Header> */}

        {/* <Modal.Backdrop  /> */}

        <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto',backgroundColor:  "#f7f6f8" }}>
          <Login/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    
    
    
    
    </>
  )
}

export default LoginModel
