import UserModel from "../Models/userModel.js";

const signUp = (req, res) => {
  res.send('User signed up');
};

const signIn = (req, res) => {
  // Logic for user sign-in
  res.send('User signed in');
};

export { signUp, signIn };