<template>
  <v-container>
    <div align="center">
      <h4 class="display-1">Rides</h4>

      <h2> Join a ride here! </h2>

      </div>
    
  

    <div>

      <v-data-table
        v-bind:headers="headers"
        v-bind:items="rides"
      >
      <template v-slot:item="{item}">
        <tr v-bind:class="itemClass(item)">
          <td>{{ item.date }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.fromLocation }}</td>
          <td>{{ item.toLocation }}</td>
          <td>{{ item.distance }}</td>
          <td>
            <v-icon small @click="deleteRide(item)">
              mdi-pencil
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
        <v-btn color="blue" text @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Rides",

  data: function() {
    return {
      headers: [
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "From Location", value: "fromLocation" },
        { text: "To Location", value: "toLocation" }
      ],
      accounts: [],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    this.$axios.get("/rides").then(response => {
      this.rides = response.data.map(rides => ({
        date: rides.date,
        time: rides.time,
        fromLocation: rides.fromLocation,
        toLocation: rides.toLocation
      }));
    });
  },

  methods: {
    // Display a snackbar message.
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.show = true;
    },

    // Calculate the CSS class for an item
    itemClass(item) {
      const currentRide = this.$store.state.currentRide;
      if (currentRide && currentRide.id === item.id) {
        return "currentRide";
      }
    },

    // Update account information.
    updateRide(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      this.showSnackbar("Sorry, update is not yet implemented.");
    },

    // Delete an account.
    deleteRide(item) {
      this.$axios.delete(`/rides/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local account
          // by filtering the deleted account from the list of accounts.
          this.rides = this.rides.filter(
            rides => rides.id !== item.id
          );
        }
      });
    }
  }
};
</script>

<style>
.currentRide {
  background-color: #80D8FF;
}
</style>
  