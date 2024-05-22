const { userLogin, userRegister } = require('./functions.js');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Generate a private key
const generateKey = () => {
    return crypto.randomBytes(64).toString('hex');
};

const JWT_SECRET_KEY = generateKey();

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    // If no token is given
    if (!token) {
        return res.status(403).send("Access denied. Token is required.");
    }

    // Check if JWT is valid
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.status(401).send("Invalid token.");
        }

        next(); // Proceed to the next middleware or route handler
    });
}

// Login
app.post('/login', async (req, res) => {
    console.log("Received login request");
    const { username, password } = req.body || {};

    // Check if username and password were given
    if (!username || !password) {
        console.log("Login failed, request was missing information")
        res.status(401).send("Username and password required");
    } else {
        const response = await userLogin(username, password);

        // If an account was found with given info
        if (response === true) {
            // Generate JWT token   
            const token = jwt.sign({ username: username }, JWT_SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token });
        }

        // If no account was found
        res.status(response.status).send(response.message);
    }
});
  
// Register
app.post('/register', async (req, res) => {
    console.log("Received register request");
    const { username, password, email } = req.body || {};

    // Check if username, password and email were given
    if (!username || !password || !email) {
        console.log("Registering failed, request was missing information")
        res.status(401).send("Username, password and email required");
    } else {
        // Attempt to add user to database
        const response = await userRegister(username, password, email);
        res.status(response.status).send(response.message);
    }
});

// Set app to listen on port 3001
app.listen(3001, () => {
    console.log("Server listening on port 3001")
});

// // Get very sensitive and important data
// app.get('/getdata', verifyToken, async (req, res) => {
//     res.status(200).send("Here is your very sensitive and important data");
// });