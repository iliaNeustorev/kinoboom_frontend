export default (http) => ({
  async all(route, page, direction, column) {
    let response = await http.post(
      `${route}?page=${page}`,
      {
        page,
        direction,
        column,
        _method: "GET",
      },
      {
        errorStub: {
          text: "Ошибка сервера",
          fallback: { data: [] },
        },
      }
    );
    return response.data;
  },

  async restoreOne(id, model) {
    await http.put(
      `api/admin/trash/${model}/restoreOne`,
      { id },
      {
        errorStub: {
          text: "Восстановить не удалось",
          fallback: false,
        },
      }
    );
  },

  async restoreAll(model) {
    await http.put(`api/admin/trash/${model}/restoreAll`);
  },
});
