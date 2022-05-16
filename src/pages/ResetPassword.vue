<template>
  <v-container>
    <div>
      <h4 class="display-1">Reset Password</h4>

      <instructions details="Reset your password here" />

      <v-form v-model="valid">
        <v-text-field
          v-model="member.email"
          label="Email"
          name="email"
          type="text"
        ></v-text-field>
        <v-text-field
          v-model="member.currentPassword"
          id="password"
          label="Current Password"
          name="password"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="member.newPassword"
          id="newPassword"
          label="New Password"
          name="newPassword"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="member.confirmPassword"
          id="confirmPassword"
          v-bind:rules="rules.confirmPassword"
          type="password"
          label="Confirm new password"
          required
        >
        </v-text-field>
        <v-btn v-bind:disabled="!valid" v-on:click="handleSubmit"
          >Reset Password
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
import Instructions from "../components/Instructions.vue";

export default {
  name: "ResetPasswordPage",
  components: {
    Instructions, // Use the Instructions component we just imported
  },
  data: function() {
    return {
      valid: false, // Are all the fields in the form valid?

      // Object to collect account data
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
  },
};
</script>
