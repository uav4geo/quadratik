<template>
<div v-if="$parent[bindTo]" class="ui warning message" :class="className">
  <i class="close icon"  @click="dismiss"></i>
  <span v-html="$parent[bindTo]" />
</div>
</template>

<script>
export default {
  props: {
      bindTo: {
          type: String,
          default: "message"
      },
      className: {
          type: String,
          default: "info"
      }
  },
  methods: {
      dismiss: function(){
          this.$parent[this.bindTo] = "";
      }
  }
}
</script>

<style scoped>
</style>