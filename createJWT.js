const jwt = require('jsonwebtoken');


module.exports.createtoken = (id, role, complete) => {
    const maxAge = 3 * 24 * 60 * 60 * 60
    return jwt.sign({id: id, role: role, complete: complete}, 'secret', {
        expiresIn: maxAge
    })
}