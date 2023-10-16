import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({ show, onClose, onConfirm, item }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "18px" }}>
          Confirm Status Change
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to change the status to{" "}
        {item?.Status === false ? "Fixed" : "Not Fixed"}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          style={{ backgroundColor: "#9fc856", borderColor: "#9fc856" }}
          onClick={() => {
            onConfirm(item.status);
            onClose();
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
