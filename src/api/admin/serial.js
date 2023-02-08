export default (http) => ({
  async add(form) {
    http;
    await form.post("api/admin/serials");
  },

  async all(page, direction, column) {
    let response = await http.post(
      "api/admin/serials",
      {
        page,
        direction,
        column,
        _method: "GET",
      },
      {
        errorStub: {
          text: "Ошибка сервера",
          fallback: { serials: { data: [] }, count: 0 },
        },
      }
    );
    return response.data;
  },

  async getOne(id) {
    let response = await http.get(`api/admin/serials/${id}`, {
      errorStub: {
        text: "Не удалось получить данные с базы",
        fallback: [],
      },
    });
    return response.data;
  },

  async updateOne(id, form) {
    http;
    await form.post(`api/admin/serials/${id}`);
  },
});
