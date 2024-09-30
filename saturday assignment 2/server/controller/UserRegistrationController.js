const User = require("../model/UserModal");
const bcrypt = require("bcrypt");

const info = async (req, res) => {
  try {
      const { name, email, phone, password } = req.body;
      console.log("Received password:", password); 

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
          name,
          email,
          phone,
          password: hashedPassword,
      });
      res.status(201).json({ msg: "User added successfully" });
  } catch (error) {
      console.error("Error adding user:", error);
      if (error.name === 'SequelizeValidationError') {
          return res.status(400).json({ message: error.errors.map(e => e.message) });
      }
      res.status(500).json({ message: "Server error" });
  }
};

module.exports = info;
