import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import Register from '../../Resgister/Register';

const RegisterModel = ({ showRegistrationModal, toggleRegistrationModal}) => {

    const [show, setShow] = useState(showRegistrationModal);

    if (show !== showRegistrationModal) {
        setShow(showRegistrationModal);
    }

    const handleClose = () => {
        setShow(false);
        toggleRegistrationModal();
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

        <Modal.Body  >
          <Register/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    
    </>
  )
}

export default RegisterModel
