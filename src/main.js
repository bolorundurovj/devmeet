import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { store } from './store';
import DateFilter from './filters/date';
import * as firebase from 'firebase';

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
  created: () => {
    firebase.default.initializeApp({
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: '',
    });
  },
}).$mount('#app');
