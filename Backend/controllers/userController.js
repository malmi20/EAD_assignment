const customerModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../util");

// middleware for verifyUser
const verifyUser = async (req, _res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    //  check the user existence
    let exist = await customerModel.findOne({ username });
    if (!exist) {
      const error = new Error("User not found.");
      error.status = 404;
      throw error;
    }
    req.user = exist;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// register the user according to their type
const register = async (req, res, next) => {
  try {
    console.log(`called register`);
    const { password, email, isBusOwner } = req.body;
    console.log(req.body);
    if (!password || !email) {
      const error = new Error("Please enter all the fields.");
      error.status = 400;
      throw error;
    }

    // Check if the user already exists in the database
    const existingUser = await customerModel.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists.");
      error.status = 400;
      throw error;
    }
    const user = new customerModel({
      email,
      password: bcrypt.hashSync(password),
      isBusOwner,
    });
    await user.save();
    res.status(200).send({
      message: "User registered successfully.",
      details: {
        email: user.email,
        isBusOwner: user.isBusOwner,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//login in the user to the system
const login = async (req, res, next) => {
  console.log(`called login`);
  const { email, password } = req.body;

  try {
    const user = await customerModel.findOne({ email });
    if (!user) {
      const error = new Error("Incorrect username or password.");
      error.status = 404;
      throw error;
    }
    //checks whether the provided password matches the hashed password stored in the database 
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      const error = new Error("Incorrect username or password.");
      error.status = 400;
      throw error;
    }

    //create JWT token
    const token = generateToken(user);

    return res.status(200).send({
      message: "Login successful.",
      details: {
        name: user.name,
        email: user.email,
        isBusOwner: user.isBusOwner,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//update the password of the user
const updateUserPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, userId } = req.body;
    const user = await customerModel.findOne({ _id: userId });
    if (!user) {
      const error = new Error("User not found.");
      error.status = 404;
      throw error;
    }
    const passwordCheck = bcrypt.compare(currentPassword, user.password);
    if (!passwordCheck) {
      const error = new Error("Incorrect password.");
      error.status = 400;
      throw error;
    }
    user.password = bcrypt.hashSync(newPassword);
    user.save();
    return res.status(200).send({
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  register,
  login,
  verifyUser,
  updateUserPassword,
};
