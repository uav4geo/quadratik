<template>
<div class="ui action input share-fund">
  <input type="text" :value="fundUrl" @click="copyToClipboard">
  <button class="ui teal right labeled icon button" @click="copyToClipboard">
    <i :class="icon"></i>
    {{ text }}
  </button>
</div>
</template>

<script>
import Modal from './Modal.vue';
import PledgeAmountSelector from './PledgeAmountSelector.vue';
import SubsidyCalculator from './SubsidyCalculator.vue';
import copy from 'clipboard-copy';

export default {
  props: ['fund'],
  data: function(){
      return {
          text: "Copy URL",
          icon: "copy icon"
      }
  },
  mounted: function(){
      this.origText = this.text;
  },
  computed: {
      fundUrl: function(){
          return `${window.location.protocol}//${window.location.host}/#/fund/${this.fund.id}`;
      }
  },
  destroyed: function(){
      if (this.textTimeout) clearTimeout(this.textTimeout);
  },
  methods: {
      copyToClipboard: function(n){
          copy(this.fundUrl);
          this.text = "Copied!";
          this.textTimeout = setTimeout(() => {
              this.text = this.origText;
              this.textTimeout = null;
          }, 2000);
      }
  }
}
</script>

<style scoped>
.share-fund{
    font-size: 80%;
    button{
        font-size: 100%;
    }
}
</style>