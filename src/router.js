import Vue from "vue";
import Router from "vue-router";

import Home from "./pages/Home.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import About from "./pages/About.vue";
import User from "./pages/Users.vue";
import Rides from "./pages/Rides.vue";
import Details from "./pages/Details.vue";
import UserHome from "./pages/UserHome.vue";
import CreateRide from "./pages/CreateRide.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { name: "home-page", path: "/", component: Home },
    { name: "sign-up", path: "/sign-up", component: SignUp },
    { name: "sign-in", path: "/sign-in", component: SignIn },
    { name: "about-us", path: "/about-us", component: About },
    { name: "users", path: "/users", component: User },
    { name: "rides", path: "/rides", component: Rides },
    { name: "details", path: "/details", component: Details },
    { name: "userhome", path: "/userhome", component: UserHome },
    { name: "createride", path: "/createride", component: CreateRide },
  ]
});
