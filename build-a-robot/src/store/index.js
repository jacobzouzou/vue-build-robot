import Vue from "vue";
import Vuex from "vuex";
import robotsModules from "./modules/robots";
import usersModules from "./modules/users";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        //root state
        foo:"root-foo"
    },
    modules:{
        robots:robotsModules,
        users:usersModules
    },
    getters:{
        // foo(state){
        //     return `Root-getter/ ${state.foo}`;
        // }
    }
});