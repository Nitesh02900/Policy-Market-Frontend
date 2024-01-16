import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Email from '../AgentEmail/Email';

const MarketingModel = ({showMarketingModal, toggleMarketingModal}) => {
  const [show, setShow] = useState(showMarketingModal);

  if (show !== showMarketingModal) {
    setShow(showMarketingModal);
}

const handleClose = () => {
    setShow(false);
    toggleMarketingModal();
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
        

        <Modal.Body style={{ height: '80vh', overflowY: 'auto',backgroundColor:  "#f7f6f8" }}>
           <Email/>
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

export default MarketingModel
