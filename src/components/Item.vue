<template>
  <li>
    <div class="vts-option" :class="{ 'vts-selected': selected }" @click="handleSelect">
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
    created() {
      this.attachEvents();
    },
    data() {
      return {
        open: true,
        selected: false,
      };
    },
    methods: {
      attachEvents() {
        EventBus.$on('select', this.handleOtherSelect);
      },
      handleExpand() {
        this.open = !this.open;
      },
      handleSelect() {
        const opt = {
          name: this.tree.name,
          value: this.tree.value,
          level: this.level,
        };
        EventBus.$emit('select', opt);
        this.selected = true;
      },
      handleOtherSelect(opt) {
        if (opt.value !== this.tree.value) {
          this.selected = false;
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
    &:hover{
      background-color: #ade4ec;
    }
  }
  .vts-expander {
    cursor: pointer;
  }
  .vts-selected {
    background-color: #ade4ec;
  }
</style>