var express = require('express');
var router = express.Router();
var user = require('../services/userQuery');
var task = require('../Services/taskQuery');

router.post('/register', (req, res) => {
    user.register(req.body, res);
})

router.post('/login',(req, res) => {
    user.login(req.body, res);
})

router.get('/', (req, res) => {
    task.findAll(res);
})

module.exports = router;