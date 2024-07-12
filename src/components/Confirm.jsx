import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

function ConfirmEmail() {
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const confirmEmail = async () => {
            const token = searchParams.get('token');
            console.log("Token:", token);

            if (token) {
                try {
                    const response = await axios.get(`http://localhost:3000/confirm-email?token=${token}`);
                    console.log("Confirmation response:", response.data);

                    setMessage(response.data);
                    if (response.data.includes("confirmed successfully")) {
                        navigate("/products");
                    }
                } catch (error) {
                    console.error("Error confirming email:", error);
                    setMessage("Error confirming email. Please try again.");
                }
            } else {
                setMessage("Invalid confirmation link.");
            }
        };

        confirmEmail();
    }, [searchParams, navigate]);

    return (
        <div className="centered-container">
            <div className='confirmation-div'>
                <h1>Email Confirmation</h1>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default ConfirmEmail;
