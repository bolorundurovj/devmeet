<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" class="primary">{{
          !userIsRegistered ? "Register" : "Unregister"
        }}</v-btn>
      </template>

      <v-card>
        <v-card-title
          v-if="!userIsRegistered"
          class="headline primary lighten-2 white--text"
        >
          Register for {{ meetup.title }} ?
        </v-card-title>
        <v-card-title v-else class="headline primary lighten-2 white--text">
          Unregister from {{ meetup.title }} ?
        </v-card-title>
        <v-container>
          <v-layout row justify-center>
            <v-flex xs11>
              <v-card-text
                >You can always change your decision later on. 😁</v-card-text
              >
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false"> Cancel </v-btn>
          <v-btn
            v-if="!userIsRegistered"
            color="primary"
            text
            @click="onRegister"
          >
            Save
          </v-btn>
          <v-btn v-else color="red" text @click="onUnregister"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex((mid) => {
          return mid === this.meetup.id;
        }) >= 0
      );
    },
  },
  methods: {
    onRegister() {
      this.dialog = false;
      this.$store.dispatch("registerMeetup", { mid: this.meetup.id });
    },
    onUnregister() {
      this.dialog = false;
      this.$store.dispatch("unregisterMeetup", { mid: this.meetup.id });
    },
  },
};
</script>
