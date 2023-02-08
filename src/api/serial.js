export default (http) => ({
  async all(page) {
    let response = await http.post(
      "/api/serial/all",
      { page, _method: "GET" },
      {
        errorStub: {
          text: "Не удалось загрузить сериалы с сервера",
          fallback: { data: [] },
        },
      }
    );
    return response.data;
  },

  async getOne(slug) {
    let response = await http.get(`api/serial/${slug}/show`, {
      errorStub: {
        text: "Не удалось загрузить сериал с сервера",
        fallback: {},
      },
    });
    return response.data;
  },
});
