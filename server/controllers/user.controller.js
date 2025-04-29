const db = require("../models");
const User = db.users;
const Preference = db.preferences;
const bcrypt = require("bcryptjs");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password_hash'] }
    });

    if (!user) {
      return res.status(404).send({
        message: "User not found."
      });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving user profile."
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    // Validasi input
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    const updateData = {};

    // Update email jika ada
    if (req.body.email) {
      updateData.email = req.body.email;
    }

    // Update password jika ada
    if (req.body.password) {
      updateData.password_hash = bcrypt.hashSync(req.body.password, 8);
    }

    // Update user
    const numUpdated = await User.update(updateData, {
      where: { id: req.userId }
    });

    if (numUpdated[0] === 0) {
      return res.status(404).send({
        message: "User not found or no changes made."
      });
    }

    res.status(200).send({
      message: "Profile updated successfully."
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating profile."
    });
  }
};