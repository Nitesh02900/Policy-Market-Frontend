import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditProfile from '../EditProfile/EditProfile';

const EmployeeEditProfileModel = ({isOpen,toggleEmployeeEditProfileModel}) => {
 
  const handleClose = () => {
    toggleEmployeeEditProfileModel();
};
  return (
   <>
      <Modal
            show={isOpen}
            onHide={(handleClose)}
            size="lg" 
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
       

        <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto',backgroundColor:  "#f7f6f8" }}>
           <EditProfile/>
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

export default EmployeeEditProfileModel
