<template>
  <input
    type="checkbox"
    :name="name"
    ref="checkbox"
  >
</template>

<script>
  export default {
    name: 'Checkbox',
    props: {
      name: String,
      indeterminate: {
        type: Boolean,
        default: false,
      },
      checked: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      indeterminate (val) {
        this.$refs.checkbox.indeterminate = val
      },
      checked (val) {
        this.$refs.checkbox.checked = val
      },
    },
  }
</script>