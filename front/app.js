import Vue from 'vue/dist/vue.esm'

import 'normalize.css';
import './app.scss';
import App from './App.vue';

new Vue({
  render: h => h(App)
}).$mount('#app')