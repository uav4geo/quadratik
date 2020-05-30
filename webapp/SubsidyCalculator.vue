<template>
<Modal @onClose="$emit('onClose')">
    <div class="header">
        Calculate Subsidy
    </div>
    <div class="content scrolling">
        <div class="ui grid stackable">
            <div class="eight wide column">
                <PledgeAmountSelector 
                    title="Amount You Pledge" 
                    :amounts="[10, 25, 50, 100]" 
                    defaultAmount="25"
                    minimumAmount="10"
                    @onChange="(v) => this.userFund = v" />
            
                <h3>Total Value</h3>
                <a class="ui teal label large"
                    data-position="top center" data-content="Total value of your pledge">${{ totalPledgeValue.toLocaleString()}}</a>
            </div>
            <div class="eight wide column">
                <table class="ui celled table">
                <thead>
                    <tr>
                    <th>Current Funding</th>
                    <th>${{ fund.totalFundAmount().toLocaleString() }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>
                    <div class="ui icon buttons mini basic add-users">
                        <button class="ui button"  @click="addUsers(-1)" :disabled="users <= 1">
                            <i class="minus icon"></i>
                        </button> 
                        <button class="ui button" @click="addUsers(1)">
                            <i class="plus icon" ></i>
                        </button>
                    </div> {{ numPeople }} pledging ${{ userFund }}
                    </td>
                    <td><span class="ui label blue">${{ (userFund * users).toLocaleString() }}</span></td>
                    </tr>
                    <tr>
                    <td>Subsidy pool contribution</td>
                    <td><span class="ui label green">${{ poolFundAmount.toLocaleString() }}</span></td>
                    </tr>
                    <tr>
                    <td>Total value of your pledge<span v-if="users > 1">s</span></td>
                    <td><span class="ui label teal">${{ totalPledgeValue.toLocaleString()}}</span></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr><th><strong>New Total Funding</strong></th>
                    <th><strong>${{ (fund.totalFundAmount() + (userFund * users) + poolFundAmount).toLocaleString() }}</strong></th>
                </tr></tfoot>
                </table>
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
import PledgeAmountSelector from './PledgeAmountSelector.vue';

export default {
  props: ['fund'],
  components: {
      Modal, PledgeAmountSelector
  },
  data: function(){
      return {
          userFund: 25,
          users: 1
      }
  },
  mounted: function(){
        this.$nextTick(() => {
            $(this.$el).find('[data-content]').popup({inline: true});
        });
  },
  computed: {
      numPeople: function(){
          if (this.users === 1) return "1 person";
          else return `${this.users} people`;
      },

      poolFundAmount: function(){
          return this.fund.poolFundAmountIf(this.users, this.userFund) - this.fund.poolFundAmount();
      },

      totalPledgeValue: function(){
          return this.userFund * this.users + this.poolFundAmount;
      }
  },
  methods: {
      addUsers: function(n){
          this.users += n;
          if (this.users < 1) this.users = 1;
      }
  }
}
</script>

<style scoped>
.add-users{
    margin-right: 6px;
}
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