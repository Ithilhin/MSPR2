import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PrestationModalCarousel from './PrestationModalCarousel';

export default function PrestationsModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName='rounded'
      
    >
      <Modal.Header className="bg-primary rounded-top">
        <Modal.Title id="contained-modal-title-vcenter" className="text-white">
          {props.prestation}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PrestationModalCarousel prestation={props.prestation} />
      </Modal.Body>
      <Modal.Footer className="bg-primary rounded-bottom">
        <Button className="btn-danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

