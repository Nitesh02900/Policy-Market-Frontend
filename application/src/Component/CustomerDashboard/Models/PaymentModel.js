import React from 'react'
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import PaymentForm from '../PaymentForm/PaymentForm';


const PaymentModel = ({ isOpen, onClose, paymentDetails }) => {

    const handleClose = () => {
        onClose();
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
            {/* <Querypage/> */}
            <PaymentForm paymentDetails={paymentDetails} />
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

export default PaymentModel
