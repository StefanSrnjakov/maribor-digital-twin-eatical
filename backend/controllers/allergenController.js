const AllergenModel = require('../models/allergenModel.js');

module.exports = {

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

    show: function (req, res) {
        const id = req.params.id;

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

    create: function (req, res) {
        const allergen = new AllergenModel({
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

    update: function (req, res) {
        const id = req.params.id;

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

    remove: function (req, res) {
        const id = req.params.id;

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
