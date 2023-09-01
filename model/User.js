const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username was nit provided"],
    maxLength: 30,
  },
});

// userSchema.index({ id: Number });

const User = mongoose.model("User", userSchema);
module.exports = User;
