<template>
<div id="home">
    <message bindTo="error" className="warning" />
    
    <div v-if="loading" class="text-center">
        <i class="circle notch icon loading"></i>
    </div>
    <div v-else v-for="fund in funds" class="ui relaxed divided list">
        <div class="item">
            <i class="large github icon"></i>
            <div class="content">
                <a class="header">
                    <div class="ui right floated primary button">
                        <i class="dollar icon"></i>
                        Fund
                    </div>
                    {{ fund.title }}
                </a>
                <div class="description">
                    {{ fund.description }}
                </div>
                
                <div>Raised: $50 <div class="ui label green">+$150</div></div>
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
  created: function(){
      $.getJSON("/r/funding/list", list => {
          this.funds = list;
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
</style>