import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Signin.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function SignIn({ SignIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [visibility, setVisibility] = useState(false);
    const navigate = useNavigate();

    const handleVisibility = () => {
        setVisibility(!visibility);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const backendUrl = import.meta.env.REACT_APP_BACKEND_URL;
            const response = await axios.post(`${backendUrl}signIn`, {
                username,
                password
            });
            if (response.data.error) {
                setErrorMessage(response.data.error);
            } else {
                SignIn(response.data.user_id, response.data.username);
                console.log("sign in page", response.data.user_id);
                navigate("/products");
            }
        } catch (error) {
            console.log("This is catch error", error);
        }
        setPassword('');
        setUsername('');
        // setEmail('');
    };

    return (
        <div className="centered-container">
            <div className='login-div'>
                <h1>Welcome Back!</h1>
                <p><span className='signin-hylyt'>Sign In</span> to continue</p>
                <form action="" className='login-form' onSubmit={handleSubmit}>

                    <label htmlFor="username">Username</label>
                    <div className='input-username'>
                        <input type="text" value={username} name="username" placeholder='Enter username' id="username" onChange={(e) => setUsername(e.target.value)} required autoComplete="username" />
                    </div>


                    <label htmlFor="password">Password</label>
                    <div className='input-password'>
                        <input type={visibility ? "text" : "password"} value={password} name="password" placeholder='Enter your password' id="password" onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
                        <span onClick={handleVisibility}>{!visibility ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}</span>
                    </div>

                    <input type="submit" value="Sign In" className="submit" />
                    <span className='signup-span'>Not a member? <Link to="/Signup">Sign Up</Link> </span>
                    {errorMessage && <p style={{ color: "red", fontSize: "12px" }}> {errorMessage} </p>}
                </form>
            </div>
        </div>
    )
}

export default SignIn;
