const Category = require('../models/Category');

module.exports = {
    getAllCategories: (req, res) => {
        Category
            .find({ })
            .then((categories) => {
                res.status(200).json(categories);
            })
    },
    addCategory: (req, res) => {
        Category
            .create(req.body)
            .then((newCategory) => {
                return res.status(200).json(newCategory)})
            .catch((error) => {
                if (error.code === 11000) {
                    res.status(400).json({
                        error: 'Category exists',
                        message: error.message
                    })
                } else {
                    res.status(500).json({
                        error: 'Internal server error',
                        message: error.message
                    });
                }
            });
    },
    deleteCategory: (req, res) => {
        Category
            .findByIdAndRemove(req.params.id)
            .then(() => res.status(200).json({
                message: `Category with id = ${req.params.id} was deleted.`
            }))
            .catch(error => res.status(500).json({
                error: `Internal server error`,
                message: error.message
            }));
    }
}