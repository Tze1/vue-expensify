import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add all icons here for entire app.
/* eslint-disable no-undef */
library.add(
  faEdit,
  faSignOutAlt,
  faTrashAlt,
);
/* eslint-enable no-undef */

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

// Bootstrap stylesheets @imported into app.scss.
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
