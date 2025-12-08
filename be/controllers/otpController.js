import VerifyModel from "../models/verifyModel";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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