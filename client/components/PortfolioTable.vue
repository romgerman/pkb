<template>
  <table>
    <thead>
      <tr>
        <td>Индекс</td>
        <td>Название</td>
        <td>Дата подписания</td>
        <td>Дата окончания</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <td>{{ item.Id_portfolio }}</td>
        <td>{{ item.Portfolio_name }}</td>
        <td>{{ new Date(item.Sign_date).toLocaleDateString() }}</td>
        <td>{{ new Date(item.End_date).toLocaleDateString() }}</td>
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
    fetch('/portfolio')
    .then(res => res.json())
    .then(data => {
      this.items = data
    })
  }
}
</script>

