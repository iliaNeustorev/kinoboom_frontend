export default (http) => ({
  async changeAvatar(file) {
    http;
    await file.post("api/profile/changeAvatar");
  },

  async deleteAvatar() {
    await http.put(
      "api/profile/deleteAvatar",
      {},
      {
        errorStub: {
          text: "Ошибка.Удалить аватар не удалось",
          fallback: false,
          importance: "danger",
        },
      }
    );
  },

  async changePassword(form) {
    http;
    await form.put("api/profile/changePassword");
  },

  async changeName(form) {
    http;
    await form.put("api/profile/changeName");
  },
});
