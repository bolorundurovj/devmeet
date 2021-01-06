import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { store } from './store';
import DateFilter from './filters/date';
import * as firebase from 'firebase';
import AlertCmp from './components/Shared/Alert.vue';
import EditMeetupDialog from "./components/Meetup/Edit/EditMeetupDialog.vue";
import EditMeetupDateDialog from "./components/Meetup/Edit/EditMeetupDateDialog.vue";
import RegisterDialog from "./components/Meetup/Registration/RegisterDialog.vue";

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);
Vue.component('app-edit-meetup-dialog', EditMeetupDialog);
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog);
Vue.component('app-register-dialog', RegisterDialog);

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
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.default.firestore().collection('meetup_users').doc(user.uid).get().then(data => {
          let userData = data.data();
          user.data = userData;
          store.dispatch('autoLogin', user);
        })
      }
    });

    store.dispatch('loadMeetups');
  },
}).$mount('#app');
