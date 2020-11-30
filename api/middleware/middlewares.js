const authMethod = require('./methods');

const dotenv = require('dotenv');

dotenv.config();

exports.isAuth = async (req, res, next) => {

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

	req.user = verified.payload;

	return next();
};

exports.login = async (req, res) => {
    const accessToken = await authMethod.generateToken(
        req,
        process.env.ACCESSTOKENSECRET,
    );
    if (!accessToken) {
        return res
            .status(401)
            .send('Login failed, please try again.');
	}
	res.send(accessToken)
};