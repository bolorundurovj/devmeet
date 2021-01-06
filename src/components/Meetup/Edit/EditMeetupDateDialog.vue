<template>
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="mx-2"
          fab
          dark
          small
          color="primary"
        >
          <v-icon dark>mdi-circle-edit-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline primary lighten-2 white--text">
          Edit Meetup DateTime
        </v-card-title>
        <v-container>
          <v-layout row justify-center>
              <v-card-content>
                <v-row>
                  <v-col sm12 >
                    <v-date-picker v-model="date"></v-date-picker>
                  </v-col>
                  <v-col sm12>
                    <v-time-picker v-model="time" format="ampm"></v-time-picker>
                  </v-col>
                </v-row>
              </v-card-content>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false"> Cancel </v-btn>
          <v-btn color="primary" text @click="onSaveChanges"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editedDate: this.meetup.date,
      date: new Date(this.meetup.date).toISOString().substr(0, 10),
      time: new Date(this.meetup.date),
    };
  },
  methods: {
    onSaveChanges() {
      if (this.editedDate == null || this.editedDate == undefined) {
        alert("Ensure you have filled out Date & Time");
        return;
      }
      this.dialog = false;
      this.$store.dispatch("updateMeetupDetails", {
        date: this.submittableDateTime,
        id: this.meetup.id,
      });
    },
  },
  computed: {
    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    },
  },
};
</script>
