import {createApp,} from 'vue'
import App from './App.vue'
import {router} from "@/route";

import Markdown from 'vue3-markdown-it';
import 'highlight.js/styles/monokai.css';

import * as Icons from "@element-plus/icons-vue";


const app = createApp(App)
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
})
app.use(router);
app.use(Markdown);

app.mount('#app')
