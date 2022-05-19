<template>
  <v-container>
    <div>
      <h4 class="display-1">Become a driver</h4>



      <v-form v-model="valid">
        <v-text-field
          v-model="newDriver.licenseNumber"
          v-bind:rules="rules.required"
          label="License Number"
        ></v-text-field>
        <v-text-field
          v-model="newDriver.state"
          v-bind:rules="rules.required"
          label="State license was issued in"
        ></v-text-field>
        <v-text-field
          v-model="newDriver.vehicle"
          v-bind:rules="rules.required"
          error-count="10"
          type="vehicle"
          label="Your authorized vehicle"
        >
        </v-text-field>
        <v-btn v-bind:disabled="!valid" v-on:click="handleSubmit"
          >Sign Up
        </v-btn>
      </v-form>

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
              <v-btn color="primary" text v-on:click="hideDialog">Okay</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-container>
</template>

<script>


export default {
  name: "SignUpPage",
  
  data: function () {
    return {
      valid: false, // Are all the fields in the form valid?

      // Object to collect user data
      newDriver: {
        licenseNumber: "",
        state: "",
        vehicle: "",
        name: "",
      },

      // Was an user created successfully?
      driverCreated: false,

      // Data to be displayed by the dialog.
      dialogHeader: "<no dialogHeader>",
      dialogText: "<no dialogText>",
      dialogVisible: false,

      rules: {
        required: [(val) => val.length > 0 || "Required"],
      },
    };
  },

  methods: {
    // Invoked when the user clicks the 'Sign Up' button.
    handleSubmit: function () {
      // Haven't been successful yet.
      this.driverCreated = false;

      // Post the content of the form to the Hapi server.
      this.$axios
        .post("/users", {
          licenseNumber: this.newDriver.licenseNumber,
          state: this.newDriver.state,
          vehicle: this.newDriver.vehicle,
        })
        .then((result) => {
          // Based on whether things worked or not, show the
          // appropriate dialog.
          if (result.data.ok) {
            this.showDialog("Success", result.data.msge);
            this.driverCreated = true;
          } else {
            this.showDialog("Sorry", result.data.msge);
          }
        })
        .catch((err) => this.showDialog("Failed", err));
    },

    // Helper method to display the dialog box with the appropriate content.
    showDialog: function (header, text) {
      this.dialogHeader = header;
      this.dialogText = text;
      this.dialogVisible = true;
    },

    // Invoked by the "Okay" button on the dialog; dismiss the dialog
    // and navigate to the home page.
    hideDialog: function () {
      this.dialogVisible = false;
      if (this.driverCreated) {
        // Only navigate away from the sign-up page if we were successful.
        this.$router.push({ name: "userhome" });
      }
    },
  },
};
</script>
