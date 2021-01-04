<template>
  <v-container>
    <v-layout row wrap justify-center class="mb-4 mt-2 justify-content-center">
      <v-flex xs12 sm6 class="text-center mb-4">
        <v-btn class="primary mx-auto" large router to="/meetups"
          >Explore Meetups</v-btn
        >
      </v-flex>
      <v-flex xs12 sm6 class="text-center mb-4">
        <v-btn class="primary" large router to="/meetup/new"
          >Organize Meetup</v-btn
        >
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center class="text-center" v-if="loading">
      <v-flex>
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer" v-if="meetups.length > 0">
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            reverse-transition="fade-transition"
            transition="fade-transition"
            @click="onLoadMeetup(meetup.id)"
          >
            <div class="title">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center class="mb-4 mt-2 justify-content-center">
      <v-flex xs12 class="text-center mb-4">
        <p class="mx-auto" v-if="meetups.length > 0">Join Our Awesome Meetups</p>
        <p class="mx-auto" v-if="meetups.length < 1">No meetups yet</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetups/" + id);
    },
  },
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 2em;
  padding: 5px 20px;
}
</style>