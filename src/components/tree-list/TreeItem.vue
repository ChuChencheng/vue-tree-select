<template>
  <li>
    <label @click="handleSelect">
      <span v-if="isFolder"
        v-text="folderButton"
        @click.stop="handleExpand"></span>
      <span v-if="multiple">
        <Checkbox :checked="checkbox.checked"
          :indeterminate="checkbox.indeterminate"
          @click="handleCheck" />
      </span>
    </label>
    <ul>
      <TreeItem v-for="(child, index) in tree.children"
        :key="index"
        :tree="child"
        :multiple="multiple" />
    </ul>
  </li>
</template>

<script>
import Checkbox from '../checkbox'

export default {
  name: 'TreeItem',
  components: [
    Checkbox,
  ],
  props: {
    tree: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      text: this.tree.text || '',
      value: this.tree.value || '',
      disabled: this.tree.disabled || false,
      expanded: this.tree.expanded || false,
      checkbox: {
        checked: false,
        indeterminate: false,
      },
      selected: false,
    }
  },
  methods: {
    handleExpand () {
      this.expanded = !this.expanded
    },
    handleCheck () {},
    handleSelect () {
      this.selected = true
    },
  },
  computed: {
    isFolder () {
      return this.tree.children && this.tree.children.length
    },
    folderButton () {
      return this.expanded ? '-' : '+'
    },
  },
}
</script>
