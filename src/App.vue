<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <!-- <Editor
    class="byte-editor"
    :value="value"
    :plugins="plugins"
    @change="handleChange"
  /> -->
    <!-- :locale="zhHans"
    :uploadImages="(files) => uploadImages(files)" -->
    <!-- <EditReports /> -->
    <UE :config="configEditor" id="ue1" ref="ue" :defaultMsg="value"></UE>
    <!-- <vueUeditorWrap v-model="msg" :config="editorConfig" editor-id="editor-demo-01"></vueUeditorWrap> -->
    <!-- <Editor class="editos" :value="value" />
    <Viewer class="viewer" :tabindex="2" :value="value"
    ></Viewer> -->
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import EditReports from "./views/editReports.vue";
// import vueUeditorWrap from "vue-ueditor-wrap";
import UE from "./views/editor.vue";
import { Editor,  } from '@bytemd/vue'
import gfm from '@bytemd/plugin-gfm'
import { ref } from 'vue';

const plugins = [
  gfm(),
  // Add more plugins here
]


export default {
  name: "App",
  components: {
    // HelloWorld,
    Editor,
    // EditReports，
    UE,
    // vueUeditorWrap
  },
  setup() {
    const msg = ref('<h2>Hello World!</h2>');
    return {
      msg,
      value: '', plugins,
      configEditor: {
        UEDITOR_HOME_URL: 'UEditor/',
        serverUrl: '//ueditor.szcloudplus.com/cos',
        // serverUrl: '//139.159.242.212:3005/data/rsdata/',
      }
    };
  },

  //  data() {
  //   return {
  //      value: '', plugins,
       
  //    }
  // },
  created() {
    // 更多 UEditor 配置，参考 http://fex.baidu.com/ueditor/#start-config
    this.editorConfig = {
      // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
      UEDITOR_HOME_URL: '/UEditor/',
      // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
      serverUrl: '//ueditor.szcloudplus.com/cos',
    };
  },

  methods: {
     handleChange(v) {
      this.value = v
    },
    // 上传图片

    // async upload(files) {
    //   const formData = new FormData();

    //   formData.append("file", files);

    //   // 这里替换成自己的上传地址，

    //   const res = await axios.post("/api/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

    //   return res.data;
    // },

    // // 上传完图片后拿到相应的服务器地址

    // async uploadImages(files) {
    //   const imgs = [];

    //   for (const file of files) {
    //     const key = await this.upload(file);

    //     imgs.push({
    //       title: key.name,

    //       url: key.url,
    //     });
    //   }

    //   return imgs;
    // },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
