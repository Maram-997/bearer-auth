'use strict';

const express = require('express');
const authRouter = express.Router();

const { Users } = require('../models/user-model');
const basicAuth = require('../middleware/basic-auth')
const bearerAuth = require('../middleware/bearer-auth')

router.post("/signin", basicAuth(Users), (req, res) => {
  res.status(200).send(req.user);
});

router.get("/users", bearerAuth(Users), (req, res) => {
  res.status(200).send(req.user);
});
