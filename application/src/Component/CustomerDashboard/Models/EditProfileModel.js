import React from 'react'
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import EditProfile from '../EditProfile/EditProfile';


const EditProfileModel = ({isOpen,toggleEditProfileModel}) => {
    const handleClose = () => {
        toggleEditProfileModel();
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

export default EditProfileModel
