const Router = require('koa-router')
const utils = require('./utils')

const router = new Router()

function dbQuery(ctx, query) {
  return new Promise((resolve, reject) => {
    ctx.db.query(query, (error, results, fields) => {
      if (error) reject(error)
  
      resolve(results)
    })
  })
}

router.use(async (ctx, next) => {
  ctx.type = 'application/json'
  await next()
})

function selectDebts(ctx) {
  let query = 'SELECT * FROM debt JOIN person ON debt.Id_person = person.Id_person LEFT JOIN portfolio ON debt.Id_portfolio = portfolio.Id_portfolio'

  return dbQuery(ctx, query).then(result => JSON.stringify(result))
}

router.get('/debt', async (ctx) => {
  ctx.body = await selectDebts(ctx)
})

function selectPortfolios(ctx) {
  let query = 'SELECT * FROM portfolio'
  
  return dbQuery(ctx, query).then(result => JSON.stringify(result))
}

router.get('/portfolio', async ctx => {
  ctx.body = await selectPortfolios(ctx)
})

function selectPayments(ctx) {
  let query = 'SELECT * FROM payment JOIN debt ON payment.Id_debt = debt.Id_debt'
  
  return dbQuery(ctx, query).then(result => JSON.stringify(result))
}

router.get('/payment', async ctx => {
  ctx.body = await selectPayments(ctx)
})

function selectPersons(ctx) {
  let query = 'SELECT p.Id_person, p.FIO, SUM(d.Debt_sum) as Sum FROM person p JOIN debt d ON p.Id_person = d.Id_person GROUP BY d.Id_person HAVING SUM(d.Debt_sum) > 150'
  
  return dbQuery(ctx, query).then(result => JSON.stringify(result))
}

router.get('/person', async ctx => {
  ctx.body = await selectPersons(ctx)
})

function selectPortfolioDebtSum(ctx) {
  let query = 'SELECT c.Cal_date, SUM(d.Debt_sum) as Portfolio_sum FROM calendar AS c JOIN portfolio AS p ON c.Cal_date >= p.Sign_date AND c.Cal_date <= p.End_date JOIN debt as d ON d.Id_portfolio = p.Id_portfolio GROUP BY c.Cal_date'

  return dbQuery(ctx, query).then(result => JSON.stringify(result))
}

router.get('/portfolio/work', async ctx => {
  ctx.body = await selectPortfolioDebtSum(ctx)
})

function selectPortfolioEfficiency(ctx) {
  let query = 'SELECT p.Portfolio_name, (ps.PaymentSum / ds.DebtSum) AS Efficiency FROM portfolio AS p LEFT JOIN(SELECT p.Id_portfolio, SUM(d.Debt_sum) as DebtSum FROM portfolio AS p LEFT JOIN debt AS d ON d.Id_portfolio = p.Id_portfolio GROUP BY p.Id_portfolio) AS ds ON p.Id_portfolio = ds.Id_portfolio LEFT JOIN(SELECT p.Id_portfolio, SUM(pay.Payment_sum) as PaymentSum FROM portfolio AS p JOIN debt AS d ON d.Id_portfolio = p.Id_portfolio LEFT JOIN payment AS pay ON pay.Id_debt = d.Id_debt GROUP BY p.Id_portfolio) AS ps ON p.Id_portfolio = ps.Id_portfolio GROUP BY p.Id_portfolio'

  return dbQuery(ctx, query).then(result => JSON.stringify(result))
}

router.get('/portfolio/efficiency', async ctx => {
  ctx.body = await selectPortfolioEfficiency(ctx)
})

function selectMonthEfficiency(ctx) {
  let query = `
  SELECT c.Cal_date, (ms.PaymentSum / wp.PortfolioSum) as Efficiency FROM calendar AS c 
  LEFT JOIN(
    SELECT c.Cal_date, SUM(pay.Payment_sum) as PaymentSum
    FROM calendar AS c
    LEFT JOIN payment AS pay
    ON pay.Date >= c.Cal_date AND pay.Date <= DATE_ADD(pay.Date, INTERVAL 1 MONTH)
    GROUP BY c.Cal_date
  ) AS ms ON c.Cal_date = ms.Cal_date 
  LEFT JOIN(
    SELECT c.Cal_date, SUM(d.Debt_sum) as PortfolioSum 
    FROM calendar AS c 
    JOIN portfolio AS p 
    ON c.Cal_date >= p.Sign_date AND c.Cal_date <= p.End_date 
    JOIN debt as d ON d.Id_portfolio = p.Id_portfolio 
    GROUP BY c.Cal_date
  ) AS wp ON c.Cal_date = wp.Cal_date
  `.replace(/\n|(\s\s+)/, '')

  return dbQuery(ctx, query).then(result => JSON.stringify(result))
}

router.get('/portfolio/efficiency2', async ctx => {
  ctx.body = await selectMonthEfficiency(ctx)
})

function selectDebtWithoutPayment(ctx) {
  let query = 'SELECT * FROM debt AS d WHERE d.Id_debt NOT IN (SELECT Id_debt FROM payment)'

  return dbQuery(ctx, query).then(result => JSON.stringify(result))
}

router.get('/debt/nopayment', async ctx => {
  ctx.body = await selectDebtWithoutPayment(ctx)
})

module.exports = router.routes()