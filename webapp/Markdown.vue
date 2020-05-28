<template>
    <div class="markdown" v-html="content"></div>
</template>

<script>
import markdownit from 'markdown-it';
const md = markdownit();

export default {
  components: {
  },
  data: function(){
      return {
          content: md.render(this.$slots.default[0].text)
      }
  }
}
</script>

<style>
.markdown{
    img{
        max-width: 100%;
    }
}
</style>