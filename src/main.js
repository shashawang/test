import { createApp } from 'vue'
import VueUeditorWrap from 'vue-ueditor-wrap';
import App from './App.vue'

// createApp(App).mount('#app')
createApp(App).use(VueUeditorWrap).mount('#app')
