export const state = () => ({
  data: [],
  query: {},
  formSource: {},
  totalItems: 0,
  recordPerPage: 0
});

export const mutations = {
  SET_TREES(state, response) {
    state.data = response || null;
  }
};

export const actions = {
  async get_trees({ commit }) {
    const response = await this.$axios.$post("/", {
      query: `{
        getTrees {
          id,
          name,
          slug,
          order,
          children
        }
      }`
    });

    return typeof response.errors === "undefined"
        ? commit("SET_TREES", response.data.getTrees)
      : response.errors;
  }
};
