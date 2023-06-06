import { useSelector, useDispatch } from 'react-redux';
import { fetchSystems, fetchUsers } from '../store'
import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, Alert, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import { useMsal } from "@azure/msal-react";
import useThunk from '../Hooks/useThunk';
import PlaceAnimation from './PlaceAnimation';
import { aplikacjeOptions } from '../Lists';
function ComputerFormEdit({ show, close, computer, handleEditSubmit }) {
  const { accounts } = useMsal()
  const [updater] = useState(accounts[0].username);
  const [doFetchSystems, isLoadingSystems, isErrorSystems] = useThunk(fetchSystems);
  const [doFetchUsers, isLoadingUsers, isErrorUsers] = useThunk(fetchUsers);
  const { dataSystems } = useSelector((state) => { return state.systems })
  const { dataUsers } = useSelector((state) => { return state.users })
  const dataComputerById = useSelector(state => state.computers.dataComputers.find(c => c.computer_id === computer.computer_id))
  const [computerNameError, setComputerNameError] = useState("");
  const [computerName, setComputerName] = useState(dataComputerById.computerName);
  const [typ, setTyp] = useState(dataComputerById.typ);
  const [model, setModel] = useState(dataComputerById.model);
  const [ram, setRam] = useState(dataComputerById.ram);
  const [wartosc, setWartosc] = useState(dataComputerById.wartosc);
  const [sn, setSn] = useState(dataComputerById.sn);
  const [system_id, setSystem_id] = useState(dataComputerById.system_id);
  const [user_id, setUser_id] = useState(parseInt(dataComputerById.user_id));
  const [aplications, setAplications] = useState(JSON.parse(dataComputerById.aplications));
  const dispatch = useDispatch();
  useEffect(() => {
    doFetchSystems();
    doFetchUsers();

  }, [dispatch])


  const handleSubmit = (e) => {
    console.log(aplications)
    const computerNamePattern = /^(?=.*[a-zA-Z])/;
    if (!computerNamePattern.test(computerName)) {
      setComputerNameError("Pole musi zawierać conajmniej 1 literę");

      return;
    }
    const computerToUpdate = { computerName, sn, typ, model, ram: parseInt(ram), wartosc: parseInt(wartosc), system_id, user_id, updater, computer_id: parseInt(dataComputerById.computer_id), aplications };
    handleEditSubmit(computerToUpdate);
    close();
  }
  let firstSystem = [], opsSystems, contentSystems;
  if (isLoadingSystems) {
    contentSystems = <PlaceAnimation times={1} />
  } else if (isErrorSystems) {
    contentSystems = "error...";
  } else {
    opsSystems = dataSystems.map((s) => { return { value: s.id, label: s.name } })
    firstSystem = opsSystems.filter(s => s.value === parseInt(dataComputerById.system_id));
    contentSystems = <Form.Group className="mb-3" controlId="2">
      <Form.Label>System</Form.Label>
      <Select options={opsSystems} defaultValue={firstSystem[0]} isSearchable={true} onChange={(e) => { setSystem_id(e.value) }} />
    </Form.Group>
  }
  let firstUser = [], opsUsers, contentUsers;
  if (isLoadingUsers) {
    contentUsers = <PlaceAnimation times={1} />
  } else if (isErrorUsers) {
    contentUsers = "error...";
  } else {
    opsUsers = dataUsers.map((s) => { return { value: s.id, label: s.name + " " + s.rcp } })
    firstUser = opsUsers.filter(s => s.value === dataComputerById.user_id);
    contentUsers = <Form.Group className="mb-3" controlId="2">
      <Form.Label>Użytkownik</Form.Label>
      <Select options={opsUsers} defaultValue={firstUser[0]} isSearchable={true} onChange={(e) => { setUser_id(e.value) }} />
    </Form.Group>
  }

  return (
    <>
      <Modal show={show} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton onClick={close}>
          <Modal.Title>Edytuj</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" >
                  <Form.Label>Nazwa</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nazwa"
                    name="computerName"
                    value={computerName || ''}
                    onChange={(e) => setComputerName(e.target.value)}
                    autoFocus
                  />
                  {computerNameError && <Alert>{computerNameError}</Alert>}
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Serial Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Serial Number"
                    name="sn"
                    value={sn || ''}
                    onChange={(e) => setSn(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Typ</Form.Label>
                  <Form.Control type="text" placeholder="Typ"
                    name="typ"
                    onChange={(e) => setTyp(e.target.value)}
                    value={typ || ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Model</Form.Label>
                  <Form.Control type="text" placeholder="Model"
                    name="model"
                    onChange={(e) => setModel(e.target.value)}
                    value={model || ''}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Ram</Form.Label>
                  <Form.Control type="text" placeholder="Ram"
                    name="ram"
                    onChange={(e) => setRam(e.target.value)}
                    value={ram || ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Wartość</Form.Label>
                  <Form.Control type="text" placeholder="Wartość"
                    name="wartosc"
                    onChange={(e) => setWartosc(e.target.value)}
                    value={wartosc || ''}
                  />
                </Form.Group>
                <Form.Label>Aplikacje</Form.Label>
                <Form.Group className="mb-3" controlId="3">
                  <Select isMulti options={aplikacjeOptions} placeholder="aplikacje" defaultValue={aplications} isSearchable={true} onChange={(e) => { setAplications(v => e); console.log(e) }} />
                </Form.Group>

                {contentSystems}
                {contentUsers}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={close}>
            Zamknij
          </Button>
          <Button type='submit' variant="light" onClick={handleSubmit}>
            Zapisz          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default ComputerFormEdit;