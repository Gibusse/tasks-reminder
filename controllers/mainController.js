var express = require('express');
var router = express.Router();
var user = require('../services/userQuery');
var task = require('../Services/taskQuery');

/**
 * User registration
 */
router.post('/register', (req, res) => {
    user.register(req.body, res);
})

/**
 * User authentication
 */
router.post('/login',(req, res) => {
    user.login(req.body, res);
})

router.post('/add', (req, res) => {
    var params = req.body;
    task.add(params, res);
})

/**
 * Retrieve all the tasks
 */
router.get('/', (req, res) => {
    task.findAll(res);
})

/**
 * Retrieve the task have been done 
 * and wait to be verified
 */
router.get('/findDone', (req, res) => {
    task.findDone(res);
})

/**
 * Mark task as done
 */
router.post('/done', (req, res) => {
    var params = req.body;
    task.updateDone(params, res);
})

/**
 * Mark task as undone
 */
router.post('/undone', (req, res) => {
    var params = req.body;
    task.updateUndone(params, res);
})

/**
 * Mark task as verified
 */
router.post('/verified', (req, res) => {
    task.updateVerified(req, res);
})

/**
 * Delete on task
 */
router.post('/delete/:id', (req, res) => {
    var param = req.body;
    task.deleteOne(param, res);
})

/**
 * Delete all the tasks exists on DB
 */
router.post('/deleteAll', (req, res) => {
    task.deleteAll(res);
})

module.exports = router;