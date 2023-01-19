const User = require("../models/UserModel");
const sendMail = require("../utils/SendMail");
const crypto = require("crypto");

//SignUp User --Post
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

//login --Post
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

//Forgot Password --Post
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "USER is not found with this email",
    });
  }

  const resetToken = user.getResetToken();

  await user.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is : \n\n ${resetPasswordUrl}`;

  try {
    await sendMail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} succesfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

//Reset Password --Post
exports.resetPassword = async (req, res, next) => {
  //Create Token Hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });
  // console.log(user, "uuser");

  if (!user) {
    return res.status(400).json({
      success: false,
      message: `Reset password url is invalid or has been expired`,
    });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: `Password Must be same in Both Fields`,
    });
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();

  // sendToken(user, 200, res);
  return res.status(200).json({
    success: true,
    user,
  });
};

//Update User --Post
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

//Delete User --Post
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

//Get All Users --Get
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
};

//Delete All Users
exports.deleteAllUsers = async (req, res) => {
  let users = await User.deleteMany();

  res.status(200).json({
    success: true,
    message: "All Users Deleted Successfully",
  });
};

//User Detail --Get
exports.userDetail = async (req, res, next) => {
  let userid = req.params.id;
  const user = await User.findById(userid);

  res.status(200).json({
    success: true,
    user,
  });
};

//Logout User --Get
exports.logout = async (req, res, next) => {
  // console.log(req.header);
  let token = req.headers.authorization.split(" ")[1];

  // const user = await User.deleteToken(token, (user) => {
  //   console.log(user);
  // });

  User.deleteToken(token, (user) => {
    console.log(user);
  });
};
