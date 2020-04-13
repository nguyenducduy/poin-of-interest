export const state = () => ({
  loading: false,
  data: [],
  query: {},
  formSource: {},
  totalItems: 0,
  recordPerPage: 0
});

export const mutations = {
  LOAD_PENDING(state) {
    state.loading = true;
  },
  LOAD_FAIL(state) {
    state.loading = false;
  },
  SET_DATA(state, response) {
    state.loading = false;
    state.data = response.items || null;
    state.totalItems = response.meta.totalResults || 0;
    state.recordPerPage = response.meta.perPage || 20;
    state.query.page = response.meta.curPage || 1;
  },
  ADD_DATA(state, response) {
    state.data.unshift(response);
  },
  UPDATE_DATA(state, response) {
    const index = state.data.findIndex(item => item.id === response.id);
    state.data.splice(index, 1, response);
  },
  DELETE_DATA(state, id) {
    state.loading = false;
    const index = state.data.findIndex(item => item.id === id);
    state.data.splice(index, 1);
    state.totalItems = state.totalItems - 1;
  }
};

export const actions = {
  async get_all({ commit }, { query }) {
    commit("LOAD_PENDING");

    const response = await this.$axios.$post("/", {
      query: `{
        getPoiTypes (
          opts: {
            curPage: ${typeof query.page !== "undefined" ? query.page : 1},
            perPage: ${typeof query.limit !== "undefined" ? query.limit : 20},
            q: "${typeof query.q !== "undefined" ? query.q : ""}",
            sort: "${typeof query.sort !== "undefined" ? query.sort : "-id"}"
          }
        ) {
          items {
            id,
            name,
            similar,
            ggSimilar,
            dateCreated
          },
          meta {
            curPage,
            perPage,
            totalPages,
            totalResults
          }
        }
      }`
    });

    if (typeof response.errors === "undefined") {
      return commit("SET_DATA", response.data.getPoiTypes);
    } else {
      commit('LOAD_FAIL');
      return response.errors;
    }
  },

  async suggest({ commit }, { keyword }) {
    const response = await this.$axios.$post("/", { query: `{
        searchPoiTypes (
          q: "${typeof keyword !== "undefined" ? keyword : ""}"
        ) {
          id,
          name,
          similar,
          ggSimilar,
          dateCreated
        }
      }` });

    return typeof response.errors === "undefined"
      ? response.data.searchPoiTypes
      : response.errors;
  },

  async update_similar({ commit }, { id, similar }) {
    let similarArr = [];
    await Promise.all(
      similar.map(item => {
        similarArr.push(item.text);
      })
    );

    const response = await this.$axios.$post("/", { query: `
        mutation (
          $id: Int!,
          $input: JSON!
        ) {
          updatePoiTypeSimilar (
            id: $id,
            input: $input
          ) {
            id,
            name,
            similar,
            ggSimilar,
            dateCreated
          }
        }
      `, variables: { id: id, input: { similar: similarArr.join(",") } } });

    return typeof response.errors === "undefined"
      ? commit("UPDATE_DATA", response.data.updatePoiTypeSimilar)
      : response.errors;
  },

  async update_gg_similar({ commit }, { id, similar }) {
    let similarArr = [];
    await Promise.all(
      similar.map(item => {
        similarArr.push(item.text);
      })
    );

    const response = await this.$axios.$post("/", {
      query: `
        mutation (
          $id: Int!,
          $input: JSON!
        ) {
          updatePoiTypeGgSimilar (
            id: $id,
            input: $input
          ) {
            id,
            name,
            similar,
            ggSimilar,
            dateCreated
          }
        }
      `,
      variables: {
        id: id,
        input: {
          similar: similarArr.join(",")
        }
      }
    });

    return typeof response.errors === "undefined"
      ? commit("UPDATE_DATA", response.data.updatePoiTypeGgSimilar)
      : response.errors;
  },

  async remove_similar_item({ commit }, { id, similarItem }) {
    const response = await this.$axios.$post("/", { query: `
        mutation (
          $id: Int!,
          $input: JSON!
        ) {
          removePoiTypeSimilarItem (
            id: $id,
            input: $input
          ) {
            id,
            name,
            similar,
            ggSimilar,
            dateCreated
          }
        }
      `, variables: { id: id, input: { similarItem: similarItem } } });

    return typeof response.errors === "undefined"
      ? commit("UPDATE_DATA", response.data.removePoiTypeSimilarItem)
      : response.errors;
  },

  async remove_gg_similar_item({ commit }, { id, similarItem }) {
    const response = await this.$axios.$post("/", {
      query: `
        mutation (
          $id: Int!,
          $input: JSON!
        ) {
          removePoiTypeGgSimilarItem (
            id: $id,
            input: $input
          ) {
            id,
            name,
            similar,
            ggSimilar,
            dateCreated
          }
        }
      `,
      variables: {
        id: id,
        input: {
          similarItem: similarItem
        }
      }
    });

    return typeof response.errors === "undefined"
      ? commit("UPDATE_DATA", response.data.removePoiTypeGgSimilarItem)
      : response.errors;
  },

  async add({ commit }, { input }) {
    const response = await this.$axios.$post("/", {
      query: `
        mutation (
          $input: JSON!
        ) {
          addPoiType (
            input: $input
          ) {
            id,
            name,
            similar,
            ggSimilar,
            dateCreated
          }
        }
      `, variables: { input: input }
    });

    return typeof response.errors === "undefined"
      ? commit("ADD_DATA", response.data.addPoiType)
      : response.errors;
  },

  async delete({ commit }, { id }) {
    const response = await this.$axios.$post("/", {
      query: `
        mutation (
          $id: Int!
        ) {
          removePoiType(
            id: $id
          )
        }
      `,
      variables: {
        id: id
      }
    });

    return typeof response.errors === "undefined"
      ? commit("DELETE_DATA", id)
      : response.errors;
  }
};
