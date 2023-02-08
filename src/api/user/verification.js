export default (http) => ({
  async forgotPassword(form) {
    http;
    await form.post("api/forgot-password");
  },

  async resetPassword(form) {
    http;
    await form.post("api/reset-password");
  },

  async sendVerifyEmail() {
    await http.post("api/email/verification-notification");
  },

  async verifyEmail(route) {
    await http.get(route);
  },
});
