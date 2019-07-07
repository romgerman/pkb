<template>
  <table>
    <thead>
      <tr>
        <td>Дата</td>
        <td>Сумма портфеля</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <td>{{ new Date(item.Cal_date).toLocaleDateString() }}</td>
        <td>{{ item.Portfolio_sum  }}</td>
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
    fetch('/portfolio/work')
    .then(res => res.json())
    .then(data => {
      this.items = data
    })
  }
}
</script>

