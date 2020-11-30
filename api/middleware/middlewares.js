const authMethod = require('./methods');

exports.isAuth = async (req, res, next) => {

	// get access token from header
	const accessTokenFromHeader = req.headers.authorization.replace('Bearer ', '');

	if (!accessTokenFromHeader) {
		return res.status(401).send('Not found access token!');
	}

	const accessTokenSecret = 'Kaito1@3';

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
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
        'Kaito1@3',
    );
    if (!accessToken) {
        return res
            .status(401)
            .send('Login failed, please try again.');
	}
	res.send(accessToken)
};