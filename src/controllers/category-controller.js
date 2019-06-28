const Category = require('../models/Category');

module.exports = {
    getAllCategories: (req, res) => {
        Category
            .find({ })
            .then((categories) => {
                categories.forEach(item => console.log(item.itemName));
                res.status(200).json(categories);
            })
    }
}