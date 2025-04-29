const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Preference = db.preferences;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  // Ensure jwt is imported

exports.signup = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "Email and password are required!"
      });
    }

    // Check if email is already taken
    const existingUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (existingUser) {
      return res.status(400).send({
        message: "Email is already taken!"
      });
    }

    const user = await User.create({
      email: req.body.email,
      password_hash: bcrypt.hashSync(req.body.password, 8), // Hash password
      role: req.body.role || "user"
    });

    // Create default preference for user
    await Preference.create({
      user_id: user.id,
      gallery_layout: "grid"
    });

    res.status(201).send({
      message: "User registered successfully!"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error.message || "Some error occurred while registering user."
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      return res.status(404).send({
        message: "User not found."
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password_hash
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!"
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration  // Use JWT expiration from config
    });

    res.status(200).send({
      id: user.id,
      email: user.email,
      role: user.role,
      accessToken: token
    });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).send({
      message: error.message || "Some error occurred during login."
    });
  }
};
