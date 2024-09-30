const User = require("../model/UserModal");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  const { name, phone, password } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!name && !phone && !password) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const updates = {};
    if (name && name !== user.name) updates.name = name;
    if (phone && phone !== user.phone) updates.phone = phone;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No changes were made" });
    }

    Object.assign(user, updates);
    await user.save();

    res.status(200).json({ message: "User details updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = updateUser;
