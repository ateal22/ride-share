<template>
    <div >
    <div align="right" class="mt-10">
        <v-btn v-on:click="handleSubmit" align="right" color="success" class="mx-10"
          >Sign up as Driver
        </v-btn>
    </div>
    <div align="right" class="mt-10">
        <v-btn v-on:click="handleSubmit" align="right" color="success" class="mx-10"
          >Sign up as Passenger
        </v-btn>
    </div>
        <div content="width=50%">
        <v-container>
            <v-row justify="left">
                <v-col cols="12" sm="8" md="6">
                    <v-card class="elevation-12">
                        <v-toolbar color="success" dark flat>
                            <v-toolbar-title>Ride.fromLocation</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-img src="https://www.salesforce.org/wp-content/uploads/2016/07/Taylor.jpg"></v-img>
                            <p>Departs: Ride.time, Ride.date</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        </div>
        <div>
        <v-container>
            <v-row justify="left">
                <v-col cols="12" sm="8" md="6">
                    <v-card class="elevation-12">
                        <v-toolbar color="success" dark flat>
                            <v-toolbar-title>Ride.toLocation</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-img src="https://fox59.com/wp-content/uploads/sites/21/2019/03/gettyimages-459398513.jpg"></v-img>
                            <p>Estimated Arrival: Ride.time, Ride.date</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        </div>
        <div>
            <v-img src="ride-share/src/public/map.png"></v-img>
           
        </div>
        

    </div>

</template>