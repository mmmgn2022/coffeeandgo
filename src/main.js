import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App);

// Use router
app.use(router);
app.use(ToastPlugin);
app.mount('#app');