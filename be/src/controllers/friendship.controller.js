import Friendship from '#models/friendshipModel.js';

const sendRequest = async (req, res) => {
  const { receiverId } = req.body;

  const request = await Friendship.create({
    requesterId: req.user.id,
    receiverId,
  });

  res.json(request);
};

const acceptRequest = async (req, res) => {
  const { requesterId } = req.body;

  const friendship = await Friendship.findOneAndUpdate(
    { requesterId, receiverId: req.user.id },
    { status: 'accepted' },
    { new: true }
  );

  res.json(friendship);
};

const getFriends = async (req, res) => {
  const friends = await Friendship.find({
    status: 'accepted',
    $or: [
      { requesterId: req.user.id },
      { receiverId: req.user.id },
    ],
  }).populate('requesterId receiverId', 'displayName avatar');

  res.json(friends);
};

export const FriendshipController = {
  sendRequest,
  acceptRequest,
  getFriends,
};