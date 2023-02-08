<template>
  <article class="panel is-link">
    <p class="panel-heading">Админ</p>
    <ul class="ml-2 pt-2 pb-2">
      <app-access-role :roles="['admin']">
        <li v-for="route in menu" :key="route.name">
          <router-link
            :to="{ name: route.name }"
            exact-active-class="has-text-danger-dark is-underlined"
            >{{ route.text }}</router-link
          >
        </li>
      </app-access-role>
      <app-access-role :roles="['admin', 'moderator']">
        <div
          class="dropdown is-active"
          @mouseover="toggle = true"
          @mouseleave="toggle = false"
        >
          <div class="dropdown-trigger">
            <a aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Комментарии</span>
            </a>
          </div>
          <comments-menu-component v-if="toggle" />
        </div>
      </app-access-role>
    </ul>
  </article>
</template>

<script>
import AppCommentsMenu from "@/components/admin/comment/Menu";
import AppAccessRole from "@/components/admin/roles/Access.vue";
export default {
  components: {
    "comments-menu-component": AppCommentsMenu,
    AppAccessRole,
  },
  data: () => ({
    toggle: false,
    menu: [
      { name: "admin.films", text: "Фильмы" },
      { name: "admin.serials", text: "Сериалы" },
      { name: "admin.users", text: "Пользователи" },
      { name: "admin.reviews", text: "Отзывы" },
    ],
  }),
};
</script>
