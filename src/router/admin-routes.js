import AdminFilms from "../views/admin/Films.vue";
import AdminUsers from "../views/admin/Users.vue";
import AdminSerials from "../views/admin/Serials.vue";
import AdminAddElement from "../views/admin/edit/AddOne.vue";
import AdminEditElement from "../views/admin/edit/EditOne.vue";
import AdminReviews from "../views/admin/Reviews.vue";
import AdminComments from "../views/admin/Comments.vue";
import AdminTrash from "../views/admin/Trash.vue";

const AdminRoutes = [
  {
    path: "films",
    name: "admin.films",
    component: AdminFilms,
  },
  {
    path: "users",
    name: "admin.users",
    component: AdminUsers,
  },
  {
    path: "serials",
    name: "admin.serials",
    component: AdminSerials,
  },
  {
    path: "add/:model",
    name: "admin.addElement",
    component: AdminAddElement,
  },
  {
    path: "edit/:id/:model",
    name: "admin.editElement",
    component: AdminEditElement,
  },
  {
    path: "reviews",
    name: "admin.reviews",
    component: AdminReviews,
  },
  {
    path: "comments/:method",
    name: "admin.comments",
    component: AdminComments,
  },
  {
    path: "trash/:model",
    name: "admin.trash",
    component: AdminTrash,
    props: true,
  },
];

export default AdminRoutes;
