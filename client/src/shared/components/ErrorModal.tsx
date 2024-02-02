import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";

function ErrorModal({ visible=false, headerText, bodyText, setVisible }
    :{visible?:boolean, headerText:string, bodyText:string, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) {

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <Modal
            show={visible}
            onHide={handleCancel}
            backdrop="static"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>{headerText}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-danger'>{bodyText}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ErrorModal;