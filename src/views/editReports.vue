<template>
  <div>{{msg}}
    <VueUeditorWrap v-model="msg" />
  </div>
</template>
<script>
 import VueUeditorWrap from 'vue-ueditor-wrap'
  export default {
    name:'',
    components: {VueUeditorWrap},
    props:[''],
    data () {
      return {
        msg: '',
      };
    },
    watch: {},
    created() {},
    beforeMount() {},
    mounted() {},
    methods: {},
    computed: {}
  }
</script>
<style lang='' scoped>

</style>