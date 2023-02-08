export default (http) => ({
  async getUser() {
    let response = await http.get("api/user", {
      errorStub: {
        text: "Вход не выполнен",
        fallback: false,
      },
    });
    return response.data;
  },

  async checkSanctum() {
    await http.get("sanctum/csrf-cookie");
  },

  async login(form) {
    http;
    let response = await form.post("api/login");
    return response.data;
  },

  async register(form) {
    http;
    let response = await form.post("api/register");
    return response.data;
  },
  async logout() {
    await http.post("api/logout");
  },
});
