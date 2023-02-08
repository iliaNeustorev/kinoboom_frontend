export default (http) => ({
  async all(page) {
    let response = await http.post(
      "api/admin/review/getNew",
      {
        page,
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

  async changeStatus(id, method) {
    await http.put(
      `api/admin/review/${method}/` + id,
      {},
      {
        errorStub: {
          text: "Изменить статус не удалось",
          fallback: false,
        },
      }
    );
  },
  async delete(id) {
    await http.put(
      `api/admin/review/delete/` + id,
      {},
      {
        errorStub: {
          text: "Удалить не удалось",
          fallback: false,
        },
      }
    );
  },
});
