import { useDispatch } from 'react-redux';
import {updateUser} from '../store'
import React,{useState} from 'react';
import { Form,Modal,Button,Alert } from 'react-bootstrap';
import { useMsal } from "@azure/msal-react";
export default function UserFormEdit({show,close,user}){
  const { accounts } = useMsal()
  const [updater] = useState(accounts[0].username);
    const [nameError, setNameError] = useState("");
    const dispatch=useDispatch();
 
    const [inputs, setInputs] = useState({
      name:user.name,
      login:user.login,
      rcp:user.rcp,
      dzial:user.dzial,
      email:user.email,
      id:user.id
      });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value,id:user.id,updater}));
    }

    const handleSubmit = (e) => {
      const NamePattern = /^(?=.*[a-zA-Z])/;
      if (!NamePattern.test(inputs.name)) {
        setNameError("Pole musi zawierać conajmniej 1 literę");
        return;
      }
      console.log(inputs)
      dispatch(updateUser(inputs))
    
      close()
      }
    
     
  return (
    <>
    <Modal show={show}>
        <Modal.Header closeButton onClick={close}>
          <Modal.Title>Edytuj</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            {nameError && <Alert>{nameError}</Alert>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                name="login"
                onChange={handleChange}
                value={inputs.login}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                name="email"
                onChange={handleChange}
                value={inputs.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                name="dzial"
                onChange={handleChange}
                value={inputs.dzial}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Rcp"
                onChange={handleChange}
                value={inputs.rcp}
                name="rcp"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={close}>
            Close
          </Button>
          <Button type='submit' variant="success" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
        </>
    )
}

