<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs11 sm8>
        <v-card class="info my-2" v-for="meetup in meetups" :key="meetup.id">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img
                  class="mr-2"
                  style="left: 10px"
                  height="130px"
                  :src="meetup.imageUrl"
                ></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0 text-h5">{{ meetup.title }}</h5>
                    <div class="text-subtitle-2">{{ meetup.date }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn :to="'/meetups/' + meetup.id" text>
                    <v-icon left light>mdi-arrow-right</v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    },
  },
  methods: {},
};
</script>