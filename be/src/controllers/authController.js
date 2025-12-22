import PersonalizeModel from "../models/personalizeModel.js";
import { isDuplicate } from "../libs/dupcheck.js";
import SessionModel from "../models/sessionModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import VerifyModel from "../models/verifyModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

const signUp = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, password, phone, displayName, verifyCode } = req.body.payload;
    const email = String(req.body.payload.email || "").trim().toLowerCase();

    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username, password, and email are required' });
    }

    // check verify code
    const existingVerify = await VerifyModel.findOne({ email, isUse: false })
      .sort({ createdAt: -1 })
      .session(session);

    if (!existingVerify) {
      return res.status(400).json({ error: 'No verification code found for this email' });
    }

    const isCodeValid = await bcrypt.compare(verifyCode, existingVerify.verifyCode);
    console.log(isCodeValid);
    
    if (!isCodeValid) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // check duplicate
    const checkDuplicate = await isDuplicate(UserModel, 'email', email);
    console.log(checkDuplicate);
    
    if (checkDuplicate) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // hash password
    const passwordHash = bcrypt.hashSync(password, 10);

    // create personalize trước
    const newPersonalize = new PersonalizeModel({});
    await newPersonalize.save({ session });

    // create user với personalizeId
    const newUser = new UserModel({
      username,
      password: passwordHash,
      email,
      phone,
      displayName,
      personalizeId: newPersonalize._id,
    });
    await newUser.save({ session });

    // đánh dấu verify code đã dùng
    existingVerify.isUse = true;
    await existingVerify.save({ session });

    // commit transaction
    await session.commitTransaction();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: 'Internal server error', details: err });
  } finally {
    session.endSession();
  }
};

const signIn = async (req, res) => {
    try {
        //check input
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const ACCESS_TOKEN_EXPIRES_IN = '30m'
        const REFRESH_TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

        //tìm user
        const user = await UserModel.findOne({ username: username.trim().toLowerCase() });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        //so sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        //trả về access token
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
        );
        //tạo refresh token
        const refreshToken = crypto.randomBytes(64).toString('hex');

        // lưu refresh token vào db
        const newSession = new SessionModel({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN),
        });
        await newSession.save();

        // referesh token trả về cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: REFRESH_TOKEN_EXPIRES_IN,
        });

        //return access token trong res
        return res.status(200).json({
            message: 'Sign-in successful',
            accessToken: token,
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err });
    }
};

const signOut = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (refreshToken) {
            await SessionModel.deleteOne({ refreshToken });
            res.clearCookie('refreshToken');
        }
        return res.status(200).json({ message: 'Sign-out successful' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err });
    }
};

const sendOTP = async (req, res) => {
    try {
        console.log(req.body);
        const { email } = req.body;

        const isEmailExist = isDuplicate(UserModel, 'email', email)
        if (isEmailExist) {
            return res.status(409).json({
                message:"Email đã được đăng ký"
            })
        }
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
                res.status(500).json("Lỗi khi gửi email");
            } else {
                console.log("Email sent: " + info.response);
                res.status(200).json("Email sent successfully");
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

        return res.status(201).json({
            message: "Mã xác minh đã gửi đến mail của bạn"
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal server error', details: err });
    }
};


export const AuthControllers = { signUp, signIn, signOut, sendOTP };