<template>
  <li>
    <label>
      <div class="vts-option" :class="{ 'vts-selected': isSelected }" @click="handleSingleSelect">
        <span class="vts-space" v-for="n in getLayer - 1">&nbsp;</span>
        <span class="vts-expander" v-if="isFolder" @click.stop.prevent="handleExpand">{{ isOpen ? '-' : '+' }}</span>
        <span v-if="multiple"><input type="checkbox" v-model="isSelected" @change="handleMultipleSelect" ref="checkbox"></span>
        <span v-if="icon && icon.length" :class="icon"></span>
        <span :data-value="tree.value">{{ tree.name }}</span>
      </div>
    </label>
    <ul v-if="isFolder" v-show="isOpen">
      <item
        v-for="(children, index) in tree.children"
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
  </li>
</template>

<script>
  export default {
    name: 'item',
    props: {
      EventBus: {},
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
        this.EventBus.$on('select', this.handleOtherSelect);
        this.EventBus.$on('unselect', this.handleOtherUnSelect);
      },
      handleExpand() {
        this.isOpen = !this.isOpen;
      },
      handleSingleSelect() {
        if (this.multiple) return;
        if (this.selectLeafOnly && this.isFolder) return;
        this.isSelected = true;
      },
      handleMultipleSelect() {
        if (this.isFolder) {
          this.checkAllChildren(this.$children, this.isSelected);
        }
      },
      handleOtherSelect(opt) {
        if (this.multiple) {
          this.checkOtherMultipleToggleSelect(opt);
        } else if (opt.value !== this.tree.value) {
          this.isSelected = false;
        }
      },
      handleOtherUnSelect(opt) {
        if (this.multiple) {
          this.checkOtherMultipleToggleSelect(opt);
        }
      },
      checkOtherMultipleToggleSelect(opt) {
        if (this.level < opt.level && this.isFolder) {
          this.$refs.checkbox.indeterminate = false;
          const type = this.isCheckedOrIndeterminate(this.$children);
          switch (type) {
            case 'checked':
              this.isSelected = true;
              break;
            case 'unchecked':
              this.isSelected = false;
              break;
            case 'indeterminate':
              this.isSelected = false;
              this.$refs.checkbox.indeterminate = true;
              break;
            default:
          }
        }
      },
      checkAllChildren($children, check) {
        $children.forEach((element) => {
          const el = element;
          el.isSelected = check;
          this.checkAllChildren(element.$children, check);
        });
      },
      isCheckedOrIndeterminate($children) {
        if ($children.every(el => el.isSelected)) {
          return 'checked';
        }
        if ($children.some(el => el.isSelected)) {
          return 'indeterminate';
        }
        return 'unchecked';
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
    watch: {
      isSelected(newVal) {
        const opt = {
          name: this.tree.name,
          value: this.tree.value,
          level: this.level,
          isFolder: this.isFolder,
        };
        if (newVal) {
          this.EventBus.$emit('select', opt);
        } else {
          this.EventBus.$emit('unselect', opt);
        }
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