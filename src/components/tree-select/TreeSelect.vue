<template>
  <div>
    <div @click="handleTriggerClick">
      <slot>
        <input type="text">
      </slot>
    </div>
    <DropDown :show="showDrop">
      <TreeList :tree="tree" />
    </DropDown>
  </div>
</template>

<script>
import DropDown from '../drop-down'
import TreeList from '../tree-list'

export default {
  name: 'TreeSelect',
  components: {
    DropDown,
    TreeList,
  },
  props: {
    tree: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      showDrop: false,
    }
  },
  methods: {
    handleTriggerClick () {
      this.showDrop = !this.showDrop
    },
  },
}
</script>
