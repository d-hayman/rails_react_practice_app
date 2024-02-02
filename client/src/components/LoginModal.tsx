import { useState } from 'react';
import { login } from '../shared/services/auth.service';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginModal() {
    const [visible, setVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [validLogin, setValidLogin] = useState(true);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleShow = (e: any) => {
        e.preventDefault();
        setShowPassword(false);
        setValidLogin(true);
        setUsername('');
        setPassword('');
        setVisible(true);
    };

    const handleConfirm = () => {
        doLogin();
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const doLogin = async () => {
        if (!username || !password)
            return;
        try {
            const success = await login(username, password);
            if (success) {
                setVisible(false);
            } else {
                setValidLogin(false);
            }
        } catch (e) {
            console.error("Failed to delete the article: ", e);
        }
    };

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>Login</Button>

            <Modal
                show={visible}
                onHide={handleCancel}
                backdrop="static"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="usernameInput">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="passwordInput">
                        <Form.Label>Password:</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            <Button onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash/> : <FaEye/>}
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Form.Text hidden={validLogin} className='text-danger'>Incorrect username or password</Form.Text>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
;

export default LoginModal;
