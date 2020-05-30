<template>
<Modal @onClose="$emit('onClose')">
    <div class="header">
        {{ fund.title }}
    </div>
    <div class="scrolling content">
        <div class="ui grid stackable">
            <div class="eight wide column">
                <PledgeAmountSelector 
                    title="Amount You Pledge" 
                    :amounts="[10, 25, 50, 100]" 
                    defaultAmount="25"
                    minimumAmount="10"
                    @onChange="(v) => this.userFund = v" />
            </div>
            <div class="eight wide column">
                <table class="ui celled table">
                <tbody>
                        <tr>
                        <td>Amount you pledge</td>
                        <td><span class="ui label blue">${{ userFund.toLocaleString() }}</span></td>
                    </tr>
                    <tr>
                        <td>Subsidy pool contribution</td>
                        <td><span class="ui label green">${{ poolFundAmount.toLocaleString() }}</span></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr><th><strong>Total value of your pledge</strong></th>
                    <th><strong>${{ totalPledgeValue.toLocaleString() }}</strong></th>
                </tr></tfoot>
                </table>
            </div>
            <div class="sixteen wide column">
                <h3>Payment Details</h3>
            </div>
        </div>
    </div>
    <div class="actions">
        <div class="ui primary right button">
        <i class="icon dollar"></i> Pledge
        </div>
    </div>
</Modal>
</template>

<script>
import Modal from './Modal.vue';
import PledgeAmountSelector from './PledgeAmountSelector.vue';

export default {
  props: ['fund'],
  components: {
      Modal, PledgeAmountSelector
  },
  data: function(){
      return {
          userFund: 25
      }
  },
  mounted: function(){
        this.$nextTick(() => {
            $(this.$el).find('[data-content]').popup({inline: true});
        });
  },
  computed: {
      poolFundAmount: function(){
          return this.fund.poolFundAmountIf(1, this.userFund) - this.fund.poolFundAmount();
      },

      totalPledgeValue: function(){
          return this.userFund * 1 + this.poolFundAmount;
      }
  },
  methods: {
  }
}
</script>

<style scoped>
table{
    user-select: none;
}
.label.large{
    font-size: 150%;
}
i.icon.user{
    margin-right: 0;
}
</style>