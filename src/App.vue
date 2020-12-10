<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon
        @click.stop="sideNav = !sideNav"
        class="d-sm-none"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>DevMeet</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-sm-block">
        <v-btn>
          <v-icon left>mdi-account-supervisor</v-icon>
          View Meetups
        </v-btn>
      </v-toolbar-items>
      <v-switch
        v-model="$vuetify.theme.dark"
        hint="This toggles Dark Mode"
        inset
        label="Dark Mode"
        persistent-hint
        class="mx-4 d-none d-sm-block"
      ></v-switch>
    </v-app-bar>

    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-switch
              v-model="$vuetify.theme.dark"
              hint="This toggles Dark Mode"
              inset
              label="Dark Mode"
              persistent-hint
            ></v-switch>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    //
    sideNav: false,
    items: [
      { title: "View Meetups", icon: "mdi-account-supervisor" },
    ],
  }),
};
</script>
