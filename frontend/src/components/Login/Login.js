import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {forge} from "node-forge"
import './Login.css';

// Centralized API base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_PROXY_BASE_URL || process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

// Function to fetch CSRF token and store it in local storage
const fetchCsrfToken = async () => {
    try {
        const response = await axios.get('https://uatservices.ekaushal.com/api/get-csrf-token');
        const token = response.data.csrfToken;
        localStorage.setItem('csrfToken', token); // Store in local storage
        return token;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw new Error('Failed to fetch CSRF token.');
    }
};

// Function to fetch public and secret keys

const fetchKeys = async (csrfToken) => {
    try {
        const response = await axios.get('/api/user/v1/getkey', {
            headers: {
                'X-Csrf-Token': csrfToken,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching keys:', error);
        throw new Error('Failed to fetch keys.');
    }
};

// Function to encrypt password using the public key and secret key
const encryptPassword = (publicKeyPem, password, secret) => {
    try {
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        const encryptedPassword = publicKey.encrypt(password, 'RSA-OAEP', {
            md: forge.md.sha256.create(),
        });
        return forge.util.encode64(encryptedPassword) + secret;
    } catch (error) {
        console.error('Error encrypting password:', error);
        throw new Error('Failed to encrypt password.');
    }
};

const Login = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const initializeLogin = async () => {
            try {
                const token = await fetchCsrfToken();
                setCsrfToken(token);
            } catch (error) {
                setMessage('Failed to initialize login.');
            }
        };

        initializeLogin();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            if (!csrfToken) {
                throw new Error('CSRF token not found.');
            }

            // Fetch public and secret keys
            const { publicKey, secretKey } = await fetchKeys(csrfToken);

            // Encrypt the password
            const encryptedPassword = encryptPassword(publicKey, 'Jaguar@2025', secretKey);

            // Send login request
            const response = await axios.post(
                'https://uatservices.ekaushal.com/api/user/v1/login',
                { userName: username, password: encryptedPassword },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-csrf-token': csrfToken,
                    },
                    withCredentials: true,
                }
            );

            setMessage(response.data.message);
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Login failed. Please try again.');
        }
    };

    return (
        <div className="background-login">
            <div className="login-form-container">
                <h3 className="h3-box-login">Login</h3>
                <div className="color-box-login">
                    <form onSubmit={handleLogin} className="form-login">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                    {message && <p className="login-footer">{message}</p>}
                </div>
                <div className="login-footer">
                    <p>Don't have an account? <a href="/signup" className="signup-link">Sign up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
