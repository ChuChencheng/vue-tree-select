<template>
  <ul>
    <TreeItem v-for="(child, index) in tree"
      :key="index"
      :tree="child"
      :multiple="multiple" />
  </ul>
</template>

<script>
import TreeItem from './TreeItem'

export default {
  name: 'TreeList',
  components: [
    TreeItem,
  ],
  props: {
    tree: {
      type: Array,
      default: () => [],
    },
    mode: {
      type: String,
      default: 'select',
      validator: (value) => {
        return [
          'select',
          'view',
          'edit',
          'menu',
        ].indexOf(value) > -1
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {

    }
  },
}
</script>
