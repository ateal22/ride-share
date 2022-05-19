<template>
  <v-app-bar app dark color="success">
    <router-link v-if="!isLoggedIn" v-bind:to="{ name: 'home-page' }">
      <v-toolbar-title class="white--text font-weight-bold">
        RideZone
      </v-toolbar-title>
    </router-link>

    <router-link v-if="isLoggedIn" v-bind:to="{ name: 'userhome' }">
      <v-toolbar-title class="white--text font-weight-bold">
        RideZone
      </v-toolbar-title>
    </router-link>

    <v-img
      src="kachow.ico"
      max-height="75"
      max-width="100"
      contain
    ></v-img>

    <v-toolbar-title class="white--text">
      Kachow!
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="!isLoggedIn" text v-bind:to="{ name: 'sign-up' }">Sign Up</v-btn>
    <v-btn v-if="!isLoggedIn" text v-bind:to="{ name: 'sign-in' }">Sign In</v-btn>
    <v-btn v-if="isLoggedIn" text @click="signOut">Log Out</v-btn>
    <v-btn text v-bind:to="{ name: 'about-us' }">About Us</v-btn>
    <v-btn text v-bind:to="{ name: 'rides' }">Rides</v-btn>
    <v-btn text v-bind:to="{ name: 'details' }">Ride Details</v-btn>


    <v-menu v-if="isLoggedIn" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon dark>mdi-account</v-icon>
          <span>{{ $store.state.currentUser.firstName }}</span>
          <v-icon dark>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-bind:to="{ name: 'User' }">
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item @click="signOut">
          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },

  methods: {
    signOut() {
      this.$store.commit("logOut");
      if (this.$router.currentRoute.name != "home-page") {
        this.$router.push({ name: "home-page" });
      }
    }
  }
};
</script>
