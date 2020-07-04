<template>
<div id="home">
    <FundList :expiredBefore="expiredBefore" />
</div>
</template>

<script>
import FundList from './FundList.vue';

export default {
  components: {
    FundList
  },

  data: function(){
      return {
          expiredBefore: new Date()
      }
  }
}
</script>

<style scoped>
</style>