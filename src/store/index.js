import Vue from 'vue';
import Vuex from 'vuex';

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
      },
      {
        imageUrl:
          'https://www.as-p.com/fileadmin/_processed_/import2018/5/e/csm_Keyvisual_4__Einfuehrungsseite_Abuja_Emptyform_Tjie_Boulevardview_Final_Print_opt_0ac39be30d.jpg?_=1486398905',
        id: 'hdhsjkwiujeeuue',
        title: 'Meetup In Abuja',
        date: Date.now() - 3600,
      },
      {
        imageUrl:
          'https://techpoint.africa/wp-content/uploads/2018/02/google.jpeg',
        id: 'oeoiruirnncnc',
        title: 'Meetup In Ibadan',
        date: Date.now() + 3600,
      },
      {
        imageUrl:
          'https://cdn.movemeback.com/media/thumbnails/images/lagos-business-academy-how-to-build-your-tech-startup-event-cover-20190630-18195239/dd658dc20d402a5dfd01f672b176f72b.jpg',
        id: 'nfnjskaalalalsmks',
        title: 'Meetup In Port Harcourt',
        date: Date.now() + 7200,
      },
      {
        imageUrl:
          'https://images.pexels.com/photos/3801118/pexels-photo-3801118.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        id: 'nfnjskaaefnuenvunvsmks',
        title: 'Meetup In VGC',
        date: Date.now() + 3200,
      },
      {
        imageUrl: 'http://i.imgur.com/QoA9T0E.jpg',
        id: 'hhfhqfhqfqefyhfqyeqy',
        title: 'Meetup In Kaduna',
        date: Date.now() + 7000,
      },
      {
        imageUrl:
          'https://lh3.googleusercontent.com/proxy/RTfiKXrCG9TL00YcWWNLmuhU-3C2EeI-1qNN4PqMioT5gDPDNQFSwwzPI4t-I7xfk6QbRD_i3H_nyld_4wJ23X2umMVoTsEGEZrlp3Nncw8IchuC0JQsutUIlie8EDwq4-KHKQrKeg',
        id: '2hwhufhuhehfgrrr',
        title: 'Meetup In Akure',
        date: Date.now() + 1200,
      },
      {
        imageUrl:
          'https://www.theafricareport.com/media/2020/05/TAR111_p112_CFOCUS_LAGOS_LEAD_732x419-732x419.jpg',
        id: 'uurr88rruuehhe3',
        title: 'Meetup In Delta',
        date: Date.now() + 7200,
      },
    ],
    user: {
      id: 'hfhdjsfjbfsvjdfvjdvds',
      registeredMeetups: ['nfnjskaalalalsmks'],
    },
  },
  mutations: {},
  actions: {},
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
  },
});
