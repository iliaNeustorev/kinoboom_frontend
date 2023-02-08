export default (http) => ({
  async all(page) {
    let response = await http.post(
      "api/review/all",
      { page, _method: "GET" },
      {
        errorStub: {
          text: "Не удалось загрузить отзывы с сервера",
          fallback: { data: [] },
        },
      }
    );
    return response.data;
  },

  async store(form) {
    http;
    let response = await form.post("api/review/store");
    return response.data;
  },
});
