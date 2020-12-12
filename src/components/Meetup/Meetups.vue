<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs11 sm8>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img
                  class="mr-2"
                  style="left: 10px"
                  height="130px"
                  src="https://techpoint.africa/wp-content/uploads/2018/02/TECHPOINT-BUILD-Event-2-55-of-99-1024x683.jpg"
                ></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0 text-h5">My Meetup</h5>
                    <div class="text-subtitle-2">17th December 2020</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn to="/meetups/111" text>
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
