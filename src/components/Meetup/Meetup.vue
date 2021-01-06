<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs11>
        <v-card>
          <v-card-title class="text-h6 primary--text">
            {{ meetup.title }}
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="red"
                title="Delete Meetup"
              >
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
              <app-edit-meetup-dialog :meetup="meetup"
                title="Edit Meetup"
              ></app-edit-meetup-dialog>
            </template>
          </v-card-title>
          <v-img
            class="mx-auto"
            width="95%"
            height="300px"
            :src="meetup.imageUrl"
          ></v-img>
          <v-card-text>
            <div class="info--text">
              {{ meetup.date | date }} - {{ meetup.location }}
            </div>
            <div class="info--text">
              {{ meetup.size ? meetup.size + " Slots" : "All are welcome" }}
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
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      } else {
        return this.$store.getters.user.id === this.meetup.creatorId;
      }
    },
  },
  methods: {
    parseDate(date) {
      return new Date(date);
    },
  },
};
</script>