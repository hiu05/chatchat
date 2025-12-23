import mongoose from "mongoose";

const verifySchema = new mongoose.Schema({
    email: { type: String },
    verifyCode: { type: String },
    isUse: { type: Boolean, default: false },
    expiresAt: { type: Date },
}, {
    timestamps: true
})

verifySchema.index({ "expiresAt": 1 }, { expireAfterSeconds: 0 });

export const VerifyModel = mongoose.model("Verify", verifySchema);
 