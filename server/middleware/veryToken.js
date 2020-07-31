const auth = require('../util/auth');
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeaher = req.headers['authorization'];
    if (typeof bearerHeaher !== 'undefined') {
        //Split at the sapce
        const bearer = bearerHeaher.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set token
        req.token = bearerToken;
        //decoded token
        auth.decodeToken(req.token)
            .then((data) => {
                req.payload = data;
                next();
            })
            .catch((error) => res.sendStatus(403));
    } else {
        //Forbiden
        res.sendStatus(403);
    }
}
module.exports = verifyToken;
