<template>
  <table>
    <thead>
      <tr>
        <td>Индекс долга</td>
        <td>Сумма долга</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <td>{{ item.Id_debt }}</td>
        <td>{{ item.Debt_sum }}</td>
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
    fetch('/debt/nopayment')
    .then(res => res.json())
    .then(data => {
      this.items = data
    })
  }
}
</script>

