<template>
  <v-container>
    <div>
      <h4 class="display-1">Users</h4>

      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="users"
      >
        <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.email }}</td>
            <td>{{ item.firstName }}</td>
            <td>{{ item.lastName }}</td>
            <td>
              <v-icon small @click="deleteUser(item)">
                mdi-delete
              </v-icon>
              <v-icon small class="ml-2" @click="updateUser(item)">
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
  name: "Users",

  data: function() {
    return {
      headers: [
        { text: "Email", value: "email" },
        { text: "First", value: "firstName" },
        { text: "Last", value: "lastName" },
        { text: "Action", value: "action" }
      ],
      users: [],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    this.$axios.get("/users").then(response => {
      this.users = response.data.map(users => ({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName
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
      const currentAccount = this.$store.state.currentAccount;
      if (currentAccount && currentAccount.id === item.id) {
        return "currentAccount";
      }
    },

    // Update user information.
    updateUser(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      this.showSnackbar("Sorry, update is not yet implemented.");
    },

    // Delete an user.
    deleteUser(item) {
      this.$axios.delete(`/users/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local user
          // by filtering the deleted user from the list of users.
          this.users = this.users.filter(
            users => users.id !== item.id
          );
        }
      });
    }
  }
};
</script>

<style>
.currentUser {
  background-color: #80D8FF;
}
</style>
