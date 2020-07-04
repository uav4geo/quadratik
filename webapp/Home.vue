<template>
<div id="home">
    <div class="ui icon message">
        <i class="lightbulb outline icon"></i>
        <div class="content">
            <div class="header">
            It pays off to fund together as a community. 
            </div>
            <p>More people pledging = more subsidies. Discover <router-link to="/howitworks">quadratic funding</router-link>.</p>
        </div>
    </div>

    <FundList />

    <div class="archived">
        <router-link exact="true" to="/archive" class="item">View Archived Funds</router-link>
    </div>
</div>
</template>

<script>
import FundList from './FundList.vue';

export default {
  components: {
    FundList
  }
}
</script>

<style scoped>
.archived{
    margin-top: 16px;
    font-size: 90%;
    text-align: center;
}
</style>