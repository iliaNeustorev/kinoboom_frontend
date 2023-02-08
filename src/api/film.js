export default (http) => ({
  async all(page) {
    let response = await http.post(
      "api/film/all",
      { page, _method: "GET" },
      {
        errorStub: {
          text: "Не удалось загрузить фильмы с сервера",
          fallback: { data: [] },
          importance: "warning",
        },
      }
    );
    return response.data;
  },

  async getOne(slug) {
    let response = await http.get(`api/film/${slug}/show`, {
      errorStub: {
        text: "Не удалось загрузить фильм с сервера",
        fallback: {},
        importance: "warning",
      },
    });
    return response.data;
  },
});
