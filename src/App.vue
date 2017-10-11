<template>
  <div id="app">
    <div style="width: 600px;float: left;">
      <tree-select 
        :tree="tree"
        :defaultSelected="[{name: 'c2', value: 'c2-value'}]"
        :multiple="true"
        :selectLeafOnly="true">
      </tree-select>
    </div>
    <div style="width: 600px;float: left;">
      <tree-select 
        :tree="tree"
        :defaultSelected="[{name: 'c4', value: 'c4-value'}]"
        :multiple="false"
        :selectLeafOnly="false">
      </tree-select>
    </div>
  </div>
</template>

<script>
import TreeSelect from './components/TreeSelect'

export default {
  name: 'app',
  data () {
    return {
      tree: [
        {
          name: 'root',
          value: 'root-value',
          children: [
            {
              name: 'c1',
              value: 'c1-value',
            }, {
              name: 'c2',
              value: 'c2-value',
            }, {
              name: 'c3',
              value: 'c3-value',
              children: [
                {
                  name: 'c4',
                  value: 'c4-value',
                }, {
                  name: 'c5',
                  value: 'c5-value',
                },
              ],
            },
          ],
        }, {
          name: 'root2',
          value: 'root2-value',
        },
      ],
    }
  },
  components: {
    TreeSelect,
  },
}
</script>

<style>
#app {
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input {
  width: 500px;
}
</style>
