module.exports = function (req, res, next) {
    if (req.method != 'DELETE') {
        next();
    }
    else {
        if (req.get('Authorization') == 'X-Password qwerty') {
            next();
        }
        else {
            res.status(401).send('Unauthorized');
        }
    }
};