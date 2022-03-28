<template>
  <v-container>
    <app-alert
      v-if="error"
      @dismissed="onDismissed"
      :text="error.message"
    ></app-alert>
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
              :loading="loading"
              :disabled="loading || !valid"
              color="success"
              @click="onSignin"
            >
              Sign In
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
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
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
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
    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>