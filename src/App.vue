<template>
  <v-app>
    <div>
      <v-app-bar>
        <v-app-bar-nav-icon
          @click.stop="sideNav = !sideNav"
          class="d-sm-none"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer"
            >DevMeet</router-link
          >
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items
          class="d-none d-sm-block"
          v-for="item in menuItems"
          :key="item.title"
        >
          <v-btn depressed router :to="item.link">
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-if="userIsAuthenticated" class="d-none d-sm-block">
          <v-btn depressed @click="onLogout">
            <v-icon left>mdi-exit-to-app</v-icon>
            Logout
          </v-btn>
        </v-toolbar-items>
        <v-switch
          v-model="$vuetify.theme.dark"
          hint="This toggles Dark Mode"
          inset
          label="Dark Mode"
          class="mx-4 mt-4 d-none d-sm-block"
        ></v-switch>
      </v-app-bar>
    </div>

    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ getUserName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-btn depressed @click="onLogout">
            <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              Logout
            </v-list-item-title>
          </v-list-item-content>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-switch
              v-model="$vuetify.theme.dark"
              hint="This toggles Dark Mode"
              inset
              label="Dark Mode"
              class="mx-4"
            ></v-switch>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    sideNav: false,
  }),
  methods: {
    onLogout(){
      this.$store.dispatch('logout')
    }
  },
  computed: {
    menuItems() {
      let menuItems = [
        { title: "Sign Up", icon: "mdi-account-lock", link: "/register" },
        { title: "Sign In", icon: "mdi-lock-open", link: "/login" },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            title: "View Meetups",
            icon: "mdi-account-supervisor",
            link: "/meetups",
          },
          {
            title: "Organize Meetups",
            icon: "mdi-map-marker",
            link: "/meetup/new",
          },
          { title: "Profile", icon: "mdi-account", link: "/profile" },
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    getUserName() {
      if (this.$store.getters.user !== null) {
        return this.$store.getters.user.name !== null
          ? this.$store.getters.user.name
          : "Anon";
      } else {
        return "Unauthenticated";
      }
    },
  },
};
</script>
