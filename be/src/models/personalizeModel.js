import mongoose from "mongoose";

const personalizeSchema = new mongoose.Schema({
    avatarUrl: { type: String },
    avatarId: { type: String },
    bio: { type: String, maxlength: 500 },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    language: { type: String, default: 'en' },
    notifications: {
      muteAll: { type: Boolean, default: false },
      muteGroup: { type: Boolean, default: false },
      sound: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
}, {
    timestamps: true
});

export const PersonalizeModel = mongoose.model("Personalize", personalizeSchema);
