import { UserModel } from '#models/index.js';

const getUserProfile = async (req, res) => {
    try {
        const userId = req.param.id
        const user = await UserModel.findById(userId).select('-password').populate('personalizeId');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err });
    }
};

const searchUser = async (req, res) => {
    const { q } = req.query;

    const users = await User.find({
        username: { $regex: q, $options: 'i' },
    }).limit(10);

    res.json(users);
};

export const UserControllers = { getUserProfile, searchUser };