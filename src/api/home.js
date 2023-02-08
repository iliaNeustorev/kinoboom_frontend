export default (http) => ({
  async ratingHomePage() {
    let response = await http.get("api/home/rating", {
      errorStub: {
        text: "Не удалось загрузить рейтинг с сервера",
        fallback: [],
      },
    });
    return response.data;
  },

  async rating(page, direction, column) {
    let response = await http.post(
      "api/home/ratingPage",
      {
        page,
        direction,
        column,
        _method: "GET",
      },
      {
        errorStub: {
          text: "Не удалось загрузить рейтинг с сервера",
          fallback: { data: [] },
        },
      }
    );
    return response.data;
  },

  async getOneElement(slug) {
    let response = await http
      .get(`api/home/oneElement/${slug}`, {
        errorStub: {
          text: `Не удалось загрузить ${slug} с сервера`,
          fallback: {},
        },
      })
      .catch(() => {});
    return response.data;
  },

  async search(page, search) {
    let response = await http.post(
      "api/home/search",
      {
        page,
        search,
        _method: "GET",
      },
      {
        errorStub: {
          text: "Ошибка поиска сервера",
          fallback: { data: [] },
        },
      }
    );
    return response.data;
  },

  async changeRating(method, slug) {
    await http.put(`api/home/rating/${method}/${slug}`);
  },

  like: {
    async store(method, model, id) {
      await http.post(`api/${method}`, { for: model, id });
    },

    async update(method, model, id) {
      let response = await http.put(
        `api/rate/update/${id}`,
        {
          for: model,
          method,
        },
        {
          errorStub: {
            text: "Не удалось изменить",
            fallback: false,
          },
        }
      );
      return response.data;
    },

    async cancel(id, model) {
      let response = await http.post(
        `api/cancel/rate/${id}`,
        {
          for: model,
          _method: "DELETE",
        },
        {
          errorStub: {
            text: "Не удалось удалить",
            fallback: false,
          },
        }
      );
      return response.data;
    },
  },
});
