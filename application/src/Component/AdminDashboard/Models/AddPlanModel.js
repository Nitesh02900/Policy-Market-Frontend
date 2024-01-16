import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import RegisterPlan from '../RegisterPlan/RegisterPlan';

const AddPlanModel = ({showAddPlanModal,AddPlanFunc}) => {
  
    const [show, setShow] = useState(showAddPlanModal);

    if (show !== showAddPlanModal) {
        setShow(showAddPlanModal);
        // console.log(value)
    }

    const handleClose = () => {
        setShow(false);
        AddPlanFunc();
    };

  
    return (
    <>
        <Modal
            show={showAddPlanModal}
            onHide={(handleClose)}
            size="lg" 
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
       

        <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto',backgroundColor:  "#f7f6f8" }}>
           <RegisterPlan/>
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
