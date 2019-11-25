var mysql = require('../config/DB');

module.exports.getAll = function(res) {
    var querySelectAll = 'SELECT * FROM employee';

    mysql.db.query(querySelectAll, (err, result) => {
        res.status(200).send(result);
    })
}


module.exports.addEmployee = function(req, res) {
    var queryInsert = 'INSERT INTO employee(employeeName, employeeFirstName, employeeEmail, userId) VALUES (?, ?, ?, ?)';
    var params = [req.employeeName, req.employeeFirstName, req.employeeEmail, req.userId];

    var querySelect = 'SELECT * FROM employee WHERE employeeName = ? AND employeeEmail = ?';
    
    mysql.db.query(querySelect, params, (err, search) => {
        
        if(search[0]) {
            if(req.employeeName == search[0].employeeName || req.employeeEmail == search[0].employeeEmail)
             res.status(401).send('Employee name already exists');

        } else {
            mysql.db.query(queryInsert, params, (err, result) => {
                if(err) res.status(400).send(err);

                res.status(200).send(result);
            })
        }   
        
        // No employee matches 
        if (search === []) {
            mysql.db.query(queryInsert, params, (err, result) => {
                if(err) res.status(400).send(err);

                res.status(200).send(result);
            })
        }
    })
};

module.exports.updateEmployee = function (req, res) {
    var queryUpdate = `UPDATE employee 
                        SET employeeName = ?, employeeFirstName = ?, employeeEmail = ?
                        WHERE employeeId = ?`;
    var params = [req.employeeName, req.employeeFirstName, req.employeeEmail, req.employeeId];

    mysql.db.query(queryUpdate, params, (err,result) => {
        if(err) res.status(401).send(err);

        res.status(200).send(result);
    })
}

module.exports.deleteEmployee = function (req, res) {
    var queryDelete = 'DELETE FROM employee WHERE employeeId = ?';
    var param = [req.id];

    mysql.db.query(queryDelete, param, (err, result) => {

        if(err) res.status(401).send(err);

        res.status(200).send(result);
    })
}


module.exports.deleteEmployees = function (req, res) {
    var queryDeleteAll = 'DELETE FROM employee';

    mysql.db.query(queryDeleteAll, (err, result) => {
        if(err) res.status(401).send(err);

        res.status(200).send(result);
    })
}