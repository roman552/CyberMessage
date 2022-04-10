const mysql = require("mysql");
const config = require("./config.json");

let connection = mysql.createConnection({
  database: config.database.databaseName,
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  multipleStatements: true,
});

function connectToDB() {
  connection.connect((err) => {
    if (err) {
      console.error(err);
      setTimeout(reconnect, 5000);
      return;
    }
    console.log("connected to database");
  });
}

function reconnect() {
  if (connection) connection.destroy();
  connection = mysql.createConnection({
    database: config.database.databaseName,
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    multipleStatements: true,
  });
  connectToDB();
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
