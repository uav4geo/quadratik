<template>
<div v-if="$parent[bindTo] || content" class="ui warning message" :class="className">
  <i class="close icon"  @click="dismiss"></i>
  <span v-html="$parent[bindTo] || content" />
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
      },
      content: {
          type: String,
          default: ""
      }
  },
  methods: {
      dismiss: function(){
          if (this.bindTo){
            this.$parent[this.bindTo] = "";
          }

          this.$emit("onClose");
      }
  }
}
</script>

<style scoped>
</style>