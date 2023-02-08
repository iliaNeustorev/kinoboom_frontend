import axios from "axios";
import createFilmApi from "@/api/film";
import createSerialApi from "@/api/serial";
import createHomeApi from "@/api/home";
import createReviewApi from "@/api/review";
import createAdminUsersApi from "@/api/admin/users";
import createAdminFilmApi from "@/api/admin/film";
import createAdminSerialApi from "@/api/admin/serial";
import createAdminReviewApi from "@/api/admin/review";
import createAdminTrashApi from "@/api/admin/trash";
import createAdminMainApi from "@/api/admin/main";
import createAdminCommentApi from "@/api/admin/comment";
import createUserMainApi from "@/api/user/main";
import createUserVerificationApi from "@/api/user/verification";
import createUserProfileApi from "@/api/user/profile";
import createUserCommentApi from "@/api/user/comment";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8876/";

export default () => {
  const http = axios.create({});

  const api = {
    film: createFilmApi(http),
    serial: createSerialApi(http),
    home: createHomeApi(http),
    review: createReviewApi(http),
    admin: {
      main: createAdminMainApi(http),
      serial: createAdminSerialApi(http),
      film: createAdminFilmApi(http),
      review: createAdminReviewApi(http),
      users: createAdminUsersApi(http),
      trash: createAdminTrashApi(http),
      comment: createAdminCommentApi(http),
    },
    user: {
      main: createUserMainApi(http),
      verification: createUserVerificationApi(http),
      profile: createUserProfileApi(http),
      comment: createUserCommentApi(http),
    },
  };

  return { http, api };
};
