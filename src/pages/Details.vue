<template>
    <div >
        <div align="center">
            <h1>Ride: Taylor University to Indianapolis Airport</h1>
        </div>
        <div content="width=50%" align="center">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" sm="8" md="6">
                    <v-card class="elevation-12">
                        <v-toolbar color="success" dark flat>
                            <v-toolbar-title>Taylor University</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-img src="https://www.salesforce.org/wp-content/uploads/2016/07/Taylor.jpg"></v-img>
                            <p></p>
                            <p>236 W Read Ave, Upland, IN 46989</p>
                            <p>Departs: Friday May 20, 2022 3:00pm EST</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        </div>
        <div align="center">
        <v-container>
            <v-row justify= "center">
                <v-col cols="12" sm="8" md="6">
                    <v-card class="elevation-12">
                        <v-toolbar color="success" dark flat>
                            <v-toolbar-title>Indianapolis Airport</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-img src="https://fox59.com/wp-content/uploads/sites/21/2019/03/gettyimages-459398513.jpg"></v-img>
                            <p></p>
                            <p>7800 Col H Weir Cook Memorial Dr. Indianapolis, IN 46241</p>
                            <p>Estimated Arrival Time: Friday May 20, 2022 4:30pm EST</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        </div>
        <div>
            <v-img src="ride-share/src/public/map.png"></v-img>
           
        </div>
        <div align="center" class="mt-10">
        <v-btn v-on:click="handleSubmit" align="right" color="success" class="mx-10"
          >Sign up as Driver
        </v-btn>
    </div>
    <div align="center" class="mt-10">
        <v-btn v-on:click="handleSubmit" align="right" color="success" class="mx-10"
          >Sign up as Passenger
        </v-btn>
    </div>

    </div>

</template>