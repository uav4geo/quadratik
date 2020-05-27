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
                <div class="ui grid">
                    <div class="nine wide column">
                        <a class="header">
                            <i class="large github icon"></i>
                            {{ fund.title }}
                        </a>
                        <div class="description">
                            {{ fund.description }}
                        </div>
                    </div>
                    <div class="seven wide column text-center">
                            <div class="ui primary button large" data-position="top center" data-content="Funded by community">
                                $50
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
                                        <div><i class="icon clock" data-position="top center" data-content="Time Left"></i> 30d 05:60:56</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div><i class="icon flag checkered" data-position="top center" data-content="Funding Goal"></i> ${{ fund.goal.toLocaleString() }}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div><a href="#"><i class="icon users" data-position="top center" data-content="Number of people who pledged"></i> 4</a></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div><i class="icon heart" data-position="top center" data-content="Subsidy Pool Sponsor"></i> <a href="#">UAV4GEO</a></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div><i class="icon wrench" data-position="top center" data-content="Developer"></i> UAV4GEO</div>
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
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
import Message from './Message.vue';

export default {
  components: {
    Message
  },
  data: function(){
      return {
          loading: true,
          error: "",
          funds: []
      }
  },
  updated: function(){
      $(this.$refs.funding_progress).progress();
      $('[data-content]').popup({inline: true});
  },
  created: function(){
      $.getJSON("/funds/_all_docs?include_docs=true&endkey=_design", res => {
          this.funds = res.rows.map(r => r.doc);
          console.log(this.funds);
      }).fail(e => { this.error = `Cannot load fund list: ${e.statusText}. Try again later.`})
        .always(() => { this.loading = false });
  },
  methods: {
      
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