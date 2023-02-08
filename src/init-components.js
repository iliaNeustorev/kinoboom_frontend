import { createApp } from "vue";
import App from "./App.vue";
import InputComponent from "@/components/forms/FormInput.vue";
import TextAreaComponent from "@/components/forms/FormTextarea.vue";
import CheckBox from "@/components/forms/FormCheckbox.vue";
import SelectComponent from "@/components/forms/FormSelect.vue";
import FileComponent from "@/components/forms/FormFile.vue";
import LoadingComponent from "@/components/info/Loading.vue";
import ButtonBack from "@/components/buttons/ButtonBack.vue";
import PaginationComponent from "@/components/nav/Pagination.vue";
import AuthAccessComponent from "@/components/auth/Access.vue";
const app = createApp(App);

app.component("form-input-component", InputComponent);
app.component("form-textarea-component", TextAreaComponent);
app.component("form-checkbox-component", CheckBox);
app.component("form-select-component", SelectComponent);
app.component("form-file-component", FileComponent);
app.component("loading-component", LoadingComponent);
app.component("button-back-component", ButtonBack);
app.component("pagination-component", PaginationComponent);
app.component("app-auth-access", AuthAccessComponent);
export default app;
