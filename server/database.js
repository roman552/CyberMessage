const mysql = require("mysql");

let connection = mysql.createConnection({
  database: "cybermessage",
  host: "localhost",
  port: 3307,
  user: "root",
  password: "",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected to database");
});

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, function (error, results) {
      if (error) return reject(error);
      return resolve(results);
    });
  });
}

module.exports = {
  executeQuery,
};
