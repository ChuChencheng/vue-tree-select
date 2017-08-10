<template>
  <li>
    <div class="vts-option" @click="handleSelect(tree.value)">
      <span class="vts-expander" v-if="isFolder" @click.stop="handleExpand">{{ open ? '-' : '+' }}</span>
      <span :class="icon"></span>
      <span :data-value="tree.value">{{ tree.name }}</span>
    </div>
    <ul v-if="isFolder" v-show="open">
      <item
        v-for="(children, index) in tree.children"
        :key="index"
        :tree="children"
        :level="`${level}.${index}`"
        @select="handlePassSelect($event)">
      </item>
    </ul>
  </li>
</template>

<script>
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
    handleSelect(value) {
      console.log(this.level);
      this.$emit('select', value);
    },
    handlePassSelect(value) {
      this.handleSelect(value);
    },
  },
  computed: {
    isFolder() {
      return this.tree.children && this.tree.children.length;
    },
  },
};
</script>

<style lang="less" scoped>
  ul {
    list-style-type: none;
  }
  .vts-option {
    cursor: default;
    user-select: none;
    &:hover{
      background-color: #ade4ec;
    }
  }
  .vts-expander {
    cursor: pointer;
  }
</style>