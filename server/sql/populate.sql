INSERT INTO person values(1, 'Иванов И.И.');
INSERT INTO person values(2, 'Петров И.И.');
INSERT INTO person values(3, 'Сидоров И.И.');
INSERT INTO person values(4, 'Сергеев И.И.');

INSERT INTO portfolio values(1, 'PORTFOLIO_1', '2011-01-01', '2013-01-21');
INSERT INTO portfolio values(2, 'PORTFOLIO_2', '2012-05-06', '2012-09-20');
INSERT INTO portfolio values(3, 'PORTFOLIO_3', '2012-11-21', '2013-03-16');
INSERT INTO portfolio values(4, 'PORTFOLIO_4', '2012-12-01', '2013-06-11');

INSERT INTO debt values(1, 1, 1, 100);
INSERT INTO debt values(1, 2, 2, 200);
INSERT INTO debt values(3, 3, 1, 300);
INSERT INTO debt values(4, 4, 3, 400);

INSERT INTO payment values(1, 10, '2012-05-12');
INSERT INTO payment values(1, 20, '2012-05-28');
INSERT INTO payment values(3, 30, '2012-06-10');
INSERT INTO payment values(4, 10, '2012-12-01');

SET @StartDate = '2011-01-01';
SET @EndDate = '2014-01-01';
SET @CurrentDate = @StartDate;

DELIMITER // 

CREATE PROCEDURE fill_dates()
BEGIN
	WHILE (@CurrentDate < @EndDate) DO
	  INSERT INTO calendar values(@CurrentDate);
	
	  SET @CurrentDate = DATE_ADD(@CurrentDate, INTERVAL 1 MONTH);
	END WHILE;
END;//

DELIMITER ;

CALL fill_dates();

DROP procedure IF EXISTS fill_dates;