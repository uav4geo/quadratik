<template>
<Modal @onClose="$emit('onClose')">
    <div class="header">
        Pledges
    </div>
    <div class="scrolling content">
        <div class="ui middle aligned divided list">
            <div class="item" v-for="pledge in fund.pledges">
                <i class="icon user"></i>
                <div class="content">
                <span>{{ pledge.name ? pledge.name : "Anonymous" }} (${{ pledge.amount.toLocaleString() }})</span>
                </div>
            </div>
        </div>
    </div>
    <div class="actions">
        <div class="ui ok primary right button large">
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
  mounted: function(){
  },
  methods: {
  }
}
</script>

<style scoped>
</style>