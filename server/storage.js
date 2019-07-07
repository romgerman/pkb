const mysql = require('mysql')
const utils = require('./utils')

// CREATE DATABASE `collection` /*!40100 COLLATE 'utf8_general_ci' */

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'collection',
  port     : '3306'
})

const createPersonTableSQL = `
CREATE TABLE IF NOT EXISTS person (
  Id_person int PRIMARY KEY AUTO_INCREMENT,
  FIO text
);
`

const createPortfolioTableSQL = `
CREATE TABLE IF NOT EXISTS portfolio (
  Id_portfolio int PRIMARY KEY AUTO_INCREMENT,
  Portfolio_name text,
  Sign_date date,
  End_date date
);
`

const createDebtTableSQL = `
CREATE TABLE IF NOT EXISTS debt (
  Id_person int,
  Id_debt int PRIMARY KEY,
  Id_portfolio int,
  Debt_sum int,
  FOREIGN KEY (Id_person) REFERENCES person(Id_person),
  FOREIGN KEY (Id_portfolio) REFERENCES portfolio(Id_portfolio)
);
`

const createCalendarTableSQL = `
CREATE TABLE IF NOT EXISTS calendar (
  Cal_date date
);
`

const createPaymentTableSQL = `
CREATE TABLE IF NOT EXISTS payment (
  Id_debt int,
  Payment_sum int,
  \`Date\` date,
  FOREIGN KEY (Id_debt) REFERENCES debt(Id_debt)
);
`

function migrate(completed) {
  utils.sequence([
    (ready) => connection.query(createPersonTableSQL, (error, results, fields) => {
      ready()
    }),
    (ready) => connection.query(createPortfolioTableSQL, (error, results, fields) => {
      ready()
    }),
    (ready) => connection.query(createDebtTableSQL, (error, results, fields) => {
      ready()
    }),
    (ready) => connection.query(createCalendarTableSQL, (error, results, fields) => {
      ready()
    }),
    (ready) => connection.query(createPaymentTableSQL, (error, results, fields) => {
      ready()
    })
  ], () => {
    console.log("Migration finished")
    completed()
  })
}

function connectAndMigrate(doneCallback) {
  connection.connect(() => {
    migrate(() => {
      doneCallback(connection)
    })
  })
}

module.exports.connectAndMigrate = connectAndMigrate