const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const { createToken } = require("../utils/jwtService");

const registration = async (request, response) => {
  try {
    const user = new User({
      name: request.body.name,
      email: request.body.email,
      password: bcrypt.hashSync(request.body.password, 8),
      address: request.body.address,
      contactNumber: request.body.contactNumber,
    });

    await user.save();
    response.status(200).json({
      status: "Success",
      message: "Account registration successful.",
      id: user._id,
      balance: 0,
    });
  } catch (error) {
    response.status(500).json({ status: "Failed", message: error });
  }
};

const login = async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email }).exec();

    if (!user) {
      return response
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(
      request.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return response
        .status(401)
        .json({ status: "Failed", message: "Invalid user credentials." });
    }

    const token = createToken({ id: user._id, role: user.role });

    response.status(200).json({
      status: "Success",
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken: token,
    });
  } catch (error) {
    response.status(500).json({ status: "Failed", message: error });
  }
};

module.exports = {
  registration,
  login,
};
