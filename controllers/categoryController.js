const CategoryModel = require('../models/categoryModel.js');

module.exports = {

    list: function (req, res) {
        CategoryModel.find(function (err, categorys) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting category.',
                    error: err
                });
            }

            return res.json(categorys);
        });
    },

    show: function (req, res) {
        const id = req.params.id;

        CategoryModel.findOne({_id: id}, function (err, category) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting category.',
                    error: err
                });
            }

            if (!category) {
                return res.status(404).json({
                    message: 'No such category'
                });
            }

            return res.json(category);
        });
    },

    create: function (req, res) {
        const category = new CategoryModel({
			title : req.body.title,
			image_id : req.body.image_id
        });

        category.save(function (err, category) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating category',
                    error: err
                });
            }

            return res.status(201).json(category);
        });
    },

    update: function (req, res) {
        const id = req.params.id;

        CategoryModel.findOne({_id: id}, function (err, category) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting category',
                    error: err
                });
            }

            if (!category) {
                return res.status(404).json({
                    message: 'No such category'
                });
            }

            category.title = req.body.title ? req.body.title : category.title;
			category.image_id = req.body.image_id ? req.body.image_id : category.image_id;
			
            category.save(function (err, category) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating category.',
                        error: err
                    });
                }

                return res.json(category);
            });
        });
    },

    remove: function (req, res) {
        const id = req.params.id;

        CategoryModel.findByIdAndRemove(id, function (err, category) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the category.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
