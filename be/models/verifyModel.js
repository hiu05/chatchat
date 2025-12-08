import mongoose from "mongoose";

const verifySchema = new mongoose.Schema({
    email: { type: String },
    vefiedCode: { type: String },
    isUse: { type: Boolean, default: false },
    emailVerifiedAt: { type: Date },
    expresionVerifiedAt: { type: Date },
}, {
    timestamps: true
})

const VerifyModel = mongoose.model("Verify", verifySchema);

export default VerifyModel;