<template>
  <li>
    <div class="vts-option" :class="{ 'vts-selected': isSelected }" @click="handleSelect">
      <span class="vts-space" v-for="n in getLayer - 1">&nbsp;</span>
      <span class="vts-expander" v-if="isFolder" @click.stop="handleExpand">{{ isOpen ? '-' : '+' }}</span>
      <span v-if="multiple"><input type="checkbox" :checked="isSelected"></span>
      <span v-if="icon && icon.length" :class="icon"></span>
      <span :data-value="tree.value">{{ tree.name }}</span>
    </div>
    <ul v-if="isFolder" v-show="isOpen">
      <item
        v-for="(children, index) in tree.children"
        :key="index"
        :tree="children"
        :expand="expand"
        :multiple="multiple"
        :selected="selected"
        :selectLeafOnly="selectLeafOnly"
        :icon="icon"
        :level="`${level}.${index}`">
      </item>
    </ul>
  </li>
</template>

<script>
  import EventBus from './EventBus';

  export default {
    name: 'item',
    props: {
      tree: {
        type: Object,
        required: true,
      },
      expand: Boolean,
      multiple: Boolean,
      selected: Array,
      selectLeafOnly: Boolean,
      level: {
        type: String,
        default: '0',
      },
      icon: String,
    },
    created() {
      this.initSelected();
      this.attachEvents();
    },
    data() {
      return {
        isOpen: this.expand,
        isSelected: false,
      };
    },
    methods: {
      initSelected() {
        this.isSelected = this.selected.indexOf(this.tree.value) > -1;
      },
      attachEvents() {
        EventBus.$on('select', this.handleOtherSelect);
      },
      handleExpand() {
        this.isOpen = !this.isOpen;
      },
      handleSelect() {
        if (this.selectLeafOnly && this.isFolder) {
          return;
        }
        const opt = {
          name: this.tree.name,
          value: this.tree.value,
          level: this.level,
        };
        EventBus.$emit('select', opt);
        this.isSelected = true;
      },
      handleOtherSelect(opt) {
        if (opt.value !== this.tree.value) {
          this.isSelected = false;
        }
      },
    },
    computed: {
      isFolder() {
        return this.tree.children && this.tree.children.length;
      },
      getLayer() {
        return this.isFolder ? this.level.split('.').length : this.level.split('.').length + 1;
      },
    },
  };
</script>

<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  .vts-option {
    height: 20px;
    cursor: default;
    user-select: none;
    font-size: 0;  //解决inline-block span存在间隙问题
    &:hover{
      background-color: #ade4ec;
    }
    span {
      display: inline-block;
      width: 18px;
      height: 20px;
      line-height: 20px;
      text-align: left;
      font-size: 14px;
    }
  }
  .vts-expander {
    cursor: pointer;
  }
  .vts-selected {
    background-color: #ade4ec;
  }
</style>