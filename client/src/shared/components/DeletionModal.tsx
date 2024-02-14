import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeletionModal({ title, id, deletion, callback }: { title: string, id: string, deletion: Function, callback:any }) {
    const [visible, setVisible] = useState(false);

    const handleShow = (e: any) => {
        e.preventDefault();
        setVisible(true);
    };

    const handleConfirm = () => {
        doDelete();
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const doDelete = async () => {
        try {
            await deletion(id);
            if(typeof callback === "function") {
                callback();
            }
        } catch (e) {
            console.error("Failed to delete: ", e);
        }
    };

    return (
        <>
            <Button variant="danger" onClick={handleShow}>Delete</Button>

            <Modal
                show={visible}
                onHide={handleCancel}
                backdrop="static"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to Delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
;

export default DeletionModal;
