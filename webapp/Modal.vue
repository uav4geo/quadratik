<template>
<div ref="modal" class="ui modal">
  <i class="close icon"></i>
  <slot/>
</div>
</template>

<script>
import $ from 'jquery';

export default {
  mounted: function(){
      this.show();
  },
  methods: {
      show: function(){
        $(this.$refs.modal).modal({
                duration: 200,
                onHide: () => {
                    this.$emit('onClose', false);
                },
                onApprove: () => {
                    this.$emit('onClose', true);
                }
            })
            .modal('show');
      }
  }
}
</script>

<style scoped>
</style>