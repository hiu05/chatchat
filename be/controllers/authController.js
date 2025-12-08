import UserModel from "../Models/userModel.js";
import PersonalizeModel from "../models/personalizeModel.js";
import { isDuplicate } from "../libs/dupcheck.js";
import SessionModel from "../models/sessionModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import VerifyModel from "../models/verifyModel.js";

const signUp = async (req, res) => {
    try {
    const { username, password, phone, verifyCode} = req.body;
    const email = String(req.body.email || "").trim().toLowerCase();

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email are required' });
    }

    const existingVerify = await VerifyModel.findOne({ email: email, isUse: false }).sort({ createdAt: -1 });
    if (!existingVerify) {
        return  res.status(400).json({ error: 'No verification code found for this email' });
    }
    
    const isCodeValid = await bcrypt.compare(verifyCode, existingVerify.verifyCode);
    if (!isCodeValid) {
        return res.status(400).json({ error: 'Invalid verification code' });
    }

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

    const newPersonalize = new PersonalizeModel({
        userId: newUser._id,
    });
    await newPersonalize.save();
    newUser.personalizeId = newPersonalize._id;

    newUser.save()
        .then(user => res.status(201).json({ message: 'User created successfully', user }))
        .catch(err => res.status(500).json({ error: 'Error creating user', details: err }));
    
    

    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err });
    }

};

const signIn = async (req, res) => {
    try {
    //check input
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const ACCESS_TOKEN_EXPIRES_IN = '30m'
    const REFRESH_TOKEN_EXPIRES_IN = 7*24*60*60*1000; // 7 days in milliseconds

    //tìm user
    const user = await UserModel.findOne({ email: email.trim().toLowerCase() });
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
        { userId: user._id, email: user.email },
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


export { signUp, signIn, signOut };