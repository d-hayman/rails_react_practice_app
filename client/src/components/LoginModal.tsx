import { useState } from 'react';
import { login, logout } from '../shared/services/auth.service';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, InputGroup, Stack } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginModal() {
    const [modalVisible, setModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [validLogin, setValidLogin] = useState(true);

    const [loggedInAs, setLoggedInAs] = useState(localStorage.getItem("loggedInAs")??'');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleShow = (e: any) => {
        e.preventDefault();
        setShowPassword(false);
        setValidLogin(true);
        setUsername('');
        setPassword('');
        setModalVisible(true);
    };

    const handleConfirm = () => {
        doLogin();
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const doLogin = async () => {
        if (!username || !password)
            return;
        try {
            const success = await login(username, password);
            if (success) {
                setModalVisible(false);
                setLoggedInAs(username);
                window.location.reload();
            } else {
                setValidLogin(false);
            }
        } catch (e) {
            console.error("Failed to login: ", e);
        }
    };

    const doLogout = async () => {
        try {
            const success = await logout();
            if(success) {
                setLoggedInAs('');
                window.location.reload();
            }
        } catch (e) {
            console.error("Failed to logout: ", e);
        }
    }

    return (
        <>
            <Button 
                hidden={loggedInAs.length > 0} 
                variant="secondary" 
                onClick={handleShow}>
                    Login
            </Button>

            <Stack direction="horizontal" gap={3} hidden={loggedInAs.length == 0}>
                <label >{loggedInAs}</label>
                <div className="vr" />
                <Button 
                    hidden={loggedInAs.length == 0} 
                    variant="secondary" 
                    onClick={doLogout}>
                        Logout
                </Button>
            </Stack>

            <Modal
                show={modalVisible}
                onHide={handleCancel}
                backdrop="static"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body 
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                        e.preventDefault();
                        handleConfirm();
                        }
                    }}>
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
