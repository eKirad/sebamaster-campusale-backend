const Category = require('../models/Category');

module.exports = {
    getAllCategories: (req, res) => {
        Category
            .find({ })
            .then((categories) => {
                res.status(200).json(categories);
            })
    }
}