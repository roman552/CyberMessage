const mysql = require("mysql");
const config = require("./config.json");

let connection = mysql.createConnection({
  database: config.database.databaseName,
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
});

function connectToDB() {
  connection.connect((err) => {
    if (err) throw err;
    console.log("connected to database");
  });
}

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, function (error, results) {
      if (error) return reject(error);
      return resolve(results);
    });
  });
}

module.exports = {
  connectToDB,
  executeQuery,
};
