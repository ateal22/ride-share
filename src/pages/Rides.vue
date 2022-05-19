<template>
  <v-container>
    <div align="center">
      <h4 class="display-1">Rides</h4>

      <h2> Join a ride here! </h2>

      
    <div>
      <div class="search-wrapper panel-heading mt-10 px-1" align="left" style="background-color:success">
        <input type="text" v-model="search" placeholder="Search for a Ride" /> </div>
    </div>

    <div>

      <v-data-table
        v-bind:headers="headers"
        v-bind:items="Ride"
      >
      <template v-slot:item="{item}">
        <tr v-bind:class="itemClass(item)">
          <td>{{ item.date }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.fromLocation }}</td>
          <td>{{ item.toLocation }}</td>
          <td>{{ item.distance }}</td>
          <td>
            <v-icon small @click="deleteAccount(item)">
              mdi-pencil
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

      </div>

      <table id="rideTable">
        <col style="width:17%" />
        <col style="width:17%"/>
        <col style="width:17%"/>
        <col style="width:17%"/>
        <col style="width:17%"/>
        <col style="width:17%"/>
        <thead>
          <tr>
            <th>Start Location</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Driver</th>
            <th>Number of Passengers</th>
            <th>Available Seats</th>
          </tr>
        </thead>
      </table>
    </div>

    <div align="center" class="mt-10">
        <v-btn v-on:click="handleSubmit" align="left" color="success" class="mx-10"
          >Sign up as Driver
        </v-btn>

        <v-btn v-on:click="popup" align="center" color="success" class="mx-10"
          >popup test
        </v-btn>

        <v-btn v-on:click="handleSubmit" align="right" color="success" class="mx-10"
          >Sign up as Passenger
        </v-btn>

        
    </div>

    <div class="text-xs-center">
        <v-dialog v-model="dialogVisible" width="500">
          <v-card>
            <v-card-title primary-title>
              {{ dialogHeader }}
            </v-card-title>

            <v-card-text>
              {{ dialogText }}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" text v-on:click="hideDialog">Okay</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
  </v-container>
</template>

<script>
export default {
  name: "RidesPage",
  components: {
    //Instructions, // Use the Instructions component we just imported
  },
  data: function() {
    return {
      valid: false, // Are all the fields in the form valid?
      // Object to collect user data
      member: {
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      // Was a password reset successfully?
      resetPassword: false,
      // Data to be displayed by the dialog.
      dialogHeader: "<no dialogHeader>",
      dialogText: "<no dialogText>",
      dialogVisible: false,
      // Validation rules for the form fields. This functionality is an extension
      // that's part of the Vuetify package. Each rule is a list of functions
      // (note the fat arrows). Vuetify invokes all functions in the list,
      // passing it the content of the associated form field. Functions should
      // return either true (the field passes that validation) or a string
      // containing an error message indicating why the field doesn't pass validation.
      rules: {
        required: [(val) => val.length > 0 || "Required"],
        email: [
          (val) => /\w{3,}@\w{3,}(?:.\w{3,})+$/.test(val) || "Invalid e-mail",
        ],
        newPassword: [
          (val) => /[A-Z]/.test(val) || "Need upper case letter",
          (val) => /[a-z]/.test(val) || "Need lower case letter",
          (val) => /\d/.test(val) || "Need digit",
          (val) => val.length >= 8 || "Minimum 8 characters",
        ],
        confirmPassword: [
          (val) => /[A-Z]/.test(val) || "Need upper case letter",
          (val) => /[a-z]/.test(val) || "Need lower case letter",
          (val) => /\d/.test(val) || "Need digit",
          (val) => val.length >= 8 || "Minimum 8 characters",
          //(val) => strcmp(newPassword, confirmPassword) || "New Passord Matches"
          // api query update password field with new password
        ],
      },
    };
  },
  methods: {
    // Invoked when the user clicks the 'Reset' button.
    handleSubmit: function() {
      // Haven't been successful yet.
      this.resetPassword = false;
      // Post the content of the form to the Hapi server.
      this.$axios
        .post("/reset-password", {
          email: this.member.email,
          currentPassword: this.member.currentPassword,
          newPassword: this.member.newPassword,
          confirmPassword: this.member.confirmPassword,
        })
        .then((result) => {
          // Based on whether things worked or not, show the
          // appropriate dialog.
          if (result.data.ok) {
            this.showDialog("Success", result.data.msge);
            this.resetPassword = true;
          } else {
            this.showDialog("Sorry", result.data.msge);
          }
        })
        .catch((err) => this.showDialog("Failed", err));
    },
    // Helper method to display the dialog box with the appropriate content.
    showDialog: function(header, text) {
      this.dialogHeader = header;
      this.dialogText = text;
      this.dialogVisible = true;
    },
    // Invoked by the "Okay" button on the dialog; dismiss the dialog
    // and navigate to the home page.
    hideDialog: function() {
      this.dialogVisible = false;
      if (this.resetPassword) {
        // Only navigate away from the reset-password page if we were successful.
        this.$router.push({ name: "home-page" });
      }
    },

    popup: function() {
      this.showDialog("info")
    }
  },
};
</script>