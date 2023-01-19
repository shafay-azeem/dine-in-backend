const User = require("../models/UserModel");

//Create User ---Post
exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  return res.status(201).json({
    success: true,
    user,
    token: user.getJwtToken(user._id),
  });
};

//Create login ---Post
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Your Email & Password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "USER is not found with this email and password",
    });
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: "USER is not found with this email and password",
    });
  }

  return res.status(201).json({
    success: true,
    user,
    token: user.getJwtToken(user._id),
  });
};

//Update User ---Post
exports.updateProfile = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json({
    success: true,
    user,
  });
};

//Delete User ---Post
exports.deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User is not found with this id",
    });
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};

//Get All Users ---Get
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
};

//Delete All Menu
exports.deleteAllUsers = async (req, res) => {
  let users = await User.deleteMany();

  res.status(200).json({
    success: true,
    message: "All Users Deleted Successfully",
  });
};
