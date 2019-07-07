CREATE TABLE IF NOT EXISTS person (
  Id_person INT PRIMARY KEY AUTO_INCREMENT,
  FIO TEXT
);

CREATE TABLE IF NOT EXISTS portfolio (
  Id_portfolio INT PRIMARY KEY AUTO_INCREMENT,
  Portfolio_name TEXT,
  Sign_date DATE,
  End_date DATE
);

CREATE TABLE IF NOT EXISTS debt (
  Id_person INT,
  Id_debt INT PRIMARY KEY,
  Id_portfolio INT,
  Debt_sum INT,
  FOREIGN KEY (Id_person) REFERENCES person(Id_person),
  FOREIGN KEY (Id_portfolio) REFERENCES portfolio(Id_portfolio)
);

CREATE TABLE IF NOT EXISTS calendar (
  Cal_date DATE
);

CREATE TABLE IF NOT EXISTS payment (
  Id_debt INT,
  Payment_sum INT,
  `Date` DATE,
  FOREIGN KEY (Id_debt) REFERENCES debt(Id_debt)
);