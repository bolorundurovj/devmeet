export default {
  state: {
    loading: false,
    error: null,
    success: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setSuccess(state, payload) {
      state.success = payload;
    },
    clearSuccess(state) {
      state.success = null;
    },
  },
  actions: {
  },
  getters: {
    error(state) {
      return state.error;
    },
    success(state) {
      return state.success;
    },
    loading(state) {
      return state.loading;
    },
  },
};
