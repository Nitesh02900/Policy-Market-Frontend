import React from 'react'
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import Querypage from '../QueryPage/Querypage';


const QueryModel = ({isOpen,toggleQueryModel}) => {

    // const [show, setShow] = useState(isQueryModalOpen);

    // if (show !== isQueryModalOpen) {
    //     setShow(isQueryModalOpen);
    //     // console.log(value)
    // }

    // const handleClose = () => {
    //     setShow(false);
    //     toggleQueryModel();
    // };

    const handleClose = () => {
        toggleQueryModel();
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
            <Querypage/>
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

export default QueryModel
