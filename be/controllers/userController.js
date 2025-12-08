import UserModel from '../Models/userModel.js';

export const getUserProfile = async (req, res) => {
    try {
        console.log("Authenticated user ID:", req.user);
        const userId = req.user.userId;
        const user = await UserModel.findById(userId).select('-password').populate('personalizeId');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err });
    }
};