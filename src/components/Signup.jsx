import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [visibility, setVisibility] = useState(false);
    const navigate = useNavigate();

    const handleVisibility = () => {
        setVisibility(!visibility);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const backendUrl = import.meta.env.REACT_APP_BACKEND_URL;
        console.log('Backend URL:', backendUrl);
            const response = await axios.post(`${backendUrl}/signup`, { username, email, password });
            if (response.data.error) {
                setErrorMessage(response.data.error);
            } else {
                setSuccessMessage("Registration successful! Please check your email to confirm your registration.");
                navigate(`/confirm-email?token=${response.data.token}`);
            }
        } catch (error) {
            console.log("Error during signup:", error);
            setErrorMessage("Error during signup. Please try again.");
        }

        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="centered-container">
            <div className='signup-div'>
                <h1>Welcome!</h1>
                <p><span className='signup-hylyt'>Sign Up</span> to continue</p>
                <form action="" className='signup-form' onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <div className='input-username'>
                        <input type="text" value={username} name="username" placeholder='Enter username' id="username" onChange={(e) => setUsername(e.target.value)} required autoComplete="username" />
                    </div>

                    <label htmlFor="email">Email</label>
                    <div className='input-email'>
                        <input type="email" value={email} name="email" placeholder='Enter email' id="email" onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                    </div>

                    <label htmlFor="password">Password</label>
                    <div className='input-password'>
                        <input type={visibility ? "text" : "password"} value={password} name="password" placeholder='Enter your password' id="password" onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
                        <span onClick={handleVisibility}>{!visibility ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}</span>
                    </div>

                    <p>By clicking Agree & Join, you agree to the our website <span className="span-ele">User Agreement, Privacy</span> Policy, and <span className="span-ele">Cookie Policy.</span></p>
                    <input type="submit" value="Agree and join" className="submit" />
                    <span className='signup-span'>Already a member? <Link to="/signin">Log In</Link> </span>
                    {errorMessage && <p style={{ color: "red", fontSize: "12px" }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: "green", fontSize: "12px" }}>{successMessage}</p>}
                </form>
            </div>
        </div>
    );
}

export default Signup;
