<template>
  <div class="vts-container">
    <input class="js-vts-input" type="text" readonly v-model="selectedName" @click.stop="handleInputClick">
    <input type="hidden" :name="name" v-model="selectedValue">
    <div class="vts-tree-container js-vts-tree-container" style="display: none;" v-show="showTree" data-tree @click.stop>
      <ul>
        <item
          v-for="(children, index) in tree"
          :key="index"
          :EventBus="EventBus"
          :tree="children"
          :expand="expand"
          :multiple="multiple"
          :selected="selected"
          :selectLeafOnly="selectLeafOnly"
          :icon="icon"
          :level="`${level}.${index}`">
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
      mode: {
        type: String,
        default: 'select',
      },
      tree: {
        type: Array,
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
      icon: {},
      level: {
        type: String,
        default: '0',
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
      const rect = $input.getBoundingClientRect();
      const w = rect.width - 2;
      const h = rect.height;
      const l = $input.offsetLeft;
      $treeContainer.style.cssText += `;width: ${w}px; top: ${h}px; left: ${l}px;`;
    },
    data() {
      return {
        EventBus: new Vue(),
        selected: [],
        showTree: false,
      };
    },
    methods: {
      attachEvents() {
        this.EventBus.$on('select', this.handleSelect);
        this.EventBus.$on('unselect', this.handleUnSelect);
        this.EventBus.$on('itemclick', this.handleItemClick);
      },
      handleInputClick() {
        this.showTree = !this.showTree;
      },
      handleSelect(opt) {
        if (this.selectLeafOnly && opt.isFolder) return;
        this.selected.push(opt);
        this.triggerChange(opt);
        if (!this.multiple) {
          this.showTree = false;
        }
      },
      handleUnSelect(opt) {
        let index = 0;
        for (; index < this.selectedLength; index += 1) {
          if (this.selected[index].value === opt.value) {
            break;
          }
        }
        if (index < this.selectedLength) {
          this.selected.splice(index, 1);
          if (this.multiple) {
            this.triggerChange(opt);
          }
        }
      },
      handleItemClick(opt) {
        this.$emit('itemclick', opt);
      },
      triggerChange(opt) {
        this.$emit('change', opt);
      },
    },
    computed: {
      selectedLength() {
        return this.selected.length;
      },
      selectedName() {
        return this.selected.map(el => el.name);
      },
      selectedValue() {
        return this.selected.map(el => el.value);
      },
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
