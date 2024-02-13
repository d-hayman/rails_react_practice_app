import { useState } from 'react';
import { login, logout } from '../shared/services/auth.service';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Alert, Form, InputGroup, Stack } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { createUser } from '../shared/services/users.service';
import { listifyErrors } from '../shared/utils/responseHelpers';

function LoginModal() {
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [signupModalVisible, setSignupModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [invalidLogin, setInvalidLogin] = useState(false);
    const [userCreated, setUserCreated] = useState(false);

    const [loggedInAs, setLoggedInAs] = useState(localStorage.getItem("loggedInAs")??'');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorAlertBody, setErrorAlertBody] = useState<any>({});
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleShow = (e: any) => {
        e.preventDefault();
        setShowPassword(false);
        setInvalidLogin(false);
        setUsername('');
        setPassword('');
        setLoginModalVisible(true);
    };

    const handleConfirm = () => {
        doLogin();
    };

    const handleCancel = () => {
        setLoginModalVisible(false);
    };

    const doLogin = async () => {
        if (!username || !password)
            return;
        try {
            const success = await login(username, password);
            if (success) {
                setLoginModalVisible(false);
                setLoggedInAs(username);
                window.location.reload();
            } else {
                setInvalidLogin(true);
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

    const handleSignupShow = (e: any) => {
        e.preventDefault();
        //leave username and password entered to carry values over
        setEmail('');
        setConfirmPassword('');
        setShowPassword(false);
        setLoginModalVisible(false);
        setSignupModalVisible(true);
    };

    const handleSignupConfirm = () => {
        doSignup();
    };

    const handleSignupCancel = () => {
        setShowPassword(false);
        setSignupModalVisible(false);
        setLoginModalVisible(true);
    };

    const doSignup = async () => {
        if (!username || !password)
            return;
        try {
            const response = await createUser(username, email, password, confirmPassword);
            if (response.ok) {
                setUsername('');
                setPassword('');
                setEmail('');
                setConfirmPassword('');
                setShowPassword(false);
                setUserCreated(true);
                setSignupModalVisible(false);
                setLoginModalVisible(true);
            } else {
                const json = await response.json();
                setErrorAlertBody(json);
                setShowErrorAlert(true);
            }
        } catch (e) {
            setErrorAlertBody({error: `${e}`});
            setShowErrorAlert(true);
            console.error("Failed to create user: ", e);
        }
    };

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
                show={loginModalVisible}
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
                { invalidLogin &&
                <Alert variant="danger" onClose={() => setInvalidLogin(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    Incorrect username or password
                </Alert>}
                { userCreated &&
                <Alert variant="success" onClose={() => setUserCreated(false)} dismissible>
                    <Alert.Heading>User created!</Alert.Heading>
                    Please sign in
                </Alert>}
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
                    <Alert.Link onClick={handleSignupShow}>Sign Up</Alert.Link>
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

            <Modal
                show={signupModalVisible}
                onHide={handleSignupCancel}
                backdrop="static"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body 
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                        e.preventDefault();
                        handleSignupConfirm();
                        }
                    }}>
                { showErrorAlert &&
                <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <ul>{listifyErrors(errorAlertBody)}</ul>
                </Alert>}
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
                    <Form.Group className="mb-3" controlId="emailInput">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
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
                    <Form.Group className="mb-3" controlId="passwordConfirmationInput">
                        <Form.Label>Confirm Password:</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                type={showPassword ? "text" : "password"} 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                            />
                            <Button onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash/> : <FaEye/>}
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Form.Text hidden={!confirmPassword || password === confirmPassword} className='text-danger'>Passwords must match</Form.Text>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSignupCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSignupConfirm}>
                        Sign Up
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
;

export default LoginModal;
