const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const blogModel = require('../models/blog');
const routes = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: './images',
	filename: function (req, file, creator) {
		return creator(
			null,
			Math.floor(Math.random() * 100000) +
				'Image' +
				path.extname(file.originalname)
		);
	},
});

const Uploader = multer({
	storage,
});

routes.get('/', function (req, res) {
	return blogModel
		.find()
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			res.status(404).json({ message: error.message });
		});
});
routes.post('/', Uploader.single('profile'), function (req, res) {
	return new blogModel({
		...req.body,
		create: new Date().toISOString(),
		profile: req.file.filename,
	})
		.save()
		.then((blog) => {
			res.json({ blog });
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
});
routes.get('/:id', function (req, res) {
	const bID = req.params.id;
	return blogModel
		.findById(bID)
		.then((data) => {
			if (data) {
				res.json(data);
			} else {
				res.status(404).json({ message: 'Not Found Blog' });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
});
routes.post('/login', function (req, res) {
	return userModel
		.findOne({ email: req.body.email })
		.then((user) => {
			if (user) {
				return bcrypt.compare(req.body.password, user.password);
			} else {
				return res.status(500).json({ message: 'Cannot Find User' });
			}
		})
		.then((user) => {
			if (user) {
				return res.json({ message: 'Ok' });
			} else {
				return res.json({ message: 'Password is not match With Username ...' });
			}
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
});
module.exports = routes;
