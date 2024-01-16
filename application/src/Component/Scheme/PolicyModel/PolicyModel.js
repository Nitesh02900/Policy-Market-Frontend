import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import PolicyDetails from '../PolicyDetails/PolicyDetails';



const PolicyModel = ({showDetailsModal,togglePlanDetails,data,schemeId}) => {

    // const [value,setValue] =useState(data)
    const [show, setShow] = useState(showDetailsModal);

    if (show !== showDetailsModal) {
        setShow(showDetailsModal);
        // console.log(value)
    }

    const handleClose = () => {
        setShow(false);
        togglePlanDetails();
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
        

        <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto',backgroundColor:  "#f7f6f8" }}>
            {/* {console.log( data) && <PolicyDetails value={data}/>} */}
            <PolicyDetails value={data} schemeId={schemeId}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} style={{ backgroundColor: 'rgb(34, 52, 100)', color: 'white', height:"2.5rem",width:'5rem'}} >
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    
    
   
   </>
  )
}

export default PolicyModel
