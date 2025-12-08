import mongoose from "mongoose";

const personalizeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    avatarUrl: { type: String },
    avatarId: { type: String },
    bio: { type: String, maxlength: 500 },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    language: { type: String, default: 'en' }
}, {
    timestamps: true
});

const PersonalizeModel = mongoose.model("Personalize", personalizeSchema);

export default PersonalizeModel;