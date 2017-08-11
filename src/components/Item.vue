<template>
  <li>
    <div class="vts-option" @click="handleSelect">
      <span v-for="n in getLayer - 1">&nbsp;</span>
      <span class="vts-expander" v-if="isFolder" @click.stop="handleExpand">{{ open ? '-' : '+' }}</span>
      <span :class="icon"></span>
      <span :data-value="tree.value">{{ tree.name }}</span>
    </div>
    <ul v-if="isFolder" v-show="open">
      <item
        v-for="(children, index) in tree.children"
        :key="index"
        :tree="children"
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
    selectLeafOnly: {
      type: Boolean,
      default: true,
    },
    level: {
      type: String,
      default: '0',
    },
    icon: String,
  },
  data() {
    return {
      open: true,
    };
  },
  methods: {
    handleExpand() {
      this.open = !this.open;
    },
    handleSelect() {
      const opt = {
        name: this.tree.name,
        value: this.tree.value,
        level: this.value,
      };
      EventBus.$emit('select', opt);
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
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  .vts-option {
    cursor: default;
    user-select: none;
    &:hover{
      background-color: #ade4ec;
    }
    & span {
      display: inline-block;
      width: 5px;
    }
  }
  .vts-expander {
    cursor: pointer;
  }
</style>