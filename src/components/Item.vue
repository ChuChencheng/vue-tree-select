<template>
  <li>
    <div>
      <span v-if="isFolder">{{ open ? '-' : '+' }}</span>
      <span :class="icon"></span>
    </div>
    <ul v-if="isFolder">
      <item></item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'item',
  props: {
    isFolder: {
      type: Boolean,
      required: true,
    },
    icon: String,
  },
  data() {
    return {

    };
  },

};
</script>

<style>
  
</style>