<template>
  <div ref="drop" v-show="showDrop" @click="handleDropClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'drop',
    props: {
      hideOnClick: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        showDrop: false,
      }
    },
    mounted () {
      document.addEventListener('click', this.handleClickOutside)
    },
    destroyed () {
      document.removeEventListener('click', this.handleClickOutside)
    },
    methods: {
      handleClickOutside (e) {
        if (this.$refs.drop.contains(e.target)) {
          return false
        }
        this.showDrop = false
        this.$emit('clickoutside')
      },
      handleDropClick (e) {
        if (this.hideOnClick) {
          this.showDrop = false
        }
      },
    },
  }
</script>