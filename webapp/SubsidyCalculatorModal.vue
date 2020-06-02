<template>
<Modal @onClose="$emit('onClose')">
    <div class="header">
        Calculate Subsidy
    </div>
    <div class="content scrolling">
        <SubsidyCalculator :fund="fund" />
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
import SubsidyCalculator from './SubsidyCalculator.vue';

export default {
  props: ['fund'],
  components: {
      Modal, SubsidyCalculator, PledgeAmountSelector
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