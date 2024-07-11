import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PrestationModalCarousel from "./PrestationModalCarousel";

// PrestationsModal leverages react-bootstrap for modal presentation, focusing on a clean, centered layout.
// It dynamically displays content related to a specific prestation, including a carousel of images via PrestationModalCarousel.
// Modal appearance is customized with Bootstrap classes for a consistent, theme-aligned UI.
// Props are efficiently passed to control visibility and content, ensuring modularity and reusability.
// The modal is designed for a large (lg) size view, with rounded corners for a modern look.
// Accessibility is addressed with aria labels.
// The close button is styled for clear user action, enhancing UX.
export default function PrestationsModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName="rounded"
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
        <Button className="btn-danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
