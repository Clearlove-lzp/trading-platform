const state = {
  userInfo: {},
};

const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
