<template>
<div id="home">
    <Message bindTo="error" className="warning" />

    <SubsidyCalculator v-if="showCalculator" :fund="selectedFund" @onClose="closeCalculator" />
    <PledgeCheckout v-if="showCheckout" :fund="selectedFund" @onClose="closeCheckout" />
    <PledgeList v-if="showPledgeList" :fund="selectedFund" @onClose="closePledgeList" />

    <div v-if="loading" class="text-center">
        <i class="circle notch icon loading"></i>
    </div>
    <div v-else>
        <div class="ui icon message">
        <i class="lightbulb outline icon"></i>
        <div class="content">
            <div class="header">
            It pays off to fund together as a community. 
            </div>
            <p>More people pledging = more subsidies. Discover <router-link to="/howitworks">quadratic funding</router-link>.</p>
        </div>
        </div>
        <div v-for="fund in funds" class="ui relaxed divided list">
            <div class="item">
                <div class="ui grid stackable">
                    <div class="nine wide column">
                        <a class="header" :href="fund.url" target="_blank">
                            <i class="large github icon"></i>
                            {{ fund.title }}
                        </a>
                        <div class="description">
                            <Markdown>{{ fund.description }}</Markdown>
                        </div>
                    </div>
                    <div class="seven wide column text-center">
                            <div class="ui primary button large" data-position="top center" data-content="Funded by community">
                                ${{ fund.communityFundAmount() }}
                            </div> <i class="icon plus"></i>
                            <div class="ui green button large" data-position="top center" data-content="Funded by subsidy pool">
                                ${{ fund.poolFundAmount() }}
                            </div>
                            <hr/>
                            <div class="total">${{ fund.totalFundAmount() }}</div>
                            
                            <div class="ui progress green" :data-percent="Math.min(100, fund.percentageFunded())" ref="funding_progress">
                                <div class="bar"></div>
                                <div class="label">{{ fund.percentageFunded() }}% funded</div>
                            </div>

                            <table class="ui very basic celled table">
                            <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            <i class="icon clock" data-position="top center" data-content="Time Left"></i>
                                            {{ fund.getCountdown() }}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div><i class="icon flag checkered" data-position="top center" data-content="Funding Goal"></i> ${{ fund.goal.toLocaleString() }}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <i class="icon balance scale" data-position="top center" data-content="Type of Funding"></i> 
                                            <span data-position="top center" :data-content="fund.typeDescription()">{{ fund.typeLabel() }}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div><a href="javascript:void(0)" @click="openPledgeList(fund)"><i class="icon users" data-position="top center" data-content="People who pledged"></i> {{ fund.pledges.length }}</a></div>
                                    </td>
                                </tr>
                                <tr v-if="fund.sponsor_name">
                                    <td>
                                        <div><i class="icon heart" data-position="top center" data-content="Subsidy Pool Sponsor"></i> <a :href="fund.sponsor_url" target="_blank">{{ fund.sponsor_name }}</a></div>
                                    </td>
                                </tr>
                                <tr v-if="fund.developer_name">
                                    <td>
                                        <div><i class="icon wrench" data-position="top center" data-content="Developer"></i> <a :href="fund.developer_url" target="_blank">{{ fund.developer_name }}</a></div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <div class="ui buttons">
                                <button class="ui button" @click="openCalculator(fund)"><i class="icon calculator"></i> Calculate Subsidy</button>
                            <div class="or"></div>
                                <button class="ui button primary" @click="openCheckout(fund)"><i class="icon dollar"></i> Pledge</button>
                            </div>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
import Message from './Message.vue';
import Markdown from './Markdown.vue';
import Fund from './libs/fund';
import SubsidyCalculator from './SubsidyCalculator.vue';
import PledgeCheckout from './PledgeCheckout.vue';
import PledgeList from './PledgeList.vue';

export default {
  components: {
    Message, Markdown, SubsidyCalculator, PledgeCheckout, PledgeList
  },
  data: function(){
      return {
          loading: true,
          error: "",
          funds: [],
          selectedFund: null,
          showCalculator: false,
          showCheckout: false,
          showPledgeList: false
      }
  },
  mounted: function(){
      $.getJSON("/r/funds", res => {
          this.funds = res.map(f => new Fund(f));
        //   this.openCalculator(this.funds[0]);
        this.openCheckout(this.funds[0]);

          let hasExpiry = this.funds.find(f => f.expires) !== undefined;
          if (hasExpiry){
              this.updateExpirations = setInterval(() => this.$forceUpdate(), 1000);
          }

          this.$nextTick(() => {
             this.$nextTick(() => {
                $(this.$refs.funding_progress).progress();
                $(this.$el).find('[data-content]').popup({inline: true});
             })
           });
      }).fail(e => { this.error = `Cannot load fund list: ${e.statusText}. Try again later.`})
        .always(() => { this.loading = false });
  },

  destroyed: function(){
      if (this.updateExpirations) clearInterval(this.updateExpirations);
  },
  methods: {
      openCalculator: function(fund){
          this.selectedFund = fund;
          this.showCalculator = true;
      },

      closeCalculator: function(){
          this.showCalculator = false;
      },

      openCheckout: function(fund){
          this.selectedFund = fund;
          this.showCheckout = true;
      },

      closeCheckout: function(){
          this.showCheckout = false;
      },

      openPledgeList: function(fund){
          this.selectedFund = fund;
          this.showPledgeList = true;
      },

      closePledgeList: function(){
          this.showPledgeList = false;
      }
  }
}
</script>

<style scoped>
.description{
    margin-bottom: 8px;
}
.total{
    margin-top: 12px;
    font-weight: bold;
    font-size: 150%;
    position: relative;
    left: -0.5rem;
}
.table{
    margin-top: 16px !important;
    td{
        padding-top: 6px;
        padding-bottom: 6px;
    }
}
.header,.table{
    i{
        color: black;
    }
}
</style>