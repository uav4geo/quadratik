<template>
<div>
    <h3>{{ title }}</h3>
    <div class="ui basic buttons">
        <template v-for="amt in amounts">
            <button @click="selectAmount(amt)" class="ui button" :class="{active: selectedAmount == amt && !customSelected}">${{amt}}</button>
        </template>
        <button @click="() => this.customSelected = true" class="ui button" :class="{active: customSelected}">Custom</button>
    </div>

    <div v-if="customSelected">
        <div class="ui clearing divider"></div>
        <div class="ui labeled input">
            <label for="amount" class="ui label">$</label>
            <input type="text" placeholder="0" v-model="selectedAmount" size="5" @keypress="isNumber($event)">
        </div>
        <span class="ui yellow message tiny" v-if="!meetsMinimum()">Minimum is ${{ minimumAmount }}</span>
    </div>
</div>
</template>

<script>
export default {
  props: ['title', 'amounts', 'defaultAmount', 'minimumAmount'],
  data: function(){
      return {
          selectedAmount: this.defaultAmount,
          customSelected: false
      }
  },
  methods: {
    selectAmount: function(amt){
        this.selectedAmount = amt;
        this.customSelected = false;
    },

    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    meetsMinimum: function(){
        return this.selectedAmount >= parseFloat(this.minimumAmount);
    }
  },
  watch: {
      selectedAmount: function(){
          if (this.meetsMinimum()){
             this.$emit("onChange", this.selectedAmount || 0);
          }
      }
  }
}
</script>

<style scoped>
.label.large{
    font-size: 150%;
}
i.icon.user{
    margin-right: 0;
}
</style>