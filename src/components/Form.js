import React, { useState, useRef } from "react";
import {
  Form,
  Button,
  Card,
  InputGroup,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import MvtModal from "./Modal";
import { v4 as uuidv4 } from "uuid";

const MvtForm = ({ balance, addMvt, editMvt, editedMvt, hideModal }) => {
   
  const childRef = useRef();

   
  const [mvt, setMvt] = useState({
    id: editedMvt?.id ?? "",
    typeMvt: editedMvt?.typeMvt ?? "Ingreso",
    name: editedMvt?.name ?? "",
    qty: editedMvt?.qty ?? 0,
  });

   
  const handleInputChange = (e) => {
    setMvt({ ...mvt, [e.target.name]: e.target.value });  
  };

  const handleInputQtyChange = (e) => {
    setMvt({ ...mvt, qty: parseFloat(e.target.value) });  
  };

   
  const handleCancelClick = (e) => {
    setMvt({ ...mvt, typeMvt: "Ingreso", name: "", qty: 0 });  
  };

   
  const handleSubmit = (e) => {
    e.preventDefault();

     
    let validationErrors = "";

    if (!mvt.name.trim()) {
      validationErrors += " - El nombre es obligatorio.";
    }

    if (mvt.qty <= 0) {
      validationErrors += " - La cantidad debe ser mayor que cero.";
    }

    if (
      mvt.typeMvt === "Egreso" &&
      parseFloat(mvt.qty) > parseFloat(balance.finalBalance)
    ) {
      validationErrors +=
        " - No cuenta con el suficiente saldo para realizar este movimiento.";
    }

    if (validationErrors.trim() !== "") {
       
       

      childRef.current.showMessageModal("Error", validationErrors);  
    } else {
       
       

      if (editedMvt) {
         
         

        editMvt(mvt);  
        hideModal();
      } else {
         
         

        addMvt({ ...mvt, id: uuidv4() });  
      }

      setMvt({ ...mvt, typeMvt: "Ingreso", name: "", qty: 0 });  

      childRef.current.showMessageModal(
        "Exito",
        "Registro guardado correctamente."
      );
    }
  };

  return (
    <Card>
      <Card.Header>Registro</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mt-2">
            <Form.Label column sm="5">
              Tipo de Movimiento:
            </Form.Label>
            <Col sm="6">
              <Form.Control
                as="select"
                name="typeMvt"
                onChange={handleInputChange}
                value={mvt.typeMvt}
              >
                <option>Ingreso</option>
                <option>Egreso</option>
              </Form.Control>
            </Col>

            <Form.Label column sm="5" className="mt-4">
              Nombre:
            </Form.Label>
            <Col sm="6">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="mt-4">N</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  sm="5"
                  className="mt-4"
                  aria-label="Amount (to the nearest dollar)"
                  name="name"
                  value={mvt.name}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Col>

            <Form.Label column sm="5" className="mt-4">
              Cantidad:
            </Form.Label>
            <Col sm="6">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="mt-4">$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  sm="5"
                  className="mt-4"
                  aria-label="Amount (to the nearest dollar)"
                  type="number"
                  name="qty"
                  value={mvt.qty}
                  onChange={handleInputQtyChange}
                />
              </InputGroup>
            </Col>
          </Form.Group>
          <Button
            className="ml-5"
            variant="secondary"
            onClick={handleCancelClick}
          >
            Cancelar
          </Button>
          <MvtModal ref={childRef} />
          <Button className="ml-5" variant="primary" type="submit">
            {editedMvt ? "Editar Movimiento" : "Agregar Movimiento"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MvtForm;
