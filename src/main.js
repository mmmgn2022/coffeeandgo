import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


const app = createApp(App);

// Use router
app.use(router);
app.mount('#app');
