var express = require('express');
var router = express.Router();
var user = require('../services/userQuery');
var task = require('../Services/taskQuery');
var employee = require('../Services/employeeQuery')

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
 * Retrieve all the tasks not urgent
 */
router.get('/notUrgent', (req, res) => {
    task.findAllNotUrgent(res);
})

/**
 * Retrieve all the tasks urgent
 */
router.get('/urgent', (req, res) => {
    task.findAllUrgent(res);
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
router.put('/done/:id', (req, res) => {
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
    var params = req.body;
    task.updateVerified(params, res);
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

/**
 * Show all the employees
 */
router.get('/employeesList', (req, res) => {
    employee.getAll(res);
})

/**
 * Create new employee
 */
router.post('/addEmployee', (req, res) => {
    var param = req.body;
    employee.addEmployee(param, res);
})

/**
 * Delete employee
 */
router.post('/deleteEmployee', (req, res) => {
    var param = req.body;
    employee.deleteEmployee(param, res);
})

/**
 * Create new employee
 */
router.post('/deleteEmployees', (req, res) => {
    employee.deleteEmployees(res);
})

module.exports = router;