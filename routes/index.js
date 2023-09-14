var express = require('express');
var router = express.Router();
require('dotenv').config();
var jwt = require('jsonwebtoken');
const users = [];
let id = 1;

router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/signup', function (req, res, next) {
	res.render('signup');
});

router.get('/login', function (req, res, next) {
	res.render('login');
});

// Handling post request
router.post('/login', async (req, res, next) => {
	let { email, password } = req.body;
	let existingUser;
	try {
		existingUser = users.find((element) => element.email == email);
	} catch {
		const error = new Error('Error! Something went wrong.');
		return next(error);
	}
	if (!existingUser || existingUser.password != password) {
		const error = Error('Wrong details please check at once');
		return next(error);
	}
	let token;
	try {
		token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
	} catch (err) {
		console.log(err);
		const error = new Error('Error! Something went wrong.');
		return next(error);
	}
	res.status(200).json({
		success: true,
		data: {
			userId: existingUser.id,
			email: existingUser.email,
			token: token,
		},
	});
});

// Handling post request
router.post('/signup', async (req, res, next) => {
	const { email, password } = req.body;
	const newUser = {
		id,
		email,
		password,
	};
	users.push(newUser);
	id++;
	let token;
	try {
		token = jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
	} catch (err) {
		console.log(err);
		const error = new Error('Error! Something went wrong.');
		return next(error);
	}
	res.status(201).json({
		success: true,
		data: {
			userId: newUser.id,
			email: newUser.email,
			token: token,
		},
	});
});

module.exports = router;

