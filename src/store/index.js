import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import config from "./modules/config";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    config
  }
});
