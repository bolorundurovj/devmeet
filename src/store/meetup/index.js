import * as firebase from 'firebase';

export default {
  state: {
    loadedMeetups: [],
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
    setImage(state, payload) {
      state.imageURL = payload;
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
    uploadedImage(state) {
      return state.imageURL;
    },
  },
};
