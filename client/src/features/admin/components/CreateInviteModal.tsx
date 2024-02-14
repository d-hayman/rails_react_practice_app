import { FaPlusCircle } from 'react-icons/fa';
import { createInvite } from '../../../shared/services/invites.service';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { listifyErrors } from '../../../shared/utils/responseHelpers';

function CreateInviteModal({callback}: {callback: Function}) {
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(false);

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorAlertBody, setErrorAlertBody] = useState<any>({});

    const handleShow = (e: any) => {
        e.preventDefault();
        setEmail('');
        setShowErrorAlert(false);
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleConfirm = async () => {
        if (!email)
            return;
        try {
            const response = await createInvite(email);
            if (response.ok) {
                setVisible(false);
                callback();
            } else {
                const json = await response.json();
                setErrorAlertBody(json);
                setShowErrorAlert(true);
            }
        } catch (e) {
            setErrorAlertBody({error: `${e}`});
            setShowErrorAlert(true);
            console.error("Failed to create invite: ", e);
        }
    };

    return (
        <>
        <Button variant="info" onClick={handleShow}><FaPlusCircle/></Button>

        <Modal
            show={visible}
            onHide={handleCancel}
            backdrop="static"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body 
                onKeyDown={(e) => {
                    if (e.code === "Enter") {
                    e.preventDefault();
                    handleConfirm();
                    }
                }}>
            { showErrorAlert &&
            <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <ul>{listifyErrors(errorAlertBody)}</ul>
            </Alert>}
            <Form>
                <Form.Group className="mb-3" controlId="emailInput">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default CreateInviteModal;