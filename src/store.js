import { createStore } from 'vuex';

const store = createStore({
  state: {
    theLanguage: 'english',
    theMotherThonge: 'english',
    theAvatar: '',
    theAvatarName: ''
  },
  mutations: {
    setTheLanguage(state, newValue) {
      state.theLanguage = newValue;
    },
    setTheMotherThonge(state, newValue) {
      state.theMotherThonge = newValue;
    },
    setTheAvatar(state, newValue) {
      state.theAvatar = newValue;
    },
    setTheAvatarName(state, newValue) {
      state.theAvatarName = newValue;
    }
  },
  actions: {
    setTheLanguage({ commit }, newValue) {
      commit('setTheLanguage', newValue);
    },
    setTheMotherThonge({ commit }, newValue) {
      commit('setTheMotherThonge', newValue);
    },
    setTheAvatar({ commit }, newValue) {
      commit('setTheAvatar', newValue);
    },
    setTheAvatarName({ commit }, newValue) {
      commit('setTheAvatarName', newValue);
    }
  }
});

export default store;
