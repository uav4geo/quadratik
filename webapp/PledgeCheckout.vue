<template>
<Modal @onClose="$emit('onClose')">
    <div class="header">
        {{ fund.title }}
    </div>
    <div class="scrolling content">
        <Message :content="error" @onClose="closeModal" className="warning" />
        <Message :content="paymentError" @onClose="() => this.paymentError = ''" className="warning" />

        <div class="ui active inverted dimmer" v-if="loading">
            <div class="ui text loader">Loading</div>
        </div>
        <div v-else>
            <div class="ui grid stackable" v-if="!error">
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
                    <div class="ui form">
                        <h3 class="ui dividing header">Your Details</h3>
                        <div class="fields">
                            <div class="eight wide field">
                                <label>Name</label>
                                <input type="text" v-model="name" placeholder="Your name or company name" />
                            </div>
                            <div class="eight wide field" :class="{error: !validEmail(email)}">
                                <label>E-mail</label>
                                <input type="text" v-model="email" placeholder="E-mail address" />
                            </div>
                        </div>
                    </div>
                    <div class="ui form payment">
                        <h3 class="ui dividing header">Payment</h3>
                        <div class="field">
                            <div ref="cardElement" id="card-element">
                                <!-- Elements will create input elements here -->
                            </div>
                        </div>
                    </div>
                        <!-- We'll put the error messages in this element 
                        <div id="card-errors" role="alert"></div>-->
                    <div class="ui positive message">
                        <p class="header">You will not be charged. Your credit card information will be securely stored with <a href="https://stripe.com/" target="_blank">Stripe</a>. Your card will be charged ${{ userFund }} only if the fundraising goal is met<span v-if="fund.expires"> on or before {{ new Date(fund.expires).toLocaleString() }}</span>. If a payment is made, an invoice will be sent to your e-mail address. Maximum of one pledge per person/company, per fund.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="actions">
        <div class="ui cancel left button large">
            Cancel
        </div>
        <!--<button class="ui primary right button large" id="submit"> <i class="icon lock"></i> Pledge ${{ userFund.toLocaleString() }}</button>-->

        <div class="ui primary right button large" :class="{disabled: !validForm() || processingPayment, loading: processingPayment}" @click="submitForm()">
            <i class="icon lock"></i> Pledge ${{ userFund.toLocaleString() }}
        </div>
    </div>
</Modal>
</template>

<script>
import Modal from './Modal.vue';
import Message from './Message.vue';
import PledgeAmountSelector from './PledgeAmountSelector.vue';
import $ from 'jquery';
import {loadStripe} from '@stripe/stripe-js';

export default {
  props: ['fund'],
  components: {
      Modal, PledgeAmountSelector, Message
  },
  data: function(){
      return {
          error: "",
          paymentError: "",
          userFund: 25,
          email: "",
          name: "",
          validcc: false,
          card: null,
          stripe: null,
          stripe_publishable_key: "",
          loading: true,
          processingPayment: false
      }
  },
  mounted: function(){
        this.$nextTick(() => {
            $(this.$el).find('[data-content]').popup({inline: true});
        });

        const onError = () => {
            this.loading = false;
            this.error = "Cannot communicate with payment system. Please try again later or contact support";
        };

        try{
            
            $.getJSON("/r/stripe_publishable_key").done(async json => {
                if (!json.key){
                    onError();
                    return;
                }
                
                this.stripe_publishable_key = json.key;
                this.loading = false;

                const stripe = await loadStripe(this.stripe_publishable_key);

                this.$nextTick(() => {
                    // Set up Stripe.js and Elements to use in checkout form
                    const style = {
                        base: {
                            color: "#32325d",
                            '::placeholder': {
                                color: '#d4d4d4',
                            },
                        }
                    };
                    const elements = stripe.elements();
                    const card = elements.create("card", { style: style });
                    card.mount(this.$refs.cardElement);
                    card.on('change', e => {
                        this.validcc = e.complete;
                    });

                    this.card = card;
                    this.stripe = stripe;
                });
            }).fail(onError);
        }catch(e){
            onError();
        }
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
      validEmail: function(email){
        if (email === "") return true;

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },

      validForm: function(){
          return this.validEmail(this.email) && this.email !== "" && 
                (this.name !== "" || this.anonymous) &&
                this.stripe_publishable_key !== "" &&
                this.validcc &&
                this.card &&
                this.stripe;
      },

      closeModal: function(){
        $(this.$el).modal('hide');
      },

      submitForm: function(){
        this.processingPayment = true;

        const onError = (msg) => {
            this.paymentError = msg || "Cannot communicate with payment processor. Try again later or contact support";
            this.processingPayment = false;
        };

        $.post("/r/pledge", {
            name: this.name,
            email: this.email,
            fund_id: this.fund.id
        }).done(json => {
            if (json.error || !json.client_secret){
                onError();
                return;
            }

            const token = json.token;

            this.stripe.confirmCardSetup(json.client_secret, {
                payment_method: {
                    card: this.card,
                    billing_details: {
                        name: this.name,
                    },
                },
            }).then(result => {
                if (result.error) {
                    onError(result.error);
                    return;
                }

                $.post("/r/pledge/commit", {
                    token
                }).done(json => {
                    if (json.error){
                        onError(json.error);
                        return;
                    }

                    // YAY
                    this.processingPayment = false;
                }).fail(onError);
            });
        }).fail(onError);
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
.payment{
    margin-top: 16px;
    margin-bottom: 16px;
}
.StripeElement{
    border: 1px solid #dededf;
    border-radius: 3px;
    padding: 10px;
}
</style>