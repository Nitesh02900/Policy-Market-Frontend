import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ResgisterEmployee from '../RegisterEmployee/ResgisterEmployee';

const AddEmoplyeeModel = ( {showAdminRegistrationModal, toggleAdminRegistrationModal}) => {

    const [show, setShow] = useState(showAdminRegistrationModal);
   if (show !== showAdminRegistrationModal) {
        setShow(showAdminRegistrationModal);
    }

    const handleClose = () => {
        setShow(false);
        toggleAdminRegistrationModal();
    };



  return (
    
    <>
        <Modal
        show={show}
        onHide={(handleClose)}
        size="xl" 
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        >
        <Modal.Body style={{ maxHeight: '90vh', overflowY: 'auto',backgroundColor:  "#f7f6f8" }}>
           <ResgisterEmployee/>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary"onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
        </Modal>
    
    
    
    </>
  )
}

export default AddEmoplyeeModel
