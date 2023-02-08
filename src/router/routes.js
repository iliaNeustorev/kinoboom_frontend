import Home from "../views/Home.vue";
import Films from "../views/Films.vue";
import Show from "../views/Show.vue";
import Serials from "../views/Serials.vue";
import Rating from "../views/Rating.vue";
import Review from "../views/Review.vue";
import Register from "../components/auth/Register.vue";
import VerifyEmail from "../components/auth/VerifyEmail.vue";
import ForgotPasswordLink from "../components/auth/ForgotPasswordLink.vue";
import ResetPassword from "../components/auth/ResetPassword.vue";
import E404 from "../components/info/E404.vue";
import AdminView from "../components/admin/Index.vue";
import AdminRoutes from "./admin-routes";
import Profile from "../views/profile/Index.vue";
import ProfileMain from "../views/profile/Main.vue";
import ChangePassword from "../views/profile/Password.vue";
import ChangeAvatar from "../views/profile/Avatar.vue";
import Search from "../views/Search";

export default function () {
  const routes = [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/reset-password",
      component: ResetPassword,
      meta: { guest: true },
    },
    {
      path: "/verifyEmail",
      component: VerifyEmail,
      meta: { auth: true },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { guest: true },
    },
    {
      path: "/films",
      name: "films",
      component: Films,
    },
    {
      path: "/serials",
      name: "serials",
      component: Serials,
    },
    {
      path: "/rating",
      name: "rating",
      component: Rating,
    },
    {
      path: "/show/:slug",
      name: "show",
      component: Show,
      props: true,
    },
    {
      path: "/reviews",
      name: "reviews",
      component: Review,
    },
    {
      path: "/forgot-password",
      name: "forgot",
      component: ForgotPasswordLink,
      meta: { guest: true },
    },
    {
      path: "/admin/",
      component: AdminView,
      children: AdminRoutes,
      meta: { admin: true },
    },
    {
      path: "/profile/",
      component: Profile,
      meta: { auth: true },
      children: [
        {
          path: ":name",
          name: "profile.main",
          component: ProfileMain,
        },
        {
          path: ":name/changePassword",
          name: "profile.password",
          component: ChangePassword,
        },
        {
          path: ":name/changeAvatar",
          name: "profile.avatar",
          component: ChangeAvatar,
        },
      ],
    },
    {
      path: "/search/:word",
      name: "search",
      component: Search,
      props: true,
    },
    {
      path: "/:any(.*)*",
      component: E404,
    },
  ];

  return routes;
}
