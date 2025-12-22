import UserModel from '../models/userModel.js';

const getUserProfile = async (req, res) => {
    try {
        const userId = new URLSearchParams()
        const user = await UserModel.findById(userId).select('-password').populate('personalizeId');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err });
    }
};

export const UserControllers = { getUserProfile }