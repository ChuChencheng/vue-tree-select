<template>
  <div class="vts-container">
    <input class="js-vts-input" type="text" :name="name" readonly v-model="selected" @click.stop="handleInputClick">
    <div class="vts-tree-container js-vts-tree-container" style="display: none;" v-show="showTree" data-tree @click.stop>
      <ul>
        <item :tree="tree"></item>
      </ul>
    </div>
  </div>
</template>

<script>
  import EventBus from './EventBus';
  import Item from './Item';

  export default {
    name: 'tree-select',
    props: {
      name: {},
      tree: {
        type: Object,
        required: true,
      },
      defaultSelected: {
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      expand: {
        type: Boolean,
        default: true,
      },
    },
    created() {
      this.attachEvents();
    },
    mounted() {
      document.addEventListener('click', (e) => { if (!e.target.hasAttribute('data-tree')) { this.showTree = false; } });
      const $input = this.$el.querySelector('.js-vts-input');
      const $treeContainer = this.$el.querySelector('.js-vts-tree-container');
      const w = $input.getBoundingClientRect().width - 1;
      const h = $input.getBoundingClientRect().height;
      const l = $input.offsetLeft;
      $treeContainer.style.cssText += `;width: ${w}px; top: ${h}px; left: ${l}px;`;
    },
    data() {
      return {
        selected: [],
        showTree: false,
      };
    },
    methods: {
      attachEvents() {
        EventBus.$on('select', this.handleSelect);
      },
      handleInputClick() {
        this.showTree = !this.showTree;
      },
      handleSelect(selectedOpt) {
        if (this.multiple) {
          this.selected.push(selectedOpt.value);
          this.selected = [...new Set(this.selected)];
        } else {
          this.selected = [selectedOpt.value];
          this.showTree = false;
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
    ul {
      padding: 0;
    }
  }
</style>
