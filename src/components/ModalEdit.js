import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import MvtForm from "./Form";

const MvtModalEdit = ({ balance, mvt, editMvt }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const hideModal = () => {
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <MdEdit />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MvtForm
            balance={balance}  
            editMvt={editMvt}  
            editedMvt={mvt}  
            hideModal={hideModal}  
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MvtModalEdit;
