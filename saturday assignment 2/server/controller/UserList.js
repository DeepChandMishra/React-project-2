const User = require("../model/UserModal");
const Sequelize = require("sequelize");

const userList = async (req, res) => {
    const { search, sortBy = 'id' } = req.query;

    const where = search ? {
        [Sequelize.Op.or]: [
            { name: { [Sequelize.Op.like]: `%${search}%` } },
            { email: { [Sequelize.Op.like]: `%${search}%` } },
            { phone: { [Sequelize.Op.like]: `%${search}%` } },
        ],
    } : {};

    try {
        //  all users based on search 
        const users = await User.findAll({
            where,
            order: [[sortBy]],
        });

        res.json({
            total: users.length,
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
};

module.exports = userList;
