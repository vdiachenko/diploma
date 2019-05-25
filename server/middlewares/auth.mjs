import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const auth = function (req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.user = decoded;
                next();
            }
        });
    }
}

export default auth
