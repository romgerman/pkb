<template>
  <table>
    <thead>
      <tr>
        <td>Дата</td>
        <td>Эффективность</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <td>{{ new Date(item.Cal_date).toLocaleDateString() }}</td>
        <td>{{ (item.Efficiency * 100 || 0) + '%' }}</td>
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
    fetch('/portfolio/efficiency2')
    .then(res => res.json())
    .then(data => {
      this.items = data
    })
  }
}
</script>

