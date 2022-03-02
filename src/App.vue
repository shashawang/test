<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <!-- <Editor
    class="byte-editor"
    :value="value"
    :plugins="plugins"
    @change="handleChange"
  /> -->
    <!-- :locale="zhHans"
    :uploadImages="(files) => uploadImages(files)" -->
    <Editor class="editos" :value="value" />
    <Viewer class="viewer" :tabindex="2" :value="value"
    ></Viewer>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import { Editor,  } from '@bytemd/vue'
import gfm from '@bytemd/plugin-gfm'

const plugins = [
  gfm(),
  // Add more plugins here
]


export default {
  name: "App",
  components: {
    // HelloWorld,
    Editor
  },
   data() {
    return { value: '', plugins }
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
