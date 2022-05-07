var AllergenModel = require('../models/allergenModel.js');

/**
 * allergenController.js
 *
 * @description :: Server-side logic for managing allergens.
 */
module.exports = {

    /**
     * allergenController.list()
     */
    list: function (req, res) {
        AllergenModel.find(function (err, allergens) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting allergen.',
                    error: err
                });
            }

            return res.json(allergens);
        });
    },

    /**
     * allergenController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        AllergenModel.findOne({_id: id}, function (err, allergen) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting allergen.',
                    error: err
                });
            }

            if (!allergen) {
                return res.status(404).json({
                    message: 'No such allergen'
                });
            }

            return res.json(allergen);
        });
    },

    /**
     * allergenController.create()
     */
    create: function (req, res) {
        var allergen = new AllergenModel({
			title : req.body.title,
			image_id : req.body.image_id
        });

        allergen.save(function (err, allergen) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating allergen',
                    error: err
                });
            }

            return res.status(201).json(allergen);
        });
    },

    /**
     * allergenController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        AllergenModel.findOne({_id: id}, function (err, allergen) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting allergen',
                    error: err
                });
            }

            if (!allergen) {
                return res.status(404).json({
                    message: 'No such allergen'
                });
            }

            allergen.title = req.body.title ? req.body.title : allergen.title;
			allergen.image_id = req.body.image_id ? req.body.image_id : allergen.image_id;
			
            allergen.save(function (err, allergen) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating allergen.',
                        error: err
                    });
                }

                return res.json(allergen);
            });
        });
    },

    /**
     * allergenController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        AllergenModel.findByIdAndRemove(id, function (err, allergen) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the allergen.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
