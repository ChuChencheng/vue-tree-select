<template>
  <div class="vts-container">
    <input class="js-vts-input" type="text" :name="name" readonly v-model="selected" @click.stop="handleInputClick">
    <div class="vts-tree-container js-vts-tree-container" style="display: none;" v-show="showTree" data-tree @click.stop>
      <ul>
        <item 
          :EventBus="EventBus"
          :tree="tree"
          :expand="expand"
          :multiple="multiple"
          :selected="selected"
          :selectLeafOnly="selectLeafOnly">
        </item>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Item from './Item';

  export default {
    name: 'tree-select',
    props: {
      name: {},
      tree: {
        type: Object,
        required: true,
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      selectLeafOnly: {
        type: Boolean,
        default: true,
      },
      expand: {
        type: Boolean,
        default: true,
      },
      defaultSelected: {
        type: Array,
        default: () => [],
      },
    },
    created() {
      this.attachEvents();
    },
    mounted() {
      document.addEventListener('click', (e) => { if (!e.target.hasAttribute('data-tree')) { this.showTree = false; } });
      const $input = this.$el.querySelector('.js-vts-input');
      const $treeContainer = this.$el.querySelector('.js-vts-tree-container');
      const w = $input.getBoundingClientRect().width - 2;
      const h = $input.getBoundingClientRect().height;
      const l = $input.offsetLeft;
      $treeContainer.style.cssText += `;width: ${w}px; top: ${h}px; left: ${l}px;`;
    },
    data() {
      return {
        EventBus: new Vue(),
        selected: this.defaultSelected,
        showTree: false,
      };
    },
    methods: {
      attachEvents() {
        this.EventBus.$on('select', this.handleSelect);
        this.EventBus.$on('unselect', this.handleUnSelect);
      },
      handleInputClick() {
        this.showTree = !this.showTree;
      },
      handleSelect(opt) {
        if (this.selectLeafOnly && opt.isFolder) return;
        this.selected.push(opt.value);
        this.selected = [...new Set(this.selected)];
        if (!this.multiple) {
          this.showTree = false;
        }
      },
      handleUnSelect(opt) {
        const index = this.selected.indexOf(opt.value);
        if (index > -1) {
          this.selected.splice(index, 1);
        }
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
<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .vts-container {
    max-width: 300px;
    max-height: 400px;
    position: relative;
  }
  ul {
    list-style-type: none;
  }
  input, .vts-tree-container {
    border: 1px solid #c4c4c4;
  }
  .vts-tree-container {
    text-align: left;
    position: absolute;
    top: 0;
    left: 0;
    overflow-x: auto;
    ul {
      padding: 0;
      min-width: 100%;
    }
  }
</style>
