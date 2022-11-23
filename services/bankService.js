const User = require("../models/UserModel");

const withdraw = async (request, response) => {
  try {
    const user = await User.findById(request.body.id).exec();

    if (!user) {
      return response
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }

    if (
      request.body.amount > Number(user.accountBalance) ||
      request.body.amount <= 0
    ) {
      return response.status(404).json({
        status: "Failed",
        message:
          "Withdrawal amount cannot be 0 or less, or greater than current balance.",
      });
    }

    const newBalance = Number(user.accountBalance) - request.body.amount;

    user.accountBalance = newBalance;
    await user.save();

    response.status(200).json({
      status: "Success",
      message: "Successful Withdrawal",
      balance: Number(user.accountBalance),
    });
  } catch (e) {
    response.status(500).json({ status: "Failed", message: error });
  }
};

const deposit = async (request, response) => {
  try {
    const user = await User.findById(request.body.id).exec();

    if (!user) {
      return response
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }

    if (request.body.amount <= 0) {
      return response.status(404).json({
        status: "Failed",
        message:
          "Withdrawal amount cannot be 0 or less, or greater than current balance.",
      });
    }
    const newBalance = Number(user.accountBalance) + request.body.amount;

    user.accountBalance = newBalance;
    await user.save();

    response.status(200).json({
      status: "Success",
      message: "Successful Deposit",
      balance: Number(user.accountBalance),
    });
  } catch (e) {
    response.status(500).json({ status: "Failed", message: error });
  }
};

module.exports = {
  withdraw,
  deposit,
};
