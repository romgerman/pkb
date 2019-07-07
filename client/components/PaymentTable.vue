<template>
  <table>
    <thead>
      <tr>
        <td>Индекс долга</td>
        <td>Сумма долга</td>
        <td>Сумма платежа</td>
        <td>Дата платежа</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <td>{{ item.Id_debt }}</td>
        <td>{{ item.Debt_sum }}</td>
        <td>{{ item.Payment_sum }}</td>
        <td>{{ new Date(item.Date).toLocaleDateString() }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  mounted() {
    fetch('/payment')
    .then(res => res.json())
    .then(data => {
      this.items = data
    })
  }
}
</script>

