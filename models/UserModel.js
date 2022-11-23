const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    unique: [true, "A similar name already exists."],
  },
  email: {
    type: String,
    unique: [true, "A similar email already exists."],
    trim: true,
    required: [true, "Email is required."],
    validate: {
      validator: (v) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Invalid email provided.",
    },
  },
  accountBalance: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  address: {
    type: String,
    required: [true, "Address is required."],
  },
  contactNumber: {
    type: String,
    required: [true, "Phone number is required."],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
