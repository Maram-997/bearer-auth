'use strict';

const express = require('express');
const app = express();

const error404 = require('./handlers/404')
const error500 = require('./handlers/500')

const logger = require('./middleware/logger')

app.use(logger)

app.use(express.json());

app.get('/' , (req,res,next) => {
    res.send('All Work Good');
})
app.get('/badConnection', (res,req,next) => {
    next('SOMETHING WENT WRONG')
})
app.use('*' , error404)
app.use(error500)

module.exports = {
    server : app,
    start : (port) => {
        app.listen(port , () => {
            console.log(`SERVER IS UP`);
        })
    }
}