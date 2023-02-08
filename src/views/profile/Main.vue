<template>
  <div class="card">
    <div class="card-content">
      <div
        class="media is-flex is-justify-content-flex-start is-flex-wrap-wrap"
      >
        <div class="media-left mb-5">
          <figure class="image is-128x128">
            <router-link :to="{ name: 'profile.avatar' }" title="Изменить">
              <img class="is-rounded" :src="user.urlPicture" alt="Аватар"
            /></router-link>
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4 has-text-link">
            {{ user.name }}
            <span class="icon-text">
              <span class="icon">
                <mdicon
                  class="has-text-success is-clickable"
                  name="pencil-circle-outline"
                  title="Изменить имя"
                  @click="showEditName"
                />
              </span>
              <edit-name-component ref="edit" :name="user.name" />
            </span>
          </p>

          <p class="subtitle">
            <span class="has-text-info">Email: </span>{{ user.email }}
          </p>
          <p class="subtitle">
            <span class="has-text-info">Статус: </span>{{ user.status }}
          </p>
          <p class="subtitle">
            <span class="has-text-info">Профиль создан:</span>
            {{ user.created_at }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppEditName from "@/components/user/EditName.vue";
export default {
  components: {
    "edit-name-component": AppEditName,
  },
  computed: {
    ...mapGetters("userModule", ["user"]),
  },
  methods: {
    showEditName() {
      this.$refs.edit.show = !this.$refs.edit.show;
    },
  },
};
</script>
