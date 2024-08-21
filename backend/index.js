const forge = require('node-forge');
async function login() {
    try {
        // Get the password from the form (example code)
        let password = "Jaguar@2025";

        const publicKeyData =  "-----BEGIN PUBLIC KEY-----\n    MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAzAG4J/6MtXOmn4aG8O52\n    K/bmvB7kudrA5ZYJxb6Xw7iwREIipnteXBTilJ8dYhh5ZnSNonA+RtFxvditcCK6\n    CykZZmKhqHcNT8eu1AAzbOFipYXj24d/891+r9OntKyqXKvT8eOQJ3x7YcZ4bdc2\n    30lLN4r8ZB2/xGp8MwjIIjw9rvPYcQSQImQJ2xiIH8W728gMOBBkElHPHUJ9wgRU\n    Q0o+4rvYTOsbY3Ai+dyqKvRXIZ2+vEgclbhPob8lUgH5HGeicSWSsBj+0TqZiYAc\n    nmZME5CNkQTO7rIfuaFYVo2BcLA8GCkqMXy6d0F3iIam+SFV973AnNRrfLklSPNh\n    soAKWStrvpYX5vMfPE/VLY9nDAnBsaiPZbF9jMEbjODfi3FyTxCwnjIoiJb6bS2+\n    9++eih9oCqlWNO+6k6amUx0qnK1w4p8G6mJT94ixWRUmI7ivJfkD61S5De8T9rRm\n    gX0Xb09HrTqygM+6jw4UOq12byhdgQ6KqLx3+X3pMWXwlRnM5k82ZmynnjbTqTN1\n    HNZ43HzAWGyIXAZZR47707lbYN2+U+uy5p8Ykaur6cKp98wn2PEOefycHfhoGMTk\n    f+U6adPriWRrzmTgDPxgxEmmCL1lSquS5DKkCTMILISmUXHNkCdKk6upjxZvCOl0\n    FuzusC+WOTnXPG0MiSiFQ6ECAwEAAQ==\n    -----END PUBLIC KEY-----\n";
        const secret = "ca1Vp";
        const encryptedPassword = encryptPassword(publicKeyData, password, secret);

        // Set the encrypted password back to the form or use it for the login request
        password = encryptedPassword;
        

        // Example: Log the encrypted password
        console.log('Encrypted Password:', encryptedPassword);

        // Continue with the login process using encryptedPassword
        // For example, you can send the encrypted password to your server for authentication
    } catch (error) {
        console.error('Login error:', error);
    }
}


function encryptPassword(publicKeyPem, password, secret) {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encryptedPassword = publicKey.encrypt(password, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encryptedPassword) + secret;
}



// Example usage
login();