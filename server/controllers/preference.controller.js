const db = require("../models");
const Preference = db.preferences;

exports.getPreference = async (req, res) => {
  try {
    // Get user preference
    const preference = await Preference.findOne({
      where: { user_id: req.userId }
    });

    if (!preference) {
      // Create default if not found
      const newPreference = await Preference.create({
        user_id: req.userId,
        gallery_layout: "grid"
      });
      
      return res.status(200).send(newPreference);
    }

    res.status(200).send(preference);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving preference."
    });
  }
};

exports.updatePreference = async (req, res) => {
  try {
    // Validasi input
    if (!req.body || !req.body.gallery_layout) {
      return res.status(400).send({
        message: "Gallery layout is required!"
      });
    }

    // Validate gallery_layout value
    if (!['grid', 'list'].includes(req.body.gallery_layout)) {
      return res.status(400).send({
        message: "Gallery layout must be 'grid' or 'list'!"
      });
    }

    // Find preference
    let preference = await Preference.findOne({
      where: { user_id: req.userId }
    });

    if (!preference) {
      // Create if not found
      preference = await Preference.create({
        user_id: req.userId,
        gallery_layout: req.body.gallery_layout
      });
    } else {
      // Update if found
      await preference.update({
        gallery_layout: req.body.gallery_layout
      });
    }

    res.status(200).send({
      message: "Preference updated successfully.",
      data: preference
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating preference."
    });
  }
};