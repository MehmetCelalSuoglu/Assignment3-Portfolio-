// server/controllers/auth.controller.js
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../../config/config.js";
import errorHandler from "./error.controller.js";

// SIGN UP (create new user)
const signup = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// SIGN IN (login)
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: "7d",
    });

    res.cookie("t", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    // 🔥 BURAYI GÜNCELLEDİK → role'u da frontend'e gönderiyoruz
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,   // <<---- EKLENEN SATIR
      },
    });
  } catch (err) {
    return res.status(401).json({
      error: "Could not sign in",
    });
  }
};

// SIGN OUT
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "Signed out" });
};

// JWT middleware: check Authorization: Bearer <token>
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// Check if logged-in user is admin
const isAdmin = async (req, res, next) => {
  try {
    // expressjwt token userId req.auth._id
    const user = await User.findById(req.auth._id).select("name email role");
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Admin resource. Access denied." });
    }

    req.profile = user;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Server error while checking admin permission",
    });
  }
};

export default { signup, signin, signout, requireSignin, isAdmin };


