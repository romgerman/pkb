<template>
  <table>
    <thead>
      <tr>
        <td>Индекс должника</td>
        <td>ФИО</td>
        <td>Сумма долга</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <td>{{ item.Id_person }}</td>
        <td>{{ item.FIO }}</td>
        <td>{{ item.Sum }}</td>
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
    fetch('/person')
    .then(res => res.json())
    .then(data => {
      this.items = data
    })
  }
}
</script>

