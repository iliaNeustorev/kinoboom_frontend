export default (http) => ({
  delete: {
    async deleteElement(method, route) {
      if (method === "delete") {
        await http.delete(route);
      } else if (method === "post") {
        await http.post(route);
      }
    },
    async massDelete(route, idForDelete, model) {
      await http.post(route, { idForDelete, model });
    },
  },
});
