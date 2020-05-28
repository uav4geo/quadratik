<template>
<Modal @onClose="$emit('onClose')">
    <div class="header">
        Calculate Subsidy
    </div>
    <div class="content">
        <div class="ui grid stackable">
            <div class="eight wide column">
                <h3>Amount <span v-if="users == 1">You</span><span v-else>{{ users }} people</span> Pledge</h3>
                <div class="ui basic buttons">
                    <template v-for="amt in amounts">
                    <button class="ui button" :class="{active: selectedAmount == amt}">{{amt}}</button>
                    </template>
                </div>

                <div v-if="selectedAmount == 'custom'">
                    <div class="ui clearing divider"></div>
                    <div class="ui labeled input">
                        <label for="amount" class="ui label">$</label>
                        <input type="text" placeholder="0" v-model="userFund" size="5" @keypress="isNumber($event)">
                    </div>
                </div>
            
                <h3>Total Value</h3>
                <a class="ui blue label large"
                    data-position="top center" data-content="Funded by you">${{ (userFund * users).toLocaleString() }}</a>
                <i class="icon plus"></i>
                <a class="ui green label large"
                    data-position="top center" data-content="Funded by subsidy pool">${{ poolFund.toLocaleString() }}</a>
                <i class="icon arrow right"></i>
                <a class="ui teal label large"
                    data-position="top center" data-content="Total value of your contribution">${{ ((userFund * users) + poolFund).toLocaleString() }}</a>
            </div>
            <div class="eight wide column">

            </div>
        </div>
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
          amounts: [
              "$10", "$25", "$50", "$100", "Custom"
          ],
          selectedAmount: "$25",
          userFund: 25,
          users: 1,
          poolFund: 0
      }
  },
  mounted: function(){
        setTimeout(() => {
            $(this.$el).find('[data-content]').popup({inline: true});
        }, 0);
  },
  methods: {
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
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