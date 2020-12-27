<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs11 sm8 md8>
        <v-card elevation="2" class="py-4 px-8 mt-4" md8>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="[(v) => !!v || 'Password is required']"
              label="Password"
              required
              type="password"
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="onSignin"
            >
              Sign In
            </v-btn>
            {{ valid }}
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: null,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: null,
  }),
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    onSignin() {
      if (this.valid) {
        this.$store.dispatch("signUserIn", {
          email: this.email,
          password: this.password,
        });
      } else {
        alert("Please fill the form");
      }
    },
  },
};
</script>