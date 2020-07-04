<template>
<div id="home">
    <FundList :fundId="fundId" />
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
          fundId: this.$route.params.id
      }
  }
}
</script>

<style scoped>
</style>