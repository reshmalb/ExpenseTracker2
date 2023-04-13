import React,{useState} from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ProfileForm from './ProfileForm';

function MyVerticallyCenteredModal(props) {

    const [isProfile,setProfile]=useState(false);

    const profileClickHandler=()=>{
        setProfile(true)
    }
    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title"
       top
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
           Welcome to ExpenseTracker
            <span className='float-right'>
                <Button className='bg-whites-sm me-2' onClick={profileClickHandler}>
                    Your profile is incomplete Complete Now
                </Button></span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {isProfile &&(<ProfileForm/>)}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }




function Dashboard() {
    const [modalShow, setModalShow] = React.useState(true);

    return (
      <>       
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
}

export default Dashboard;