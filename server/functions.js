const db = require('./dbconnect.js');
const bcrypt = require('bcrypt');

// Login
async function userLogin(username, password) {
    try {
        // Search for users with the given username
        const user = await db.query(`
            SELECT username, password 
            FROM public.users 
            WHERE (username = $1)
        `, [username]);

        // If no users were found
        if (user.rows.length === 0) {
            console.log("Login failed, user not found")
            return { status: 401, message: "Incorrect username or password" };
        }

        // Compare passwords to see if they match
        const hashedPassword = user.rows[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        // If passwords don't match
        if (!passwordMatch) {
            console.log("Login failed, password incorrect")
            return { status: 401, message: "Incorrect username or password" };
        }

        console.log("Login successful");
        return true;

    } catch (error) {
        console.log("Error during login:", error)
        return { status: 500, message: "Internal Server Error" };
    }
}

// Register
async function userRegister(username, password) {
    try {
        // See if user already exists
        const existingUser = await db.query(`
            SELECT username FROM public.users
            WHERE username = $1
        `, [username]);

        // If a user was found
        if (existingUser.rows.length > 0) {
            console.log("Registering failed, user already exists")
            return { status: 401, message: "Username already in use" };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Try to insert given data to table
        await db.query(`
            INSERT INTO public.users (username, password)
            VALUES ($1, $2)
        `, [username, hashedPassword]);

        console.log("Registering successful");
        return { status: 201, message: "Registering successful!" };

    } catch (error) {
        console.log("Error during registering:", error)
        return { status: 500, message: "Internal Server Error" };
    }
}

module.exports = {userLogin, userRegister};