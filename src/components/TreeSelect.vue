<template>
  <div>
    <input type="text" :name="name" readonly v-model="selected" @click.stop="handleInputClick">
    <div v-show="showTree" data-tree>
      <ul>
        <item></item>
      </ul>
    </div>
  </div>
</template>

<script>
import Item from './Item';

export default {
  name: 'tree-select',
  props: {
    name: {},
    tree: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    document.addEventListener('click', (e) => { if (!e.target.hasAttribute('data-tree')) { this.showTree = false; } });
  },
  data() {
    return {
      selected: [],
      showTree: false,
    };
  },
  methods: {
    handleInputClick() {
      this.showTree = !this.showTree;
    },
  },
  computed: {

  },
  components: {
    Item,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
}
</style>
