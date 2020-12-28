import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          'https://technext.ng/wp-content/uploads/2018/08/TEF-Forum-2017-4-750x354.jpg',
        id: 'hdhsjjueuurrufnfnf',
        title: 'Meetup In Lagos',
        date: Date.now(),
        location: 'Lagos, Nigeria',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis illo tempore ab ullam voluptatem, autem magnirferendis.st autem iusto ratione qui neque a tempora veritatis earum consectetur in!',
      },
      {
        imageUrl:
          'https://www.as-p.com/fileadmin/_processed_/import2018/5/e/csm_Keyvisual_4__Einfuehrungsseite_Abuja_Emptyform_Tjie_Boulevardview_Final_Print_opt_0ac39be30d.jpg?_=1486398905',
        id: 'hdhsjkwiujeeuue',
        title: 'Meetup In Abuja',
        date: Date.now() - 3600,
        location: 'Abuja, Nigeria',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis illo tempore ab ullam voluptatem, autem magnirferendis.st autem iusto ratione qui neque a tempora veritatis earum consectetur in!',
      },
      {
        imageUrl:
          'https://techpoint.africa/wp-content/uploads/2018/02/google.jpeg',
        id: 'oeoiruirnncnc',
        title: 'Meetup In Ibadan',
        date: Date.now() + 3600,
        location: 'Ibadan, Nigeria',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis illo tempore ab ullam voluptatem, autem magnirferendis.st autem iusto ratione qui neque a tempora veritatis earum consectetur in!',
      },
      {
        imageUrl:
          'https://cdn.movemeback.com/media/thumbnails/images/lagos-business-academy-how-to-build-your-tech-startup-event-cover-20190630-18195239/dd658dc20d402a5dfd01f672b176f72b.jpg',
        id: 'nfnjskaalalalsmks',
        title: 'Meetup In Port Harcourt',
        date: Date.now() + 7200,
        location: 'Port Harcourt, Nigeria',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis illo tempore ab ullam voluptatem, autem magnirferendis.st autem iusto ratione qui neque a tempora veritatis earum consectetur in!',
      },
      {
        imageUrl:
          'https://images.pexels.com/photos/3801118/pexels-photo-3801118.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        id: 'nfnjskaaefnuenvunvsmks',
        title: 'Meetup In VGC',
        date: Date.now() + 3200,
        location: 'Lagos, Nigeria',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis illo tempore ab ullam voluptatem, autem magnirferendis.st autem iusto ratione qui neque a tempora veritatis earum consectetur in!',
      },
      {
        imageUrl: 'http://i.imgur.com/QoA9T0E.jpg',
        id: 'hhfhqfhqfqefyhfqyeqy',
        title: 'Meetup In Kaduna',
        date: Date.now() + 7000,
        location: 'Kaduna, Nigeria',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis illo tempore ab ullam voluptatem, autem magnirferendis.st autem iusto ratione qui neque a tempora veritatis earum consectetur in!',
      },
      {
        imageUrl:
          'https://lh3.googleusercontent.com/proxy/RTfiKXrCG9TL00YcWWNLmuhU-3C2EeI-1qNN4PqMioT5gDPDNQFSwwzPI4t-I7xfk6QbRD_i3H_nyld_4wJ23X2umMVoTsEGEZrlp3Nncw8IchuC0JQsutUIlie8EDwq4-KHKQrKeg',
        id: '2hwhufhuhehfgrrr',
        title: 'Meetup In Akure',
        date: Date.now() + 1200,
        location: 'Ondo, Nigeria',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis illo tempore ab ullam voluptatem, autem magnirferendis.st autem iusto ratione qui neque a tempora veritatis earum consectetur in!',
      },
      {
        imageUrl:
          'https://www.theafricareport.com/media/2020/05/TAR111_p112_CFOCUS_LAGOS_LEAD_732x419-732x419.jpg',
        id: 'uurr88rruuehhe3',
        title: 'Meetup In Delta',
        date: Date.now() + 7200,
        location: 'Delta, Nigeria',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis illo tempore ab ullam voluptatem, autem magnirferendis.st autem iusto ratione qui neque a tempora veritatis earum consectetur in!',
      },
    ],
    user: null,
    loading: false,
    error: null,
    success: null,
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setSuccess(state, payload) {
      state.success = payload;
    },
    clearSuccess(state) {
      state.success = null;
    },
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
      };
      //Store to firebase
      firebase.default
        .firestore()
        .collection('meetups')
        .add(meetup)
        .then((d) => {
          d.update({ id: d.id });
        });
      commit('createMeetup', meetup);
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.default
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          user.user.updateProfile({ displayName: payload.name }).then(() => {
            commit('setLoading', false);
          });
          alert('Registered Successfully');
          // console.log(user);
          const newUser = {
            id: user.user.uid,
            registeredMeetups: [],
            name: user.user.displayName,
          };
          firebase.default
            .firestore()
            .collection('meetup_users')
            .doc(user.user.uid)
            .set(newUser);
          commit('setUser', newUser);
        })
        .catch((err) => {
          commit('setLoading', false);
          commit('setError', err);
          // console.log(err);
          // alert(err);
        });
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.default
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          alert('Logged In Successfully');
          let user_data;
          let userData = {
            id: user.user.uid,
            registeredMeetups: [],
            name: user.user.displayName,
          };
          firebase.default
            .firestore()
            .collection('meetup_users')
            .doc(user.user.uid)
            .get()
            .then((d) => {
              commit('setLoading', false);
              console.log(d.data());
              user_data = d.data();
              userData.registeredMeetups = user_data.registeredMeetups;
            });
          commit('setUser', userData);
        })
        .catch((err) => {
          commit('setLoading', false);
          commit('setError', err);
          // alert(err);
        });
    },
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id == meetupId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
  },
});
