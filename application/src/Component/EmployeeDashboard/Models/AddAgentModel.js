import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import RegisterAgent from '../RegisterAgent/RegisterAgent';


const AddAgentModel = ({showAgentRegistrationModal, toggleAgentRegistrationModal}) => {
    const [show, setShow] = useState(showAgentRegistrationModal);

    if (show !== showAgentRegistrationModal) {
        setShow(showAgentRegistrationModal);
    }

    const handleClose = () => {
        setShow(false);
        toggleAgentRegistrationModal();
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
                <RegisterAgent/>
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

export default AddAgentModel
