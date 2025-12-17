import { ok } from "assert";
import VerifyModel from "../models/verifyModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export const sendOTP = async (req, res) => {  
    console.log(req.body);
    const { email } =  req.body;
    const OTP_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // email của bạn
            pass: process.env.EMAIL_PASS  // app password
        }
    });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Xin chào từ ChitChat",
        text: ` ${verifyCode}`,
    };

    const hashedCode = await bcrypt.hashSync(verifyCode, 10);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Lỗi khi gửi email:", error);
            res.status(500).send("Lỗi khi gửi email");
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email sent successfully");
        }
    })

    await VerifyModel.findOneAndUpdate(
  { email }, // điều kiện tìm theo email
  { 
    verifyCode: hashedCode, 
    expiresAt: new Date(Date.now() + OTP_TTL) 
  },
  { 
    upsert: true,   // nếu chưa có thì tạo mới
    new: true       // trả về document sau khi update
  }
);
    
    res.status(201).json({
        err: ok,
        message: "Mã xát minh đã gửi đến mail của bạn"
    })

};