<template>
  <div id="app">
    <tree-select 
      :tree="tree"
      :defaultSelected="['c2-value']"
      :multiple="true"
      :selectLeafOnly="false">
    </tree-select>
  </div>
</template>

<script>
import TreeSelect from './components/TreeSelect';

export default {
  name: 'app',
  data() {
    return {
      tree: {
        name: 'root',
        value: 'root-value',
        children: [{
          name: 'c1',
          value: 'c1-value',
        }, {
          name: 'c2',
          value: 'c2-value',
        }, {
          name: 'c3',
          value: 'c3-value',
          children: [{
            name: 'c4',
            value: 'c4-value',
          }],
        }],
      },
    };
  },
  components: {
    TreeSelect,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
