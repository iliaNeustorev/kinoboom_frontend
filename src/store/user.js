export default (userApi) => {
  let userPromiseResolver;
  let userReadyPromise = new Promise((resolve) => {
    userPromiseResolver = resolve;
  });
  return {
    namespaced: true,

    state: {
      user: {},
    },
    getters: {
      user: (state) => state.user,
      isAdmin: (state) => state.user.admin,
      hasRole: (state) => (role) =>
        state.user.roles?.some((elem) => elem.name === role),
      isAuth: (state) => state.user.name != undefined,
      likes: (state) => state.user.likes,
      dislikes: (state) => state.user.dislikes,
      inLikes: (state) => (id) =>
        Object.keys(state.user.likes).some((elem) => elem == id),
      inDislikes: (state) => (id) =>
        Object.keys(state.user.dislikes).some((elem) => elem == id),
      ready: (state) => userReadyPromise,
    },
    mutations: {
      setUser(state, payload) {
        state.user = payload;
      },
      setLike(state, { id, model }) {
        state.user.likes[id] = model;
        state.user.likes = Object.assign({}, state.user.likes);
      },
      setDislike(state, { id, model }) {
        state.user.dislikes[id] = model;
        state.user.dislikes = Object.assign({}, state.user.dislikes);
      },
      deleteLike(state, { id, model }) {
        delete state.user.likes[id] == model;
      },
      deleteDislike(state, { id, model }) {
        delete state.user.dislikes[id] == model;
      },
    },
    actions: {
      setRate(context, { id, model, method }) {
        if (method == "like") {
          context.dispatch("deleteRate", { id, model, method: "dislike" });
          context.commit("setLike", { id, model });
        } else if (method == "dislike") {
          context.dispatch("deleteRate", { id, model, method: "like" });
          context.commit("setDislike", { id, model });
        } else {
          alert("method undefined");
        }
      },
      deleteRate(context, { id, model, method }) {
        if (method == "like") {
          context.commit("deleteLike", { id, model });
        } else if (method == "dislike") {
          context.commit("deleteDislike", { id, model });
        } else {
          alert("method undefined");
        }
      },
      changeUser(context, payload) {
        context.commit("setUser", payload);
      },
      async checkUser(context) {
        try {
          const user = await userApi.getUser();
          context.dispatch("changeUser", user);
        } catch (e) {
        } finally {
          userPromiseResolver();
        }
      },
      async authUser(context, payload) {
        await userApi.checkSanctum();
        let user = await userApi.login(payload);
        context.dispatch("changeUser", user);
      },
      async logoutUser() {
        await userApi.logout();
        document.location = "/";
      },
    },
  };
};
