var mysql = require('mysql');

class MySQL{
    constructor() {
        this.db = mysql.createPool({
            host: 'HOSTNAME',
            user: 'USERNAME',
            password: 'PASSWORD',
            database: 'DATABASE_NAME',
            port: 3306
        });
    }
} 



module.exports = new MySQL();