import { useState } from 'react';
import { deleteArticle } from '../shared/services/articles.service';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeletionModal({ article, callback }: { article: any, callback:any }) {
    const [visible, setVisible] = useState(false);

    const handleShow = (e: any) => {
        e.preventDefault();
        setVisible(true);
    };

    const handleConfirm = () => {
        doDeleteArticle();
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const doDeleteArticle = async () => {
        if (article === null)
            return;
        try {
            await deleteArticle(article.id);
            if(typeof callback === "function") {
                callback();
            }
        } catch (e) {
            console.error("Failed to delete the article: ", e);
        }
    };

    return (
        <>
            <Button variant="danger" onClick={handleShow}>Delete</Button>

            <Modal
                show={visible}
                onHide={handleCancel}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Delete {article?.title}</Modal.Title>
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
