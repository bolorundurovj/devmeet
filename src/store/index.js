import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null,
    success: null,
    imageURL: null,
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find((meetup) => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
      if (payload.size) {
        meetup.size = payload.size;
      }
      if (payload.imageUrl) {
        meetup.imageUrl = payload.imageUrl;
      }
      state.loadedMeetups.push(payload);
    },
    deleteMeetup(state, payload) {
      let meetups = state.loadedMeetups;
      const meetup = state.loadedMeetups.find((meetup) => {
        return meetup.id === payload.id;
      });
      if (meetup) {
        for (var i = 0; i < meetups.length; i++) {
          if (meetups[i].id === payload.id) {
            meetups.splice(i, 1);
            i--;
          }
        }
        state.loadedMeetups = meetups;
      }
    },
    registerMeetup(state, payload) {
      state.user.registeredMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setImage(state, payload) {
      state.imageURL = payload;
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
    loadMeetups({ commit }) {
      commit('setLoading', true);
      firebase.default
        .database()
        .ref('meetups')
        .once('value')
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          console.log(obj);
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              location: obj[key].location,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              size: obj[key]?.size,
              creatorId: obj[key]?.creatorId,
            });
          }
          commit('setLoadedMeetups', meetups);
          commit('setLoading', false);
        })
        .catch((err) => {
          commit('setLoading', false);
          alert(err);
        });
    },
    createMeetup({ commit, getters }, payload) {
      commit('setLoading', true);
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        size: payload.size,
        creatorId: getters.user.id,
      };
      const rawMeetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        size: payload.size,
      };
      firebase.default
        .database()
        .ref('meetups')
        .push(meetup)
        .then((data) => {
          const key = data.key;
          commit('createMeetup', { ...rawMeetup, id: key });
          commit('setLoading', false);
        })
        .catch((err) => {
          alert(err);
          commit('setLoading', false);
        });
    },
    updateMeetupDetails({ commit }, payload) {
      console.log(payload);
      commit('setLoading', true);
      const updateObj = {
        id: payload.id,
      };
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      if (payload.size) {
        updateObj.size = payload.size;
      }
      if (payload.imageUrl) {
        updateObj.imageUrl = payload.imageUrl;
      }
      firebase.default
        .database()
        .ref('meetups')
        .child(payload.id)
        .update(updateObj)
        .then((data) => {
          console.log(updateObj);
          commit('updateMeetup', updateObj);
          commit('setLoading', false);
        })
        .catch((err) => {
          alert(err);
          commit('setLoading', false);
        });
    },
    deleteMeetup({ commit }, payload) {
      commit('setLoading', true);
      firebase.default
        .database()
        .ref('meetups')
        .child(payload.id)
        .remove()
        .then((data) => {
          commit('deleteMeetup', { id: payload.id });
          commit('setLoading', false);
        })
        .catch((err) => {
          alert(err);
          commit('setLoading', false);
        });
    },
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
          alert("Registered Successfully")
          commit('registerMeetup', payload.mid);
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
      commit('setUser', { id: payload.uid, registeredMeetups: payload.data.registeredMeetups });
    },
    logout({ commit }) {
      firebase.default.auth().signOut();
      commit('setUser', null);
    },
    uploadImage({ commit }, payload) {
      commit('setLoading', true);
      const ext = payload.name.slice(payload.name.lastIndexOf('.'));
      // console.log(ext);
      let name = `meetup_${Date.now()}${ext}`;
      let storageRef = firebase.default.storage().ref('/meetup_images/' + name);
      storageRef.put(payload).then(async (d) => {
        let downloadURL = await d.ref.getDownloadURL();
        // alert(downloadURL);
        console.log('File available at', downloadURL);
        commit('setImage', downloadURL);
        commit('setLoading', false);
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
    uploadedImage(state) {
      return state.imageURL;
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
  },
});
