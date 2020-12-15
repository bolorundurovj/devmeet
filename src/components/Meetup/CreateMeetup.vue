<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs11 sm8>
        <h2 class="primary--text">Create a new Meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs11 sm8>
        <v-form>
          <v-text-field
            v-model="title"
            :rules="titleRules"
            label="Title"
            required
          ></v-text-field>
          <v-text-field
            v-model="location"
            :rules="locationRules"
            label="Location"
            required
          ></v-text-field>
          <v-text-field
            v-model="imageUrl"
            :rules="imageRules"
            label="Image URL"
            required
          ></v-text-field>
          <v-layout row>
            <v-flex xs11 sm8>
              <img
                :src="imageUrl"
                alt=""
                class="mr-4"
                style="height: 100px; width: auto"
              />
            </v-flex>
          </v-layout>
          <v-textarea
            v-model="description"
            :rules="descriptionRules"
            label="Description"
            required
          >
          </v-textarea>

          <v-select
            v-model="select"
            :items="items"
            :rules="[(v) => !!v || 'This is required']"
            label="Meetup Size"
            required
          ></v-select>

          <!-- <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree to our terms?"
            required
          ></v-checkbox> -->

          <v-btn
            :disabled="!formIsValid"
            color="success"
            class="mr-4"
            @click="onCreateMeetup"
          >
            Create meetup
          </v-btn>

          <!-- <v-btn color="error" class="mr-4" @click="reset"> Cancel </v-btn> -->
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: "",
    titleRules: [(v) => !!v || "Title is required"],
    location: "",
    locationRules: [(v) => !!v || "Location is required"],
    imageUrl: "",
    imageRules: [(v) => !!v || "Image is required"],
    description: "",
    descriptionRules: [(v) => !!v || "Description is required"],
    select: null,
    items: ["1-20", "21-50", "51-100", "Above 100"],
  }),
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    },
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: new Date(),
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
  },
};
</script>