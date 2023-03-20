const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

const createAccesToken = (user) => {
    const expiracionToken = new Date();
    expiracionToken.setHours(expiracionToken.getHours() + 3);

    const payload = {
        token_type : "access",
        user_id: user._id,
        iat: Date.now(), //fecha de cracion del token
        exp: expiracionToken.getTime(),
    }

    return jwt.sign(payload, JWT_SECRET_KEY);
}

const createRefreshToken = (user) => {
    const expiracionToken = new Date();
    expiracionToken.setMonth(expiracionToken.getMonth() + 1);

    const payload = {
        token_type : "refresh",
        user_id: user._id,
        iat: Date.now(), //fecha de cracion del token
        exp: expiracionToken.getTime(),
    }

    return jwt.sign(payload, JWT_SECRET_KEY);
}

const decoder = token => {
    return jwt.decode(token, JWT_SECRET_KEY, true);
}

module.exports = {
    createAccesToken,
    createRefreshToken,
    decoder
}