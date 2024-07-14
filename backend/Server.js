const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "assessment",
    password: "Nani@2003",
    port: "5432",
});
db.connect();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nikhilpalem93466@gmail.com',
        pass: 'axgf hfed qhiz pxkp'   
    }
});

const sendConfirmationEmail = (email, token) => {
    const mailOptions = {
        from: 'nikhilpalem93466@gmail.com', 
        to: email,                 
        subject: 'Email Confirmation',
        html: `<p>Thank you for registering. Please confirm your email by clicking on the link below:</p>
               <a href="http://localhost:3000/confirm-email?token=${token}">Confirm Email</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    });
};

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const checkExists = await db.query("SELECT * FROM users WHERE email=$1", [email]);
        if (checkExists.rows.length > 0) {
            res.json({ error: "Email already exists..." });
        } else {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err) {
                    console.log("Error during hashing", err);
                } else {
                    const result = await db.query("INSERT INTO users (username, email, password, confirmed) VALUES ($1, $2, $3, $4) RETURNING *", [username, email, hash, false]);
                    const user = result.rows[0];
                    const token = Buffer.from(email).toString('base64');
                    sendConfirmationEmail(email, token);
                    res.json({ message: "Signup successful! Please confirm your email to log in." });
                }
            });
        }
    } catch (err) {
        res.json({ error: "Internal server error..." });
    }
});

app.get("/confirm-email", async (req, res) => {
    const token = req.query.token;
    const email = Buffer.from(token, 'base64').toString('ascii');
    try {
        const result = await db.query("UPDATE users SET confirmed=$1 WHERE email=$2 RETURNING *", [true, email]);
        if (result.rows.length > 0) {
            res.send("Email confirmed successfully! You can now log in.");
        } else {
            res.send("please verify your mail and try signing in....");
        }
    } catch (err) {
        res.json({ error: "Internal server error..." });
    }
});

app.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const checkExists = await db.query("SELECT * FROM users WHERE username=$1", [username]);
        if (checkExists.rows.length > 0) {
            const user = checkExists.rows[0];
            if (!user.confirmed) {
                return res.json({ error: "Please confirm your email before logging in." });
            }
            const hashedPassword = user.password;
            bcrypt.compare(password, hashedPassword, (err, valid) => {
                if (err) {
                    console.log("Error comparing passwords", err);
                    res.json({ error: "Internal server error" });
                } else {
                    if (valid) {
                        res.json(user);
                    } else {
                        res.json({ error: "Incorrect Password" });
                    }
                }
            });
        } else {
            res.json({ error: "User doesn't exist, please signup" });
        }
    } catch (err) {
        console.log("DB error", err);
        res.json({ error: "Internal server error" });
    }
});

app.get("/products", async (req, res) => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        res.json(response.data);
    } catch (err) {
        console.log("API request error:", err);
        res.json({ error: "Error fetching products" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
