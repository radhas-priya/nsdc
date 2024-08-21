import axios from 'axios';
import forge from 'node-forge'; // Ensure you have the correct forge library

// Centralized API base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_PROXY_BASE_URL || process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

// Set default axios configuration
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // Ensure credentials (cookies) are sent with every request

// Function to fetch CSRF token and store it in local storage
const fetchCsrfToken = async () => {
    try {
        const response = await axios.get('https://uatservices.ekaushal.com/api/get-csrf-token');
        const token = response.data.csrfToken; // Adjust based on actual API response
        localStorage.setItem('csrfToken', token); // Store in local storage
        console.log('CSRF Token fetched:', token);
        return token;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw new Error('Failed to fetch CSRF token.');
    }
};

// Function to fetch public and secret keys
export const fetchKeys = async (csrfToken) => {
    try {
        const response = await axios.get('/api/user/v1/getkey', {
            headers: {
                'X-Csrf-Token': csrfToken, // Ensure this header matches what the API expects
                'Content-Type': 'application/json',
            },
        });

        const { publicKey, secretKey } = response.data;

        // Store the keys securely or handle them as needed
        console.log('Public Key:', publicKey);
        console.log('Secret Key:', secretKey);

        return { publicKey, secretKey };
    } catch (error) {
        console.error("Error fetching keys:", error.message);
        throw new Error('Failed to fetch keys.');
    }
};

// Function to encrypt password using the public key and secret key
export const encryptPassword = (publicKeyPem, password, secret) => {
    try {
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        const encryptedPassword = publicKey.encrypt(password, 'RSA-OAEP', {
            md: forge.md.sha256.create(),
        });

        // Combine the encrypted password with the secret key
        const finalPassword = forge.util.encode64(encryptedPassword) + secret;
        console.log('Encrypted Password:', finalPassword);

        return finalPassword;
    } catch (error) {
        console.error("Error encrypting password:", error.message);
        throw new Error('Failed to encrypt password.');
    }
};

// Function to perform login with the username
export const login = async (username) => {
    try {
        // Fetch or retrieve CSRF token from local storage
        let csrfToken = localStorage.getItem('csrfToken');
        if (!csrfToken) {
            csrfToken = await fetchCsrfToken();
        }

        // Fetch the public and secret keys
        const { publicKey, secretKey } = await fetchKeys(csrfToken);

        // Encrypt the password
        const encryptedPassword = encryptPassword(publicKey, 'Jaguar@2025', secretKey);

        // Send login request
        const response = await axios.post('/api/user/v1/login', {
            userName: username,
            password: encryptedPassword,
        }, {
            headers: {
                'X-Csrf-Token': csrfToken, // Include CSRF token in the request headers
                'Content-Type': 'application/json',
            },
        });

        console.log('Login Response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error during login process:", error.message);
        throw new Error('Login failed.');
    }
};

// Function to handle encrypted password and cookies (if needed)
async function handleLogin() {
    try {
        const username = 'TP143127'; // Replace with the actual username
        await login(username);

        // After login, you might need to handle cookies or perform additional operations
        console.log('Login process completed');
    } catch (error) {
        console.error('Error in login process:', error);
    }
}

handleLogin();
