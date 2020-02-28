var mysql = require('mysql');

class MySQL{
    constructor() {
        this.db = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'coolbreeze01',
            database: 'tasksreminder',
            port: 3306
        });
    }
} 



module.exports = new MySQL();