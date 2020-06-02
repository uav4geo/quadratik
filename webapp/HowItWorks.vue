<template>
<div id="howitworks">
    <h3>How It Works</h3>

    <hr/>
    tldr; it's not economically advantageous for people to directly fund open-source software. We make it advantageous by combining each pledge with additional funds from a sponsor pool. 
    The additional funds optimally compensate for the value a pledge benefits other users.</p>
    
    Example: if Bob makes a contribution ($25) for something that could be valuable to Alice, Bob needs to be compensated for the additional benefit that Alice gets ($25). So Bob's pledge needs to be worth $50. More pledges lead to more overall value for everyone involved, making it economically advantageous for both Bob and Alice to pledge.

    <hr/>

    <h4>The Problem</h4>

    <p>Raising funds for public goods (eg. open source software) <a href="https://www.investopedia.com/terms/t/tragedy-of-the-commons.asp" target="_blank">is difficult</a>:</p>

    <div class="ui icon message">
    <i class="icon quote right"></i>
    <div class="content">
        <div class="header">
        </div>
        <p>Every individual has an incentive to consume a [public] resource at the expense of every other individual with no way to exclude anyone from consuming. It results in overconsumption, under investment, and ultimately depletion of the resource.</p>
    </div>
    </div>

    <p>In software, although making copies of a software is virtually cost-free, the time contributors spend on an open-source project is finite. Any successful open-source project will often run out of developer time, unless the project finds a way to grow in a sustainable manner.</p>
    <p>Growth is often achieved by relying on large entities sponsoring for developers' time and/or relying on the efforts of individual volunteers. This is less than ideal because it places the sponsors in a position of too much power, reduces the ability of the community to steer the project and places unfair burden on the volunteers with unpaid work.</p>

    <p>Existing funraising systems (eg. Indiegogo, Patreon and others) work as "pre-sale" or "exclusive access" platforms (backers usually receive certain exclusive benefits for their pledges). These platforms have accomplished some successes, but often rely on exclusive transfers of value between backers and content creators, which might be incompatible with open-source philosophy.

    <h4>Quadratic Funding</h4>

    <p>When a fund is started, we designate a pool sponsor for the fund. The pool sponsor can be either the developer itself or an organization that has the financial resources to act as a sponsor. The purpose of the pool sponsor is to compensate for the additional value that a pledge from one user generates for everyone else.</p>
    <p>Every time a pledge is made from a community user, the system takes the square root of each pledge, sums them up and squares the result (thus the term <i>quadratic</i>):</p>

    <table class="ui celled table">
    <thead>
        <tr>
        <th>Person</th>
        <th>Pledge</th>
        <th>Square Root (Pledge)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>Alice</td>
        <td>$25</td>
        <td>$5</td>
        </tr>
        <tr>
        <td>Bob</td>
        <td>$25</td>
        <td>$5</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
        <th><strong></strong></th>
        <th><strong>Total <i class="icon arrow right"></i> <span class="ui label blue">$50</span></strong></th>
        <th><strong>Total² <i class="icon arrow right"></i> $10² = <span class="ui label teal">$100</span></strong></th>
        </tr>
    </tfoot>
    </table>

    <p>The amount of the sponsor pool subsidy is the difference between the two values:</p>

    <p><strong><span class="ui label teal large">$100</span> - <span class="ui label blue large">$50</span> = <span class="ui label green large">$50</span></strong></p>
    
    <p>You can prove mathematically that this subsidy optimally compensates for the value that Bob and Alice place into the fund, considering that Bob's pledge increases the value of Alice's and vice-versa.</p>

    <p>It follows that more pledges lead to more overall value. <strong>The subsidy pool makes it economically advantageous for both Bob and Alice to pledge</strong>.
    
    <h4>Examples:</h4>
    <ul>
        <li>Two people each pledging <span class="ui label blue tiny">$25</span> (overall value: <span class="ui label teal tiny">$100</span>) bring twice as many funds than a single person pledging <span class="ui label blue tiny">$50</span> (overall value: <span class="ui label teal tiny">$50</span>).</li>
        <li>Eight people each pledging <span class="ui label blue tiny">$25</span> (overall value: <span class="ui label teal tiny">$1600</span>) bring four times as many funds than two people each pledging <span class="ui label blue tiny">$100</span> (overall value: <span class="ui label teal tiny">$400</span>).</li>
    </ul>

    <p>It pays off to fund together. Try the calculator below:</p>

    <hr/>
    <SubsidyCalculator :fund="fund" />
    <hr/>

    <h4>References</h4>

    <a href="https://vitalik.ca/general/2019/12/07/quadratic.html" target="_blank"><i>Buterin, V. (2019, December 07). Quadratic Payments: A Primer.</i></a>
</div>
</template>

<script>
import SubsidyCalculator from './SubsidyCalculator.vue';
import Fund from './libs/fund';

export default {
  components: {
      SubsidyCalculator
  },
  data: function(){
      return {
          fund: new Fund({
              title: "Bob &amp; Alice Awesome Feature Request",
              pledges: []
          })
      }
  },
  methods: {

  }
}
</script>

<style scoped>
#howitworks{
}
</style>