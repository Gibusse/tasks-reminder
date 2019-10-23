var mysql = require('../config/DB');

module.exports.add = function(req, res) {
    var queryAdd = 'INSERT INTO task(taskTitle, taskDescription, taskDone, taskVerified, taskDate) VALUES (?, ?, ?, ?, Now())';
    var params = [req.taskTitle, req.taskDescription, req.taskDone, req.taskVerified]

    mysql.db.query(queryAdd, params, (err, row) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(row);
    })
}


/**
 * Find all the tasks have been created and not done yet
 */
module.exports.findAll = function(res) {
    var querySelect = 'SELECT taskId, taskTitle, taskDescription, taskDone, taskVerified, taskDate FROM task WHERE taskDone = 0 AND taskVerified = 0';

    mysql.db.query(querySelect, (err, row) => {
        res.status(200).send(row);
    })
}

/**
 * Find all the tasks have done but not verified
 */
module.exports.findDone = function(res) {
    var querySelect = 'SELECT taskId, taskTitle, taskDescription, taskDone, taskVerified, taskDate FROM task WHERE taskDone = 1 AND taskVerified = 0';

    mysql.db.query(querySelect, (err, row) => {
        res.status(200).send(row);
    })
}

/**
 * Task suppose to be done
 * and wait to be verified
 */
module.exports.updateDone = function(req,res) {
    var queryUpdate = 'UPDATE task SET taskDone = ? WHERE taskId = ?';
    var params = [req.taskDone, req.taskId];

    mysql.db.query(queryUpdate, params, (err, row) => {
        res.status(200).send(row)
    })

}

/**
 * Task done and verified by the admin
 */
module.exports.updateVerified = function(req,res) {
    var queryUpdate = 'UPDATE task SET taskVerified = ? WHERE taskId = ?';
    var params = [req.taskVerified, req.taskId];

    mysql.db.query(queryUpdate, params, (err, row) => {
        res.status(200).send(row)
    })

}

/**
 * Task undone and update to 0
 */
module.exports.updateUndone = function(req,res) {
    var queryUpdate = 'UPDATE task SET taskDone = ? WHERE taskId = ?';
    var params = [req.taskDone, req.taskId];

    mysql.db.query(queryUpdate, params, (err, row) => {
        res.status(200).send(row)
    })

}

/**
 * Delete one specific task
 */
module.exports.deleteOne = function(req,res) {
    var queryDelete = 'DELETE FROM task WHERE taskId = ?';
    var params = [ req.taskId];

    mysql.db.query(queryDelete, params, (err, row) => {
        res.status(200).send(row)
    })

}

/**
 * Delete all the tasks on the database
 */
module.exports.deleteAll = function(res) {
    var queryDelete = 'DELETE FROM task';

    mysql.db.query(queryDelete, (err, row) => {
        res.status(200).send(row)
    })

}