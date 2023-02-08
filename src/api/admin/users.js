export default (http) => ({
  async all(page, direction, column) {
    let response = await http.post(
      `api/admin/users`,
      {
        page,
        direction,
        column,
        _method: "GET",
      },
      {
        errorStub: {
          text: "Не удалось загрузить данные.Ошибка сервера",
          fallback: { data: [] },
        },
      }
    );
    return response.data;
  },

  async changeBlocked(id, form) {
    http;
    await form.put(`api/admin/users/user/${id}/blocked`);
  },

  role: {
    async roleUser(id) {
      let response = await http.get(`api/admin/users/role/${id}/get`, {
        errorStub: {
          text: "Не удалось загрузить роли.Ошибка сервера",
          fallback: { AllRoles: { data: {} }, userRoles: { data: {} } },
        },
      });
      return response.data;
    },

    async update(id, form) {
      http;
      await form.put(`api/admin/users/role/${id}/update`);
    },
  },
});
