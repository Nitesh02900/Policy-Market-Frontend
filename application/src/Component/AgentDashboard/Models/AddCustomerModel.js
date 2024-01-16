import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import RegisterCustomer from '../RegisterCustomer/RegisterCustomer';
const AddCustomerModel = ({showCustomerRegistrationModal, toggleCustomerRegistrationModal}) => {
    const [show, setShow] = useState(showCustomerRegistrationModal);

    if (show !== showCustomerRegistrationModal) {
        setShow(showCustomerRegistrationModal);
    }

    const handleClose = () => {
        setShow(false);
        toggleCustomerRegistrationModal();
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
        

        <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto',backgroundColor:  "#f7f6f8" }}>
           <RegisterCustomer/>
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

export default AddCustomerModel
