// server/models/user.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },

  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },

  phone: {
    type: String,
    trim: true,
    default: "",
  },

  address: {
    type: String,
    trim: true,
    default: "",
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  created: {
    type: Date,
    default: Date.now,
  },

  updated: {
    type: Date,
    default: Date.now,
  },

  hashed_password: {
    type: String,
    required: "Password is required",
  },
});

// Virtual Password
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;

    // Hash the password
    this.hashed_password = bcrypt.hashSync(password, 10);
  })
  .get(function () {
    return this._password;
  });

// Password validation
UserSchema.path("hashed_password").validate(function () {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

// Compare password
UserSchema.methods.authenticate = function (plainText) {
  return bcrypt.compareSync(plainText, this.hashed_password);
};

export default mongoose.model("User", UserSchema);
