<template>
<Modal @onClose="$emit('onClose')">
    <div class="header">
        Calculator
    </div>
    <div class="content">
        
    </div>
    <div class="actions">
        <div class="ui positive right button">
        Close
        </div>
    </div>
</Modal>
</template>

<script>
import Modal from './Modal.vue';

export default {
  props: ['fund'],
  components: {
      Modal
  },
  data: function(){
      return {
          
      }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>