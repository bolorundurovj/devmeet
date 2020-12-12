<template>
  <v-container>
    <v-layout row wrap justify-center class="mb-4 mt-2 justify-content-center">
      <v-flex xs12 sm6 class="text-center mb-4">
        <v-btn class="primary mx-auto" large router to="/meetups"
          >Explore Meetups</v-btn
        >
      </v-flex>
      <v-flex xs12 sm6 class="text-center mb-4">
        <v-btn class="primary" large router to="/meetup/new"
          >Organize Meetup</v-btn
        >
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <div class="title">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center class="mb-4 mt-2 justify-content-center">
      <v-flex xs12 class="text-center mb-4">
        <p class="mx-auto">Join Our Awesome Meetups</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      meetups: [
        {
          imageUrl:
            "https://technext.ng/wp-content/uploads/2018/08/TEF-Forum-2017-4-750x354.jpg",
          id: "hdhsjjueuurrufnfnf",
          title: "Meetup In Lagos",
        },
        {
          imageUrl:
            "https://techpoint.africa/wp-content/uploads/2018/02/TECHPOINT-BUILD-Event-2-55-of-99-1024x683.jpg",
          id: "hdhsjkwiujeeuue",
          title: "Meetup In Abuja",
        },
        {
          imageUrl:
            "https://techpoint.africa/wp-content/uploads/2018/02/google.jpeg",
          id: "oeoiruirnncnc",
          title: "Meetup In Ibadan",
        },
        {
          imageUrl:
            "https://cdn.movemeback.com/media/thumbnails/images/lagos-business-academy-how-to-build-your-tech-startup-event-cover-20190630-18195239/dd658dc20d402a5dfd01f672b176f72b.jpg",
          id: "nfnjskaalalalsmks",
          title: "Meetup In Port Harcourt",
        },
      ],
    };
  },
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 5px 20px;
}
</style>