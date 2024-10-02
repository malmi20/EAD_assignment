const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    isBusOwner: { type: Boolean, default: false, required: false },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Already an account is exists with email."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
