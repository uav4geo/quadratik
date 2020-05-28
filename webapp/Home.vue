<template>
<div id="home">
    <message bindTo="error" className="warning" />
    
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
                                ${{ communityFundAmount(fund) }}
                            </div> <i class="icon plus"></i>
                            <div class="ui green button large" data-position="top center" data-content="Funded by subsidy pool">
                                $150
                            </div>
                            <hr/>
                            <div class="total">$200</div>
                            
                            <div class="ui progress green" data-percent="74" ref="funding_progress">
                                <div class="bar"></div>
                                <div class="label">74% funded</div>
                            </div>

                            <table class="ui very basic celled table">
                            <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            <i class="icon clock" data-position="top center" data-content="Time Left"></i> 
                                            <span v-if="fund.countdown">{{fund.countdown.days}}d {{fund.countdown.hours}}h {{fund.countdown.minutes}}m {{fund.countdown.seconds}}s</span>
                                            <span v-else>No time limit</span>
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
                                            <span data-position="top center" :data-content="fundingTypeDescription(fund.funding_type)">{{ fundingTypeToHuman(fund.funding_type) }}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div><a href="#"><i class="icon users" data-position="top center" data-content="Number of people who pledged"></i> {{ fund.pledges.length }}</a></div>
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
                                <button class="ui button"><i class="icon calculator"></i> Calculate Subsidy</button>
                            <div class="or"></div>
                                <button class="ui button primary"><i class="icon dollar"></i> Pledge</button>
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

function updateCountdown(fund){
    if (!fund.expires) return;
    if (fund.expires && !fund.countdown) fund.countdown = {};

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = new Date(fund.expires) - now;

    // Time calculations for days, hours, minutes and seconds
    fund.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    fund.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    fund.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    fund.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000);

    fund.countdown.done = distance < 0;
}

const fundingTypes = {
    1: {
        label: "All or Nothing",
        description: "If we don't reach the funding goal within the designated timeline, the developer won't receive any of the funds that were pledged and people will not be charged."
    }
}

export default {
  components: {
    Message, Markdown
  },
  data: function(){
      return {
          loading: true,
          error: "",
          funds: []
      }
  },
  updated: function(){
      if (!this._ui_updated){
        $(this.$refs.funding_progress).progress();
        $('[data-content]').popup({inline: true});
        this._ui_updated = true;
      }
  },
  created: function(){

      $.getJSON("/r/funds", res => {
          let hasExpiry = false;
          res.forEach(fund => {
              if (fund.expires){
                updateCountdown(fund);
                hasExpiry = true;
              }
          });

          if (hasExpiry){
              setInterval(() => {
                    res.forEach(fund => {
                        updateCountdown(fund);
                    });
              }, 1000);
          }

          this.funds = res;
      }).fail(e => { this.error = `Cannot load fund list: ${e.statusText}. Try again later.`})
        .always(() => { this.loading = false });
  },
  methods: {
    fundingTypeToHuman: function(type){
        return fundingTypes[type].label;
    },

    fundingTypeDescription: function(type){
        return fundingTypes[type].description;
    },

    communityFundAmount: function(fund){
        return fund.pledges.reduce((acc, p) => acc += p.amount, 0);
    },

    poolFundAmount: function(fund){
        const { pledges } = fund;
        
    },

    percentageFunded: function(fund){
        const { goal, pledges } = fund;

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