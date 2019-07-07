const Vue = require('vue/dist/vue')

new Vue({
  el: '#app',
  components: {
    'debt-table': require('./components/DebtTable.vue').default,
    'payment-table': require('./components/PaymentTable.vue').default,
    'portfolio-table': require('./components/PortfolioTable.vue').default,
    'person-table': require('./components/PersonTable.vue').default,
    'work-portfolio-table': require('./components/WorkPortfolio.vue').default,
    'portfolio-efficiency': require('./components/PortfolioEfficiency.vue').default,
    'month-efficiency': require('./components/MonthEfficiency.vue').default,
    'debt-without-payment': require('./components/DebtWithoutPayment.vue').default
  }
})