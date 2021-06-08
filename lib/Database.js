//
const mysql = require("mysql");
//
//  Database class
//
class Database {
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.conn.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.conn.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}
//
module.exports = { Database };
//
