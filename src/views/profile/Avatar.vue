<template>
  <div class="card column is-half">
    <div class="card-image">
      <figure class="image is-1by1">
        <router-link
          :to="{ name: 'profile.main' }"
          title="Информация о профиле"
        >
          <img :src="user.urlPicture" alt="Аватар"
        /></router-link>
      </figure>
    </div>
    <div class="card-content is-flex is-justify-content-center">
      <div class="media">
        <div class="media-content">
          <form-file-component
            :form="file"
            name="picture"
            label="Загрузить"
            :object-validation="validation"
            @validation-field="validationField"
          />
          <div class="field is-grouped is-grouped-centered mt-3">
            <template v-if="!loading">
              <p class="control">
                <button
                  :disabled="!validationForm"
                  class="button is-primary is-rounded"
                  @click="sendForm"
                >
                  OK
                </button>
              </p>
              <p class="control">
                <button
                  :disabled="!userHasPicture"
                  class="button is-danger is-rounded"
                  @click="deleteAvatar"
                >
                  Удалить аватар
                </button>
              </p>
            </template>
            <template v-else>
              <button class="button is-loading is-rounded is-medium">
                Loading
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      file: this.$vform.make({
        picture: null,
      }),
      validation: {
        picture: {
          valid: false,
          rule: /^.+\.jpeg|jpg|png|bmp$/,
          text: "Картинка должна иметь расширение jpeg,jpg,png,bmp",
        },
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters("userModule", ["user"]),
    userHasPicture() {
      return this.user.picture != "nopicture.png";
    },
    validationForm() {
      return this.validation.picture.valid && this.file.picture != null;
    },
  },
  methods: {
    ...mapActions("userModule", ["checkUser"]),
    ...mapActions("alertModule", { addMessage: "add" }),
    validationField(elem) {
      if (this.validation[elem.name] != undefined) {
        this.validation[elem.name].valid = elem.currentRule;
      }
    },
    async sendForm() {
      if (this.validationForm) {
        this.loading = true;
        try {
          this.file.update({ _method: "PUT" });
          await this.$api.user.profile.changeAvatar(this.file);
          this.file.reset();
          this.checkUser();
        } catch (e) {
          this.addMessage({
            text: "Ошибка.Аватар не изменен",
            timeout: 5000,
            importance: "danger",
          });
        } finally {
          this.loading = false;
        }
      }
    },
    async deleteAvatar() {
      if (this.userHasPicture) {
        this.loading = true;
        await this.$api.user.profile.deleteAvatar();
        this.checkUser();
        this.loading = false;
      }
    },
  },
};
</script>
