export default (http) => ({
  async getCount() {
    let response = await http.get("api/admin/comment/getCounts", {
      errorStub: {
        text: "Не удалось загрузить количество коментариев",
        fallback: { newCount: 0, changedCount: 0, declinedCount: 0 },
        importance: "warning",
      },
    });
    return response.data;
  },

  async getComments(method, page, direction, column) {
    let response = await http.post(
      `api/admin/comment/${method}`,
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

  async changeStatus(id, method) {
    await http.put(
      `api/admin/comment/${method}/${id}`,
      {},
      {
        errorStub: {
          text: "Не удалось изменить статус",
          fallback: false,
        },
      }
    );
  },

  async delete(id) {
    await http.delete(`api/admin/comment/destroy/${id}`, {
      errorStub: {
        text: "Не удалось удалить",
        fallback: false,
      },
    });
  },
});
