import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ZestawModal({show,closeZestawModal,zestaw}) {
    const [title, setTitle] = useState(zestaw.title);
    const [autor, setAutor] = useState(zestaw.autor);
    const [content, setContent] = useState(zestaw.content);
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSubmit");
        closeZestawModal();
      }

  return (
    <>
 
    <Modal show={show} onHide={closeZestawModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edytuj Zestaw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
      
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="content"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="autor"
                value={autor}
                onChange={(e)=>setAutor(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label></Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeZestawModal}>
            Close
          </Button>
          <Button type='submit' variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ZestawModal;