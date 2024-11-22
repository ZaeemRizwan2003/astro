import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.post('/api/contact', async (req,res)=> {
    const {name, email, message} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})
const mailOptions = {
    from: email,
    to: process.env.local,
    subject: 'Contact form submission from ${name}',
    text: message
};

try{
    await transporter.sendMail(mailOptions);
    res.status(200).send('Message sent successfully');
}
catch(error){
    res.status(500).send('Error sending message');
}
});

export default app;