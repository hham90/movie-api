const jwtSecret = 'your_jwt_secret'; // has to be same key used in JWTStrategy

const jwt = require('jsonwebtoken'),
    passport = require ('passport');

require('./passport'); // your local passport file

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, // Username is what you're encoding
        expiresIn: '7d', // How long token will last
        algorithm: 'HS256' // algorithm used to encode the values of JWT
    });
}

/* POST login. */
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false }, (error,
    user, info) => {
        if (error || !user) {
            console.log('error: ', error);
            console.log('user: ', user)
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (error) => {
            if (error) {
                res.send(error);
            }
            let token = generateJWTToken(user.toJSON());
            return res.json({ user, token });
        });
      })(req, res);
    });
}