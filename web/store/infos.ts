import FormData from "form-data";

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
    state.recordPerPage = response.meta.perPage || 30;
    state.query.page = response.meta.curPage || 1;
  },
  UPDATE_DATA(state, response) {
    state.loading = false;
    const index = state.data.findIndex(item => item.id === response.id);
    state.data.splice(index, 1, response);
  }
};

export const actions = {
  async get_all({ commit }, { query }) {
    commit("LOAD_PENDING");

    const response = await this.$axios.$post("/", {
      query: `{
        getPoiInfos (
          opts: {
            curPage: ${typeof query.page !== "undefined" ? query.page : 1},
            perPage: ${typeof query.limit !== "undefined" ? query.limit : 30},
            q: "${typeof query.q !== "undefined" ? query.q : ""}",
            sort: "${typeof query.sort !== "undefined" ? query.sort : "-id"}",
            poitype: "${typeof query.poitype !== "undefined" ? query.poitype : ""}"
          }
        ) {
          items {
            type { id, name },
            id,
            name,
            similar,
            number,
            street,
            ward { id, name},
            district { id, name},
            city { id, name},
            lat,
            lng,
            website,
            phoneNumber,
            rating,
            ggFullAddress,
            status,
            notes { id },
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
      return commit("SET_DATA", response.data.getPoiInfos);
    } else {
      commit("LOAD_FAIL");
      return response.errors;
    }
  },

  async get_one({ commit }, { id }) {
    const response = await this.$axios.$post("/", {
      query: `{
        getPoiInfo (
          id: ${id}
        ) {
          type { id, name },
          id,
          name,
          status,
          similar,
          number,
          street,
          ward { id, name},
          district { id, name},
          city { id, name},
          lat,
          lng,
          website,
          phoneNumber,
          rating,
          ggFullAddress,
          notes { id },
          dateCreated
        }
      }`
    });

    return typeof response.errors === "undefined" ? response.data.getPoiInfo : response.errors;
  },

  async update({ commit }, { id, input }) {
    const response = await this.$axios.$post("/", {
      query: `
        mutation (
          $id: Int!,
          $input: JSON!
        ) {
          updatePoiInfo (
            id: $id,
            input: $input
          ) {
            type { id, name },
            id,
            name,
            status,
            similar,
            number,
            street,
            ward { id, name},
            district { id, name},
            city { id, name},
            lat,
            lng,
            website,
            phoneNumber,
            rating,
            ggFullAddress,
            notes { id },
            dateCreated
          }
        }
      `,
      variables: { id: id, input: input }
    });

    return typeof response.errors === "undefined"
      ? commit("UPDATE_DATA", response.data.updatePoiInfo)
      : response.errors;
  },

  async change_type({ commit }, { id, typeId }) {
    const response = await this.$axios.$post("/", {
      query: `
        mutation (
          $id: Int!,
          $typeId: Int!
        ) {
          changePoiType(
            id: $id,
            typeId: $typeId
          ) {
            type { id, name },
            id,
            name,
            similar,
            number,
            street,
            ward { id, name},
            district { id, name},
            city { id, name},
            lat,
            lng,
            website,
            phoneNumber,
            rating,
            ggFullAddress,
            status,
            notes { id },
            dateCreated
          }
        }
      `,
      variables: { id: parseInt(id), typeId: parseInt(typeId) }
    });

    return typeof response.errors === "undefined"
      ? commit("UPDATE_DATA", response.data.changePoiType)
      : response.errors;
  },

  async import_octoparse({ commit }, { formData }) {
    return await Promise.all(
      formData.map(async file => {
        const o = {
          query: `mutation ($file: Upload!) {
            uploadOctoparse (file: $file)
          }`,
          variables: {
            file: null
          }
        };

        const map = {
          "0": ["variables.file"]
        };

        let fd = new FormData();
        fd.append("operations", JSON.stringify(o));
        fd.append("map", JSON.stringify(map));
        fd.append(0 as any, file.raw, file.raw.name);

        const response = await this.$axios.post("/", fd);

        // return typeof response.errors === "undefined"
        //   ? commit("UPDATE_DATA", response.data.changePoiType)
        //   : response.errors;
      })
    );
  },

  async change_status({ commit }, { id, value }) {
    let status = 0;

    switch (value) {
      case true:
        status = 1;
        break;
      case false:
        status = 3;
        break;
    }

    const response = await this.$axios.$post("/", {
      query: `
        mutation (
          $id: Int!,
          $status: Int!
        ) {
          changeStatus(
            id: $id,
            status: $status
          ) {
            type { id, name },
            id,
            name,
            similar,
            number,
            street,
            ward { id, name},
            district { id, name},
            city { id, name},
            lat,
            lng,
            website,
            phoneNumber,
            rating,
            ggFullAddress,
            status,
            notes { id },
            dateCreated
          }
        }
      `,
      variables: { id: parseInt(id), status: status }
    });

    return typeof response.errors === "undefined" ? commit("UPDATE_DATA", response.data.changeStatus) : response.errors;
  }
};
