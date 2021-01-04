import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { store } from './store';
import DateFilter from './filters/date';
import * as firebase from 'firebase';
import AlertCmp from './components/Shared/Alert.vue';

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
  created: () => {
    firebase.default.initializeApp({
      apiKey: 'AIzaSyCsD6A0sSG15YL2d9yXsRgrpq5QLyjUhLU',
      authDomain: 'my-dev-project-44a63.firebaseapp.com',
      databaseURL: 'https://my-dev-project-44a63.firebaseio.com',
      projectId: 'my-dev-project-44a63',
      storageBucket: 'my-dev-project-44a63.appspot.com',
      messagingSenderId: '525950512424',
      appId: '1:525950512424:web:3e55214cd53533c93e741d',
      measurementId: 'G-3HQG4EJCJF',
    });

    store.dispatch("loadMeetups");
  },
}).$mount('#app');
