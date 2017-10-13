export default {
  methods: {
    // 向父组件触发事件
    emitUpward (componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      while (parent && name !== componentName) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [
          eventName,
        ].concat(params))
      }

      return parent
    },
    // 向直接子组件触发事件
    emitDownward (componentName, eventName, params) {
      const children = this.$children

      children.forEach(child => {
        const name = child.$options.name

        if (name === componentName) {
          child.$emit.apply(child, [
            eventName,
          ].concat(params))
        }
      })
    },
    // 向所有父组件
    broadcastUpward () { },

    broadcastDownward () { },

    broadcast () { },
  },
}
