'use strict';
const Users = require('../models/user-model');

module.exports = (req, res, next) => {
    try {
        if (!req.header.authorization) {
            return next('Invalid login');
            const token = req.header.authorization.split(' ').pop();
            const isValid = await Users.authenticateBearer(token);
            req.user = isValid;
            req.token = isValid.token;
            next();
        }
    } catch (error) {
        next('invalid login')
    }
}