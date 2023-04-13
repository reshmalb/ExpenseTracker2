import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
function Dashboard() {
    return(

    
<div
      className="modal show"
      style={{ display: 'block',
       position: 'initial',
       width:"100 %",
       height:"100%",
     }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to Expense Tracker</Modal.Title>
          <p>haiiiii</p>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
    )
}

export default Dashboard;