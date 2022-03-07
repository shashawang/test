<template>
  <div>
    <div class="back" @click="back"> &lt; 返回</div>
    <div class="form_item">
      <span class="label">标题：</span>
      <el-input v-model="reportDetail.title" placeholder="请输入标题" />
    </div>
    <div class="form_item">
      <span class="label">简介：</span>
      <el-input v-model="reportDetail.description" placeholder="请输入简介" />
    </div>
    <div class="form_item last">
      <span class="label">文章内容：</span>
      <UE v-show="showEditor" ref="ue" :config="configEditor" id="ue1" :defaultMsg="reportDetail.content"></UE>
      <!-- <vueUeditorWrap v-model="value" :config="editorConfig" editor-id="editor-demo-01"></vueUeditorWrap> -->
    </div>
    <button @click="getUEContent">提交</button>
  </div>
</template>
<script>
 import VueUeditorWrap from 'vue-ueditor-wrap'
import UE from "./editor.vue";
  export default {
    name:'Detail',
    components: {VueUeditorWrap, UE},
    props:['detailId'],
    data () {
      return {
        value: '', 
        configEditor: {
          UEDITOR_HOME_URL: 'UEditor/',
          // serverUrl: '//ueditor.szcloudplus.com/cos',
          // serverUrl: 'http://120.78.221.136:8080/utf8-jsp/jsp/controller.jsp',
          // imageUrlPrefix: 'http://120.78.221.136:8080/utf8-jsp/ueditor/jsp/upload/image/'
          serverUrl: 'http://139.159.198.238:8080/utf8-jsp/jsp/controller.jsp',
          imageUrlPrefix: 'http://139.159.198.238:8080/utf8-jsp/ueditor/jsp/upload/image/'
        },
        reportDetail: {},
        id: '',
        title: '',
        description: '',
        showEditor: false,
      };
    },
    watch: {
      detailId(newV) {
        if (newV) {
          this.getDetail()
        }
      }
    },
    created() {
    },
    beforeMount() {},
    mounted() {
      this.showEditor = true
      
      // 更多 UEditor 配置，参考 http://fex.baidu.com/ueditor/#start-config
      this.editorConfig = {
        // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
        UEDITOR_HOME_URL: 'UEditor/',
        // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://139.159.198.238:8080/utf8-jsp/jsp/controller.jsp',
      };
      // this.id = this.$route.query && this.$route.query.id
      console.log('detailId: ', this.detailId);
      this.$nextTick(() => {
        // this.getDetail()
      })
    },
    methods: {
      getUEContent() {
        let data = {
          id: this.detailId,
          title: this.reportDetail.title,
          description: this.reportDetail.description,
          date: new Date(),
          content: this.$refs.ue.getUEContent(),
        }
        this.$api.post(`/imapcloud/news/add`, data).then(res => {
          console.log('res: ', res);
          if (res.code == 20000) {
            this.$message.success('操作成功')
            this.$emit('finish')
          }
        })
      },
      back() {
        // this.reportDetail = {}
        this.$emit('close')
      },
      getDetail() {
        this.$api.get(`/imapcloud/news/new/${this.detailId}`).then(res => {
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
.back {
  cursor: pointer;
}
</style>