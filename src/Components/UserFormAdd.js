import { useDispatch } from 'react-redux';
import {addUser} from '../store'
import React,{useState} from 'react';
import { Form,Modal,Button, Alert } from 'react-bootstrap';
import { useMsal } from "@azure/msal-react";

function UserFormAdd({show,close}){
    const dispatch=useDispatch();
    const {accounts}=useMsal()
    const [owner]=useState(accounts[0].username);
    const [userNameError, setUserNameError] = useState("");
    const [inputs, setInputs] = useState({ name:"",login:"",email:"",rcp:"",dzial:"",owner});


 
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value,owner}));
       
    }

    const handleSubmit = (e) => {
      // const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
      const namePattern = /^(?=.*[a-zA-Z])/;
      if (!namePattern.test(inputs.name)) {
        setUserNameError("Pole musi zawierać conajmniej 1 literę");
        return;
      }
      dispatch(addUser(inputs))
      close()
      }
    return (
    <>
    <Modal show={show}>
        <Modal.Header closeButton onClick={close}>
          <Modal.Title>Dodaj użytkownika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Imię Nazwisko"
                name="name"
                onChange={handleChange}
                value={inputs.name}
                autoFocus
              />
            </Form.Group>
            {userNameError && <Alert>{userNameError}</Alert>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Login"
                name="login"
                onChange={handleChange}
                value={inputs.login}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={inputs.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Dział"
                name="dzial"
                onChange={handleChange}
                value={inputs.dzial}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder="Rcp"
                value={inputs.rcp}
                name="rcp"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                hidden={true}
                type="text"
                placeholder="Owner"
                value={owner}
                disabled={true}
                name="owner"
              />
            </Form.Group>
       
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={close}>
            Zamknij
          </Button>
          <Button type='submit' variant="light" onClick={handleSubmit}>
            Dodaj
          </Button>
        </Modal.Footer>
      </Modal>
    
        </>
    )
}

export default UserFormAdd;