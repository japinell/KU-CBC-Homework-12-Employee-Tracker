//
const mysql = require("mysql");
//
//  Department class
//
class Department {
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
module.exports = { Department };
//
