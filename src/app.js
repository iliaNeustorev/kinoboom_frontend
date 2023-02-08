import createRouter from "./router";
import createStore from "./store";
import createHttp from "./plugins/http";
import mdiVue from "mdi-vue/v3";
import * as mdijs from "@mdi/js";
import app from "@/init-components.js";
import { Form } from "vform";
import initHttpErrorsHandler from "@/connectors/http-errors-handler";

export default () => {
  const { http, api } = createHttp();
  const store = createStore(api);
  const router = createRouter(store);

  initHttpErrorsHandler(http, store, router);

  store.dispatch("userModule/checkUser");

  app.use(store).use(router).use(mdiVue, {
    icons: mdijs,
  });

  app.config.globalProperties["$api"] = api;
  app.config.globalProperties["$vform"] = Form;

  return app;
};
