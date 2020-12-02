const authMethod = require('./methods');

const dotenv = require('dotenv');

dotenv.config();

const NoteAPI = require('../controllers/appController');
const { Note } = require('../models/appModel');

exports.checkAuth = async (req, res, next) => {

	// get access token from header
	const accessTokenFromHeader = req.headers.authorization;

	if (!accessTokenFromHeader) {
		return res.status(401).send('Not found access token!');
	}

	const accessTokenSecret = process.env.ACCESSTOKENSECRET;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader.replace('Bearer ', ''),
		accessTokenSecret,
	);

	if (!verified) {
		return res
			.status(401)
			.send('You are not authorized to access this page!');
	}
	// return verified;
	res.token = verified.payload
	next()
};

exports.isAuth = async (req, res, next) => {

	// console.log(req)

	// get access token from header
	const accessTokenFromHeader = req.headers.authorization;

	if (!accessTokenFromHeader) {
		return res.status(401).send('Not found access token!');
	}

	const accessTokenSecret = process.env.ACCESSTOKENSECRET;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader.replace('Bearer ', ''),
		accessTokenSecret,
	);

	if (!verified) {
		return res
			.status(401)
			.json({message: 'You are not authorized to access this page!'});
	}

	NoteAPI.read_a_user(verified.payload.id, res, function(err, result) {
		if ( verified.payload.username === result[0].username) {
			return res.json(verified.payload)
		}else {
			return res
			.status(401)
			.json({message: 'You are not authorized to access this page!'});			
		}
	})
};

exports.login = async (req, res) => {
	// console.log(req);
    const accessToken = await authMethod.generateToken(
		req,
        process.env.ACCESSTOKENSECRET,
    );
    if (!accessToken) {
        return res
            .status(401)
			.json({message: 'Login failed, please try again.'});
	}
	res.json({"token": accessToken})
};

exports.isAuthBoards = async (req, res, next) => {

	// get access token from header
	const accessTokenFromHeader = req.headers.authorization;

	if (!accessTokenFromHeader) {
		return res.status(401).json({message: 'Not found access token!'});
	}

	const accessTokenSecret = process.env.ACCESSTOKENSECRET;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader.replace('Bearer ', ''),
		accessTokenSecret,
	);

	if (!verified) {
		return res
			.status(401)
			.json({message: 'You are not authorized to access this page!'});
	}

	NoteAPI.list_all_board(verified.payload.id, res, function(err, result) {
		return res.json(result)
	})	
};

exports.isAuthUser = async (req, res, next) => {

	// get access token from header
	const accessTokenFromHeader = req.headers.authorization;

	if (!accessTokenFromHeader) {
		return res.status(401).json({message: 'Not found access token!'});
	}

	const accessTokenSecret = process.env.ACCESSTOKENSECRET;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader.replace('Bearer ', ''),
		accessTokenSecret
	);

	if (!verified) {
		return res
			.status(401)
			.send('You are not authorized to access this page!');
	}
	NoteAPI.update_a_user(verified.payload, req.body.password, function(err, result) {
		return res.json({message: "Change password successfully"})
	})	
};

exports.isAuthUserDelete = async (req, res, next) => {

	// get access token from header
	const accessTokenFromHeader = req.headers.authorization;

	if (!accessTokenFromHeader) {
		return res.status(401).send('Not found access token!');
	}

	const accessTokenSecret = process.env.ACCESSTOKENSECRET;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader.replace('Bearer ', ''),
		accessTokenSecret
	);

	if (!verified) {
		return res
			.status(401)
			.send('You are not authorized to access this page!');
	}

	NoteAPI.delete_a_user(verified.payload, res, function(err, result) {
		res.json({ message: 'User successfully deleted' });
	})	
};

exports.isAuthCheckBoard = async (req, res, next) => {
	NoteAPI.check_board(req, res, function(err, result) {
        if (result == null) {
			res.send(err);
		}
		else
			next()
	})	
};