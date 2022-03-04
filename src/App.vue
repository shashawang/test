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
    <!-- <vueUeditorWrap v-model="msg" :config="editorConfig" editor-id="editor-demo-01"></vueUeditorWrap> -->
    <!-- <Editor class="editos" :value="value" />
    <Viewer class="viewer" :tabindex="2" :value="value"
    ></Viewer> -->
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <div slot="title" class="sys_title">
              <i class="el-icon-location"></i>
              <span>官网后台</span>
            </div>
            <el-menu-item-group>
              <div slot="title" class="module_title">新闻报道</div>
              <el-menu-item index="1-1"><router-link to="/reports">列表</router-link></el-menu-item>
              <el-menu-item index="1-2" ><router-link to="/reportsEdit">编辑</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import EditReports from "./views/editReports.vue";
// import vueUeditorWrap from "vue-ueditor-wrap";
// import UE from "./views/editor.vue";
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
    // UE,
    // vueUeditorWrap
  },
  setup() {
    const msg = ref('<h2>Hello World!</h2>');
    return {
      msg,
      value: '', plugins,
      configEditor: {
        UEDITOR_HOME_URL: 'UEditor/',
        // serverUrl: '//ueditor.szcloudplus.com/cos',
        // serverUrl: 'http://120.78.221.136:8080/utf8-jsp/jsp/controller.jsp',
        // imageUrlPrefix: 'http://120.78.221.136:8080/utf8-jsp/ueditor/jsp/upload/image/'
        serverUrl: 'http://192.168.10.139:8080/utf8-jsp/jsp/controller.jsp',
        imageUrlPrefix: 'http://192.168.10.139:8080/utf8-jsp/ueditor/jsp/upload/image/'
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
     goto(path) {
      this.$router.push(path)
    },
     handleChange(v) {
      this.value = v
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  .sys_title {
    font-size: 2vw;
    margin-top: 20px;
    font-weight: bold;
  }
  .module_title {
    font-size: 1.5vw;
    text-align: left;
    padding: 10px 0 5px 16px;
  }
  .el-menu {
    height: 93vh;
  }
}
</style>
