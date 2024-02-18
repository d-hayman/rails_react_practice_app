import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes, {InferProps} from "prop-types";

const deleteModalPropTypes = {
    title: PropTypes.string.isRequired, 
    parent: PropTypes.string, 
    id: PropTypes.string.isRequired, 
    deletion: PropTypes.func.isRequired, 
    callback:PropTypes.func
};

type deleteModalTypes = InferProps<typeof deleteModalPropTypes>;

function DeletionModal({ title, parent, id, deletion, callback }: deleteModalTypes) {
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
            if(parent !== undefined)
                await deletion(parent, id);
            else
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
            <Button variant="outline-danger" onClick={handleShow}>Delete</Button>

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
