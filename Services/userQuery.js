var mysql = require('../config/DB');

module.exports.register = function(userData, res) {
    const querySelect = 'SELECT * FROM user WHERE userEmail = ?';
    const param = [userData.email];
    const query = 'INSERT INTO user (userName, userEmail, userPassword) VALUES (?, ?, ?)';
    const params = [userData.username, userData.email, userData.password];

    mysql.db.query(querySelect, param, (err, row) => {
        if(row[0]) {
            if (userData.email === row[0].clientEmail) {
                console.log(row);
                res.status(401).send('The user already exist');
            }
        }else {
            mysql.db.query(query, params, (err, result) => {
                if (err) {
                    res.status(400).send(err)
                } else {
                    res.status(200).send(result)
                }

            });
        }

    });
}


module.exports.login = function(userData, res) {
    const query = 'SELECT userName, userPassword FROM user WHERE userPassword = ? AND userName = ?';
    const param = [userData.password, userData.username];

    mysql.db.query(query, param, (err, row) => {
        if (err) res.send(err);

        if (row[0]) {

            if (userData.username !== row[0].userName) {

                console.log('Invalid email', row[0].userName);

                res.status(401).send('Invalid email');

            } else if (userData.password !== row[0].userPassword) {

                console.log('Invalid password', row[0].userPassword);

                res.status(401).send('Invalid password');

            } else {
                res.status(200).send(row);
            }

        } else {
            res.status(401).send('User don\'t exists');
        }

    });
};