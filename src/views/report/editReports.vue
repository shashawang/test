<template>
  <div>
    <div class="form_item">
      <span class="label">标题：</span>
      <el-input v-model="title" placeholder="请输入标题" />
    </div>
    <div class="form_item">
      <span class="label">简介：</span>
      <el-input v-model="description" placeholder="请输入简介" />
    </div>
    <div class="form_item last">
      <span class="label">文章内容：</span>
      <UE ref="ue" :config="configEditor" id="ue1" :defaultMsg="value"></UE>
    </div>
    <button @click="getUEContent">提交</button>
  </div>
</template>
<script>
 import VueUeditorWrap from 'vue-ueditor-wrap'
import UE from "./editor.vue";
  export default {
    name:'',
    components: {VueUeditorWrap, UE},
    props:[''],
    data () {
      return {
        value: '', 
        configEditor: {
          UEDITOR_HOME_URL: 'UEditor/',
          // serverUrl: '//ueditor.szcloudplus.com/cos',
          // serverUrl: 'http://120.78.221.136:8080/utf8-jsp/jsp/controller.jsp',
          // imageUrlPrefix: 'http://120.78.221.136:8080/utf8-jsp/ueditor/jsp/upload/image/'
          serverUrl: 'http://192.168.10.139:8080/utf8-jsp/jsp/controller.jsp',
          imageUrlPrefix: 'http://192.168.10.139:8080/utf8-jsp/ueditor/jsp/upload/image/'
        },
        reportDetail: {},
        id: '',
        title: '',
        description: '',
      };
    },
    watch: {},
    created() {
    },
    beforeMount() {},
    mounted() {
      this.id = this.$route.query && this.$route.query.id
      this.$nextTick(() => {
        this.aa()
      })
    },
    methods: {
      getUEContent() {
        let data = {
          id: this.id,
          title: this.title,
          description: this.description,
          date: new Date(),
          content: this.$refs.ue.getUEContent(),
        }
        this.$api.post(`/imapcloud/news/add`, data).then(res => {
          console.log('res: ', res);
          if (res.code == 20000) {
            this.$message.success('操作成功')
            this.$router.go(-1)
          }
        })
      },
      aa() {
        this.$api.get(`/imapcloud/news/new/${this.id}`).then(res => {
          console.log('res: ', res);
          if (res.code == 20000) {
            this.reportDetail = res.param.res
            console.log('this.reportDetail: ', this.reportDetail);
          }
        })
      },
    },
    computed: {}
  }
</script>
<style lang='scss' scoped>
.form_item {
  display: flex;
  align-items: center;
  .label {
        margin: 2vw 2vw;
    width: 9vw;
    text-align: right;
  }
}
.last {
  align-items: flex-start;
}
</style>