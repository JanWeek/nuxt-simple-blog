export const state = () => ({
  username: null,
  accessToken: null
});

export const getters = {
  username: state => state.username
};

export const actions = {
  async login({ commit }, { username, password }) {
    try {
      const data = await this.$axios.$post('/api/user/login', { username, password });
      commit('SET_USER', data.username);
      commit('SET_TOKEN', data.token);
      this.$axios.setToken(data.token);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        throw new Error(e.response.data);
      }
      throw e;
    }
  },
  async logout({ commit }) {
    const username = await this.getters['user/username'];
    await this.$axios.$post('/api/user/logout', { username });
    commit('SET_USER', null);
    commit('SET_TOKEN', null);
    this.$axios.setToken(false);
  },
  async registerNewUser({ commit }, { username, password }) {
    try {
      await this.$axios.$post('/api/user/new', { username, password });
    } catch (e) {
      if (e.response && e.response.status === 409) {
        throw new Error(e.response.data);
      }
      throw e;
    }
  }
};

export const mutations = {
  SET_USER(state, user) {
    state.username = user;
  },
  SET_TOKEN(state, token) {
    state.accessToken = token;
  }
};
