import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import RegisterScheme from '../RegisterScheme/RegisterScheme';

const AddPlanModel = ({showAddSchemeModal,AddSchemeFunc,planId}) => {
  
    const [show, setShow] = useState(showAddSchemeModal);

    if (show !== showAddSchemeModal) {
        setShow(showAddSchemeModal);
        // console.log(value)
    }

    const handleClose = () => {
        console.log(planId)
        setShow(false);
        AddSchemeFunc();
    };

  
    return (
    <>
        <Modal
            show={showAddSchemeModal}
            onHide={(handleClose)}
            size="xl"  
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
       

        <Modal.Body style={{ maxHeight: '100vh', overflowY: 'auto',backgroundColor:  "#f7f6f8" }}>
            <RegisterScheme planId={planId}/>
        </Modal.Body >
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
          
        </Modal.Footer>
      </Modal>
    
    
    </>
  )
}

export default AddPlanModel
