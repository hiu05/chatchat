import mongoose from "mongoose";

const verifySchema = new mongoose.Schema({
    email: { type: String },
    verifyCode: { type: String },
    isUse: { type: Boolean, default: false },
    emailVerifiedAt: { type: Date },
    expiresAt: { type: Date },
}, {
    timestamps: true
})

const VerifyModel = mongoose.model("Verify", verifySchema);

export default VerifyModel;