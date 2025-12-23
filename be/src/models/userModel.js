import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    displayName: { type: String, require: true},
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, sparse: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    personalizeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Personalize' }
},{
    timestamps: true
});

userSchema.index({"username": 1}, {unique: true})
userSchema.index({"email": 1}, {unique: true})

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
