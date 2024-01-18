import React, { useState } from 'react';
import { API_URL } from '../constants';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeletionModal({ article, callback }: { article: any, callback:any }) {
    const [visible, setVisible] = useState(false);

    const handleShow = (e: any) => {
        e.preventDefault();
        setVisible(true);
    };

    const handleConfirm = () => {
        deleteArticle();
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const deleteArticle = async () => {
        if (article === null)
            return;
        try {
            const response = await fetch(`${API_URL}/${article.id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                if(typeof callback === 'function'){
                    callback();
                }
            } else {
                throw response;
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <button onClick={handleShow}>Delete</button>

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
