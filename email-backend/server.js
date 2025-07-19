// email-backend/server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow requests from your frontend domain
app.use(express.json()); // To parse JSON request bodies

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your sending email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

// API endpoint to send email
app.post('/api/send-contact-email', async (req, res) => {
    // Destructure all expected fields, including the new ones
    const { name, email, message, feedbackType, suggestedSkill, strengthVote } = req.body;

    // Basic validation for core fields
    if (!name || !email || !message || !feedbackType) {
        return res.status(400).json({ message: 'Core form fields are required: Name, Email, Message, Feedback Type.' });
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: process.env.TARGET_EMAIL, // Recipient address (goyalpari70@gmail.com)
            subject: `Portfolio Contact: ${feedbackType} from ${name}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Feedback Type:</strong> ${feedbackType}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap; margin-left: 20px; padding: 10px; border-left: 3px solid #ccc; background-color: #f9f9f9;">${message}</p>
                <br>
                <h3>Additional Feedback:</h3>
                <p><strong>Suggested New Skill for Pari:</strong> ${suggestedSkill || 'Not provided'}</p>
                <p><strong>Voted Strength for Pari:</strong> ${strengthVote || 'Not voted'}</p>
                <hr>
                <p><em>This email was sent from your portfolio contact form.</em></p>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email. Please try again later.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});