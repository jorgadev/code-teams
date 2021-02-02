import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Modal, Button, Form } from "react-bootstrap";

function handleSubmit() {}

function membersChangeHandler(e) {
  if (e.key === ",") {
    console.log(e.target.value);
  }
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a Team
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group id="team-name">
            <Form.Label>Team Name</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>
          <Form.Group id="members">
            <Form.Label>Members</Form.Label>
            <Form.Control
              as="textarea"
              onKeyPress={(e) => membersChangeHandler(e)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Create</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default function CreateTeam() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div
        className="CreateTeam d-flex justify-content-center align-items-center"
        onClick={() => setModalShow(true)}
      >
        <AddIcon className="add-icon" />
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
