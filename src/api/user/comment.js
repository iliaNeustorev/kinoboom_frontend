export default (http) => ({
  async edit(id, form) {
    http;
    await form.put(`api/comments/${id}`);
  },

  async store(form) {
    http;
    await form.post("api/comments");
  },

  async delete(id) {
    await http.delete(`api/comments/${id}`);
  },
});
