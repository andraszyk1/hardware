import { useSelector, useDispatch } from 'react-redux';
import { fetchSystems, fetchUsers } from '../store';
import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, Alert,Row,Col } from 'react-bootstrap';
import Select from 'react-select';
import { useMsal } from "@azure/msal-react";
import { aplikacjeOptions,ComputersTypesOptions } from '../Lists';
function ComputerFormAdd({ show, close, handleAddSubmit }) {
  const { dataSystems, firstDataSystem } = useSelector((state) => { return state.systems })
  const { dataUsers, firstDataUser } = useSelector((state) => { return state.users })

  const dispatch = useDispatch();
  const { accounts } = useMsal()
  const [owner] = useState(accounts[0].username);
  const [errors, setErrors] = useState({ "computerName": "", "sn": "", "typ": "", "model": "" });
  const [computerName, setComputerName] = useState('');
  const [sn, setSn] = useState('');
  const [typ, setTyp] = useState('');
  const [model, setModel] = useState('');
  const [ram, setRam] = useState("");
  const [wartosc, setWartosc] = useState("");
  const [system_id, setSystem_id] = useState(parseInt(firstDataSystem));
  const [user_id, setUser_id] = useState(parseInt(firstDataUser));
  
  
  const [aplications, setAplications] = useState([aplikacjeOptions[0], aplikacjeOptions[2]]);
  useEffect(() => {
    dispatch(fetchSystems())
    dispatch(fetchUsers())
  }, [dispatch, firstDataSystem, firstDataUser])


  const checkLenghInput = (min, max, input,valueToCheck) => {
    if (valueToCheck.length > max) {
      const message = `Liczba znaków nie może przekroczyć ${max}`;
      setErrors((values) => ({ ...values, [input]: message }));
      return true;
    } else if (valueToCheck.length < min) {
      const message = `Liczba znaków nie może być mniejsza niż ${min}`;
      setErrors((values) => ({ ...values, [input]: message }));
      return true;
    }
    else {
      setErrors({});
      return false;
    }
  }
  const handleSubmit = (e) => {
    if (!checkLenghInput(1, 15,"computerName",computerName) && !checkLenghInput(1, 15, "sn",sn))
    {
      const computer = { computerName, sn, typ, model, ram: parseInt(ram), wartosc: parseInt(wartosc), system_id, user_id, owner,aplications };
      console.log(computer)
      handleAddSubmit(computer);
      close()
    }else{
      console.log(errors)
      return;
    }

  }

  let opsSystems = dataSystems.map((s) => { return { value: s.id, label: s.name } })
  let opsUsers = dataUsers.map((s) => { return { value: s.id, label: s.name + " " + s.surname } })

  return (
    <>

      <Modal show={show} size='lg'>
        <Modal.Header closeButton onClick={close}>
          <Modal.Title>Dodaj Sprzęt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
 
         
          <Form onSubmit={handleSubmit}>
          <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="Nazwa"
                name="computerName"
                onChange={(e) => setComputerName(e.target.value)}
                value={computerName}
                autoFocus
              />
            </Form.Group>
            {errors.computerName && <Alert>{errors.computerName}</Alert>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="SN"
                name="sn"
                onChange={(e) => setSn(e.target.value)}
                value={sn}
              />
            </Form.Group>
            {errors.sn && <Alert>{errors.sn}</Alert>}
          
            <Form.Group className="mb-3" controlId="typ">
              <Select options={ComputersTypesOptions} placeholder="Typ" defaultValue={typ} isSearchable={true} onChange={(e) => { setTyp(e.value) }} />
            </Form.Group>
            {errors.typError && <Alert>{errors.typError}</Alert>}
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Model"
                name="model"
                onChange={(e) => setModel(e.target.value)}
                value={model}
              />
            </Form.Group>
            {errors.modelError && <Alert>{errors.modelError}</Alert>}
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="Ram"
                name="ram"
                onChange={(e) => setRam(e.target.value)}
                value={ram}
                minLength={1}
                maxLength={3}
              />
            
            </Form.Group>
            </Col>
              <Col>
            {errors.ramError && <Alert>{errors.ramError}</Alert>}
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="Wartość"
                name="wartosc"
                onChange={(e) => setWartosc(e.target.value)}
                value={wartosc}
                minLength={3}
                maxLength={9}
              />
            </Form.Group>
            {errors.wartoscError && <Alert>{errors.wartoscError}</Alert>}
            <Form.Group className="mb-3" controlId="system">
              <Select options={opsSystems} placeholder="System" defaultValue={system_id} isSearchable={true} onChange={(e) => { setSystem_id(e.value) }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="uzytkownik">
              <Select options={opsUsers} placeholder="Użytkownik" defaultValue={user_id} isSearchable={true} onChange={e => setUser_id(e.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="aplikcaje">
              <Select isMulti options={aplikacjeOptions} placeholder="aplikacje" defaultValue={[aplikacjeOptions[0], aplikacjeOptions[2]]} isSearchable={true} onChange={(e) => {setAplications(v => e); console.log(e)}} />
            </Form.Group>
            </Col>
          </Row>
          
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

export default ComputerFormAdd;