const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/user");

const getUser = async (req, res) => {
  const { userId } = req.params;
  let user;
  try {
    user = await User.findOne({ _id: userId });
    const { password, ...data } = user._doc;
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({ user: user.toObject({ getters: true }) }); // Responding with the user data
};

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json(errors);
    return;
  }

  const { name, email, password, imageUrl } = req.body;

  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.SEC_PASS
  ).toString();

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  if (existingUser) {
    res.status(422).json({ error: "User already exists." });
    return;
  }

  let imageKey = null;
  if (imageUrl) {
    const result = await storeImage(imageUrl, "profile_images");
    imageKey = result.Key;
  }

  let newUser = new User({
    name,
    email,
    password: encryptedPassword, // Assign the encrypted password
    imageUrl: imageKey,
  });

  try {
    await newUser.save();
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  const accessToken = jwt.sign(
    {
      email: newUser.email,
      id: newUser._id,
      image: newUser.imageUrl,
    },
    process.env.JWT_SECRET
  );
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
  });
  res.status(201).send({
    user: newUser.toObject({ getters: true }),
    message: "Signed up and logged in!",
    token: accessToken,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      existingUser.password,
      process.env.SEC_PASS
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      res.status(401).json({ error: "Wrong Credentials" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  const accessToken = jwt.sign(
    {
      email: existingUser.email,
      id: existingUser._id,
    },
    process.env.JWT_SECRET
  );

  // hide the password
  const { password: pass, ...user } = existingUser._doc;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
  });

  res.status(200).send({ user, message: "Logged in!", token: accessToken });
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;

  // Update the user
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res
    .status(200)
    .json({ message: "Account has been updated", user: updatedUser });
};

const logout = (req, res) => {
  res.clearCookie("accessToken", {
    sameSite: "none",
    secure: true,
  });
  res.status(200).send("Logged out");
};

// const { firstname, lastname, email, password, image } = req.body;
// const id = req.params.userId;

// let user;
// try {
//   user = await User.findById(id);
// } catch (err) {
//   res.status(500).json(err);
//   return;
// }
// if (!user) {
//   res.status(404).json(user);
//   return;
// }

// user.firstname = firstname;
// user.lastname = lastname;
// user.email = email;
// user.password = password;
// user.image = image;

// try {
//   await user.save();
// } catch (err) {
//   res.status(500).json(err);
//   return;
// }

// res.status(200).json({ user: user.toObject({ getters: true }) });

module.exports = { getUser, signup, login, updateUser, logout };
