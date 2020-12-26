<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs11>
        <v-card>
          <v-card-title class="text-h6 primary--text">{{
            meetup.title
          }}</v-card-title>
          <v-img
            class="mx-auto"
            width="95%"
            height="300px"
            :src="meetup.imageUrl"
          ></v-img>
          <v-card-text>
            <div class="info--text">
              {{ parseDate(meetup.date) }} - {{ meetup.location }}
            </div>
            <div>
              {{ meetup.description }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
  },
  methods: {
    parseDate(date) {
      return new Date(date);
    },
  },
};
</script>