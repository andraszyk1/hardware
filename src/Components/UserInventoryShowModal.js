import React from "react";
import { Modal, Button } from 'react-bootstrap';

export default function UserInventoryShowModal({ show, close, userComputer }) {
  return (
    <Modal size="lg" dialogClassName="modal-dialog" show={show}>
      <Modal.Header>
        <Modal.Title><h5>Wyposażenie użytkownika</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userComputer.computerName}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={close}>
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
