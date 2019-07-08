<template>
  <span title="Нажмите для редактирования">
    <span @click="editing = true" v-if="!editing">{{ inputText }}</span>
    <input type="text" v-model="inputText" @blur="editCompleted" v-if="editing" autofocus />
  </span>
</template>

<script>
/**
 * Events: completed
 */

export default {
  props: [ 'text' ],
  data() {
    return {
      editing: false,
      inputText: this.text
    }
  },
  methods: {
    editCompleted() {
      this.editing = false
      this.$emit('completed', this.inputText)
    }
  }
}
</script>

