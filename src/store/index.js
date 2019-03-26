import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state = {
  message : {}
};

const mutations = {
  updateMessage(state,message){
    state.message = message;
  }
}
const store = new Vuex.Store({
  state,
  mutations
});
export default store;
