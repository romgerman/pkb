<template>
  <table>
    <thead>
      <tr>
        <td>Индекс</td>
        <td>ФИО</td>
        <td>Портфель</td>
        <td>Сумма долга</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <td>{{ item.Id_debt }}</td>
        <td>
          <inline-edit :text="item.FIO" @completed="editCompleted($event, item.Id_person)" />
        </td>
        <td>{{ item.Portfolio_name }}</td>
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
    fetch('/debt')
    .then(res => res.json())
    .then(data => {
      this.items = data
    })
  },
  methods: {
    editCompleted(text, id) {
      let data = {
        fio: text,
        id
      }
      
      fetch('/person', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then()

      let item = this.items.find(x => x.Id_person === id)
      item.FIO = text
      let index = this.items.indexOf(item)
      this.items[index] = item
      this.items = this.items
    }
  },
  components: {
    'inline-edit': require('./InlineEditInput.vue').default
  }
}
</script>