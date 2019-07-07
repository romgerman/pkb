<template>
  <table>
    <thead>
      <tr>
        <td>Имя портфеля</td>
        <td>Эффективность</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <td>{{ item.Portfolio_name }}</td>
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
    fetch('/portfolio/efficiency')
    .then(res => res.json())
    .then(data => {
      this.items = data
    })
  }
}
</script>

