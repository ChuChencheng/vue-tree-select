<template>
  <div id="app">
    <div>
      <tree-select 
        :tree="tree"
        :defaultSelected="[{name: 'c2', value: 'c2-value'}]"
        :multiple="true"
        :selectLeafOnly="true">
      </tree-select>
    </div>
    <div>
      <tree-select 
        :tree="tree"
        v-model=""
        :defaultSelected="[{name: 'c4', value: 'c4-value'}]"
        :multiple="false"
        :selectLeafOnly="false">
      </tree-select>
    </div>
    <div>
      <tree-list :tree="tree"></tree-list>
    </div>
  </div>
</template>

<script>
import TreeSelect from './components/TreeSelect'
import TreeList from './components/tree-list'

export default {
  name: 'app',
  components: {
    TreeSelect,
    TreeList,
  },
  data () {
    return {
      tree: [
        {
          name: 'root',
          text: 'root',
          value: 'root-value',
          children: [
            {
              name: 'c1',
              text: 'c1',
              value: 'c1-value',
            }, {
              name: 'c2',
              text: 'c2',
              value: 'c2-value',
            }, {
              name: 'c3',
              text: 'c3',
              value: 'c3-value',
              children: [
                {
                  name: 'c4',
                  text: 'c4',
                  value: 'c4-value',
                }, {
                  name: 'c5',
                  text: 'c5',
                  value: 'c5-value',
                },
              ],
            },
          ],
        }, {
          name: 'root2',
          text: 'root2',
          value: 'root2-value',
        },
      ],
    }
  },
}
</script>

<style>
#app {
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
#app > div {
  margin-bottom: 20px;
}
input {
  width: 500px;
}
</style>
