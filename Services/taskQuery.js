var mysql = require('../config/DB');

module.exports.findAll = function(res) {
    var querySelect = 'SELECT taskName, taskDate FROM task';

    mysql.db.query(querySelect, (err, row) => {
        res.status(200).send(row);
    })
}