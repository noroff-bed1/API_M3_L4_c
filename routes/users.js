var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res, next) {
	const token = req.headers.authorization.split(' ')[1];
	if (!token) {
		res.status(200).json({ success: false, message: 'Error! Token was not provided.' });
	}
	const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	res.status(200).json({
		success: true,
		data: {
			userId: decodedToken.userId,
			email: decodedToken.email,
			users: ['user1', 'user2', 'user3'],
		},
	});
});

module.exports = router;

