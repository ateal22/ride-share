import Vue from "vue";
import Router from "vue-router";

import Home from "./pages/Home.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import About from "./pages/About.vue";
import Users from "./pages/Users.vue";
import Rides from "./pages/Rides.vue";
import Map from "./pages/Map.vue";
import UserHome from "./pages/UserHome.vue";
import Driver from "./pages/Driver.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { name: "home-page", path: "/", component: Home },
    { name: "sign-up", path: "/sign-up", component: SignUp },
    { name: "sign-in", path: "/sign-in", component: SignIn },
    { name: "about-us", path: "/about-us", component: About },
    { name: "users", path: "/users", component: Users },
    { name: "rides", path: "/rides", component: Rides },
    { name: "map", path: "/map", component: Map },
    { name: "userhome", path: "/userhome", component: UserHome },
    { name: "driver", path: "/driver", component: Driver },
  ]
});
