<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" persistent>
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
          Edit Meetup
        </v-card-title>
        <v-container>
          <v-layout row justify-center>
            <v-flex xs11>
              <v-card-content style="width: 90%">
                <v-text-field
                  v-model="editedTitle"
                  label="Title"
                  :rules="titleRules"
                  required
                ></v-text-field>

                <v-textarea
                  v-model="editedDescription"
                  label="Description"
                  :rules="descriptionRules"
                  required
                >
                </v-textarea>
              </v-card-content>
            </v-flex>
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
  </div>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      titleRules: [(v) => !!v || "Title is required"],
      descriptionRules: [(v) => !!v || "Description is required"],
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle == null ||
        this.editedTitle == undefined ||
        this.editedTitle.trim() == "" ||
        this.editedDescription == null ||
        this.editedDescription == undefined ||
        this.editedDescription.trim() == ""
      ) {
        alert("Ensure you have filled out the title and description");
        return;
      }
      this.dialog = false;
      this.$store.dispatch("updateMeetupDetails", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
      });
    },
  },
};
</script>
