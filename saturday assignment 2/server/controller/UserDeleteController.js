const User = require('../model/UserModal');

const UserDeleteController = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(`Attempting to soft delete user with ID: ${userId}`); 

        const user = await User.findByPk(userId);

        if (!user) {
            console.log("User not found"); 
            return res.status(404).json({ message: "User not found" });
        }

        user.deleted_at = new Date(); 
        await user.save(); 

        res.status(200).json({ message: "User soft deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = UserDeleteController;
