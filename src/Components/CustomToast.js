import React from 'react';
import { Button, Toast } from 'react-bootstrap';

export default function CustomToast({ showToast, msg, closeToast }) {

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        left: '0px',
        position: 'absolute',
        minHeight: '100px',
      }}
    >
      <Toast
        autohide
        show={showToast}
        delay={2200}
        style={{
          position: 'fixed',
          top: '2%',
          right: '2%',
        }}
      >
        <Toast.Body>{msg}   <Button variant='light' size='sm' onClick={closeToast}>Zamknij</Button></Toast.Body>
      </Toast>
    </div>

  )
}