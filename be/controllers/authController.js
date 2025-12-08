import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import VerifyModel from "../models/verifyModel.js";
import { isDuplicate } from "../libs/dup.js";

const sendVerificationCode = (receiver) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // email của bạn
            pass: process.env.EMAIL_PASS  // app password
        }
    });

    const verifiedCode = Math.floor(100000 + Math.random() * 900000).toString();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: receiver,
        subject: "Xin chào từ Nodemailer",
        text: `Đây là nội dung email dạng ${verifiedCode}`,
        html: "<h1>Đây là nội dung email dạng HTML</h1>"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Lỗi khi gửi email:", error);
            res.status(500).send("Lỗi khi gửi email");
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email sent successfully");
        }
    })
    .then(() => {

        const newVerify = new VerifyModel({
            email: receiver,
            vefiedCode: verifiedCode,
        });
        newVerify.save();

    })

};

const signUp = async (req, res) => {
    const { username, password, phone } = req.body;
    const email = String(req.body.email || "").trim().toLowerCase();

    const passwordHash = await bcrypt.hashSync(password, 10); 
    
    const newUser = new UserModel({
        username,
        password: passwordHash,
        email,
        phone,
    });

    const checkDuplicate = await isDuplicate(UserModel, 'email', email);

    if (checkDuplicate) {
        return res.status(409).json({ error: 'Email already exists' });
    }

    newUser.save()
        .then(user => res.status(201).json({ message: 'User created successfully', user }))
        .catch(err => res.status(500).json({ error: 'Error creating user', details: err }));

};

const signIn = (req, res) => {
    // Logic for user sign-in
    res.send('User signed in');
};

export { signUp, signIn };