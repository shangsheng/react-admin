import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login";
import Home from '../views/home'
Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    redirect:"Login",
    hidden:true
  },
  {
    path: "/login",
    name: "Login",
    hidden:true,
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta:{
      title:"控制台",
      icon:"console",
      iconClass:"icon_console"
    },
    component: Home,
    //children:[{}]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
