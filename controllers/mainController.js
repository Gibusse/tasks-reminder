var express = require('express');
var paginate = require('express-paginate');
var router = express.Router();
var user = require('../services/userQuery');
var task = require('../Services/taskQuery');
var employee = require('../Services/employeeQuery')


// keep this before all routes that will use pagination
router.use(paginate.middleware(10, 50));


/**
 * User registration
 */
router.post('/register', async(req, res) => {
    user.register(req.body, res);
})

/**
 * User authentication
 */
router.post('/login',async(req, res) => {
    user.login(req.body, res);
})

router.post('/add', async(req, res) => {
    var params = req.body;
    task.add(params, res);
})

/**
 * Retrieve all the tasks not urgent
 */
router.get('/notUrgent', async(req, res) => {

   task.findAllNotUrgent(req, res);
})

/**
 * Retrieve all the tasks urgent
 */
router.get('/urgent', async(req, res) => {
    task.findAllUrgent(req, res);
})


/**
 * Retrieve the task have been done 
 * and wait to be verified
 */
router.get('/findDone', async(req, res) => {
    task.findDone(res);
})

/**
 * Mark task as done
 */
router.put('/done/:id', async(req, res) => {
    var params = req.body;
    task.updateDone(params, res);
})

/**
 * Mark task as undone
 */
router.put('/undone/:id', async(req, res) => {
    var params = req.body;
    task.updateUndone(params, res);
})

/**
 * Mark task as verified
 */
router.put('/verified/:id', async(req, res) => {
    var params = req.body;
    task.updateVerified(params, res);
})

/**
 * Delete on task
 */
router.delete('/delete/:id', async(req, res) => {
    var param = req.body;
    task.deleteOne(param, res);
})

/**
 * Delete all the tasks exists on DB
 */
router.delete('/deleteAll', async(req, res) => {
    task.deleteAll(res);
})

/**
 * Show all the employees
 */
router.get('/employeesList', async(req, res) => {
    employee.getAll(res);
})

/**
 * Create new employee
 */
router.post('/addEmployee', async(req, res) => {
    var param = req.body;
    employee.addEmployee(param, res);
})

/**
 * Update employee
 * @employee
 */
router.patch('/updateEmployee/:id', async(req, res) => {
    var param = req.body;
    employee.updateEmployee(param, res);
})

/**
 * Delete employee
 */
router.delete('/deleteEmployee/:id', async(req, res) => {
    var id = req.params;
    employee.deleteEmployee(id, res);
})

/**
 * Delete all employees
 */
router.delete('/deleteEmployees', async(req, res) => {
    employee.deleteEmployees(res);
})

module.exports = router;