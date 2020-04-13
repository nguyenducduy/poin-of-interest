export const state = () => ({
  loading: false,
  addLoading: false,
  deleteLoading: false,
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
  LOAD_DONE(state) {
    state.loading = false;
  },
  ADD_PENDING(state) {
    state.addLoading = true;
  },
  ADD_DONE(state) {
    state.addLoading = false;
  },
  DELETE_PENDING(state) {
    state.deleteLoading = true;
  },
  DELETE_DONE(state) {
    state.deleteLoading = false;
  },
  SET_DATA(state, response) {
    state.data = response || null;
  },
  ADD_DATA(state, response) {
    state.data.push(response);
  },
  DELETE_DATA(state, id) {
    state.loading = false;
    const index = state.data.findIndex(item => item.id === id);
    state.data.splice(index, 1);
  }
};

export const actions = {
  async get_all({ commit }, { piid }) {
    commit("LOAD_PENDING");

    const response = await this.$axios.$post("/", { query: `{
        getPoiNotes (
          piid: ${ piid }
        ) {
          id,
          text,
          dateCreated
        }
      }` });

    commit("LOAD_DONE");

    if (typeof response.errors === "undefined") {
      return commit("SET_DATA", response.data.getPoiNotes);
    } else {
      return response.errors;
    }
  },

  async add({ commit }, { value }) {
    commit("ADD_PENDING");

    const response = await this.$axios.$post("/", { query: `
        mutation (
          $input: JSON!
        ) {
          addPoiNote (
            input: $input
          ) {
            id,
            text,
            dateCreated
          }
        }
      `, variables: { input: value } });

    commit("ADD_DONE");

    return typeof response.errors === "undefined"
      ? commit("ADD_DATA", response.data.addPoiNote)
      : response.errors;
  },

  async delete({ commit }, { id }) {
    commit("DELETE_PENDING");

    const response = await this.$axios.$post("/", {
      query: `
        mutation (
          $id: Int!
        ) {
          removePoiNote(
            id: $id
          )
        }
      `,
      variables: {
        id: id
      }
    });

    commit("DELETE_DONE");

    return typeof response.errors === "undefined"
      ? commit("DELETE_DATA", id)
      : response.errors;
  }
};
