import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/main.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery'; // Defining jquery as $

const app = createApp(App) // Init vue
app.use(router) // app.use?
// Initializing jquery (window.$ and window.jQuery?)
window.$ = $;
window.jQuery = $;
// -------------------
app.mount('#app') // Mounting the vue app in #app html element from file index.html
