<template>
    <v-container>
    <div class="container">
      <h1 class="display-1 text-center">Welcome, getUser !!</h1>

    </div>
    <div align="center" class="mt-10">
        <v-btn v-on:click="isDriver" align="left" color="success" class="mx-10"
          >Become a driver
        </v-btn>

        <v-btn v-on:click="popup" align="center" color="success" class="mx-10"
          >View all users
        </v-btn>

        <v-btn v-on:click="toRides" align="right" color="success" class="mx-10"
          >Create or Join a Ride
        </v-btn>

    </div>
      <v-snackbar v-model="snackbar.show">
      {{ snackbar.msge }}
      <v-btn text color="primary" @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>

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
  name: "UserHome",
  data() {
    return {
      dialogHeader: "<no dialogHeader>",
      dialogText: "<no dialogText>",
      dialogVisible: false,
      driver: "",
      snackbar: {
        show: false,
        msge: "",
      },
    };
  },

  methods: {
    isDriver: function() {
      this.$axios
        .get("/driver", {
          driver: this.driver,
        })
        .then((result) => {
          this.showSnackbar(result.data.msge);
          if (this.Driver.userId != 1) {
              this.showSnackbar(this.snackbar.setText("You're already a Driver."));
          }
        })
        .catch((err) => this.showSnackbar(err));
    },

    showDialog: function(header, text) {
      this.dialogHeader = header;
      this.dialogText = text;
      this.dialogVisible = true;
    },

    hideDialog: function() {
      this.dialogVisible = false;
    },

    toRides: function() {
        this.$router.push({ name: "rides" });
    },

    popup: function() {
      this.showDialog("info")
    },

    toUsers: function() {
      if (this.User.isAdmin==true){
        this.$router.push({ name: "users" });
      } else {
        this.showDialog("Only Admins can view all users.")
      }
    },

    showSnackbar(msge) {
      this.snackbar.msge = msge;
      this.snackbar.show = true;
    },
  },
};
</script>
