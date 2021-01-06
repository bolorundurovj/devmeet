import * as firebase from 'firebase';

export default {
  state: {
    user: null,
  },
  mutations: {
    registerMeetup(state, payload) {
      state.user.registeredMeetups.push(payload);
    },
    unregisterMeetup(state, payload) {
      let meetups = state.user.registeredMeetups;
      for (var i = 0; i < meetups.length; i++) {
        if (meetups[i] === payload) {
          meetups.splice(i, 1);
          i--;
        }
      }
      state.user.registeredMeetups = meetups;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setImage(state, payload) {
      state.imageURL = payload;
    },
  },
  actions: {
    registerMeetup({ commit, getters }, payload) {
      const userId = getters.user.id;
      commit('setLoading', true);
      firebase.default
        .firestore()
        .collection('meetup_users')
        .doc(userId)
        .update({
          registeredMeetups: firebase.default.firestore.FieldValue.arrayUnion(
            payload.mid
          ),
        })
        .then((data) => {
          console.log(data);
          alert('Registered Successfully');
          commit('registerMeetup', payload.mid);
          commit('setLoading', false);
        })
        .catch((err) => {
          alert(err);
          commit('setLoading', false);
        });
    },
    unregisterMeetup({ commit, getters }, payload) {
      const userId = getters.user.id;
      commit('setLoading', true);
      firebase.default
        .firestore()
        .collection('meetup_users')
        .doc(userId)
        .update({
          registeredMeetups: firebase.default.firestore.FieldValue.arrayRemove(
            payload.mid
          ),
        })
        .then((data) => {
          console.log(data);
          alert('Unregistered Successfully');
          commit('unregisterMeetup', payload.mid);
          commit('setLoading', false);
        })
        .catch((err) => {
          alert(err);
          commit('setLoading', false);
        });
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
            name: payload.name,
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
    autoLogin({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: payload.data.registeredMeetups,
      });
    },
    logout({ commit }) {
      firebase.default.auth().signOut();
      commit('setUser', null);
    },
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
};
