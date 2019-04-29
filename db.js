var db = require('mysql');
var dbCred = require('./db_creds.json');
var connection = db.createConnection(dbCred);

module.exports = connection;
