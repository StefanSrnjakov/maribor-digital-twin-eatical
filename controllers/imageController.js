const ImageModel = require('../models/imageModel.js');

module.exports = {

    list: function (req, res) {
        ImageModel.find(function (err, images) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting image.',
                    error: err
                });
            }

            return res.json(images);
        });
    },

    show: function (req, res) {
        const id = req.params.id;

        ImageModel.findOne({_id: id}, function (err, image) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting image.',
                    error: err
                });
            }

            if (!image) {
                return res.status(404).json({
                    message: 'No such image'
                });
            }

            return res.json(image);
        });
    },

    create: function (req, res) {
        const image = new ImageModel({
			name : req.body.name,
			description : req.body.description,
			path : req.body.path
        });

        image.save(function (err, image) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating image',
                    error: err
                });
            }

            return res.status(201).json(image);
        });
    },

    update: function (req, res) {
        const id = req.params.id;

        ImageModel.findOne({_id: id}, function (err, image) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting image',
                    error: err
                });
            }

            if (!image) {
                return res.status(404).json({
                    message: 'No such image'
                });
            }

            image.name = req.body.name ? req.body.name : image.name;
			image.description = req.body.description ? req.body.description : image.description;
			image.path = req.body.path ? req.body.path : image.path;
			
            image.save(function (err, image) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating image.',
                        error: err
                    });
                }

                return res.json(image);
            });
        });
    },

    remove: function (req, res) {
        const id = req.params.id;

        ImageModel.findByIdAndRemove(id, function (err, image) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the image.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
