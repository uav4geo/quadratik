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
                <form class="ui form">
                    <h3 class="ui dividing header">Your Details</h3>
                    <div class="fields">
                        <div class="eight wide field" :class="{disabled: anonymous}">
                            <label>Name</label>
                            <input v-if="anonymous" type="text" :value="userName" />
                            <input v-else type="text" v-model="name" placeholder="Your name, nickname or company name" />
                        </div>
                        <div class="eight wide field" :class="{error: !validEmail(email)}">
                            <label>E-mail</label>
                            <input type="text" v-model="email" placeholder="E-mail address" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" tabindex="0" class="hidden">
                            <label>Anonymous Pledge</label>
                        </div>
                    </div>
                </form>
                <div class="ui positive message">
                    <p class="header">You will not be charged. Your credit card information will be securely stored with <a href="https://stripe.com/" target="_blank">Stripe</a>. Your card will be charged ${{ userFund }} only if the fundraising goal is met<span v-if="fund.expires"> on or before {{ new Date(fund.expires).toLocaleString() }}</span>. After payment an invoice will be sent to your e-mail address. Maximum of one pledge per person/company, per fund.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="actions">
        <div class="ui cancel left button large">
            Cancel
        </div>
        <div class="ui primary right button large" :class="{disabled: !validForm()}">
            <i class="icon lock"></i> Pledge ${{ userFund.toLocaleString() }}
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
          email: "",
          name: "",
          anonymous: false,
      }
  },
  mounted: function(){
        this.$nextTick(() => {
            $(this.$el).find('[data-content]').popup({inline: true});
            $(this.$el).find('.ui.checkbox').checkbox({
                onChecked: () => this.anonymous = true,
                onUnchecked: () => this.anonymous = false,
            });
        });
  },
  computed: {
      poolFundAmount: function(){
          return this.fund.poolFundAmountIf(1, this.userFund) - this.fund.poolFundAmount();
      },

      totalPledgeValue: function(){
          return this.userFund * 1 + this.poolFundAmount;
      },

      userName: function(){
          if (this.anonymous) return "Anonymous";
          return this.name;
      }
  },
  methods: {
      validEmail: function(email){
        if (email === "") return true;

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },

      validForm: function(){
          return this.validEmail(this.email) && this.email !== "" && 
                (this.name !== "" || this.anonymous);
      }
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