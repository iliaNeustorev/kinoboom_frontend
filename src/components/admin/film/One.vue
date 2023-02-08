<template>
  <td>
    <router-link
      :to="linkToEdit"
      title="Редактировать"
      class="has-text-info-dark"
    >
      {{ elem.name }}</router-link
    >
  </td>
  <td>{{ elem.slug }}</td>
  <td>{{ elem.rating }}</td>
  <td>{{ elem.year_release }}</td>
  <td>{{ elem.created_at }}</td>
  <td>{{ elem.description }}</td>
  <td>
    <show-video-component :video="elem.video">
      Cмотреть трейлер</show-video-component
    >
  </td>
  <td>
    <show-image-component :uri="elem.urlPicture">
      <figure class="image is-64x64">
        <img :src="elem.urlPicture" alt="картинка" title="Посмотреть" />
      </figure>
    </show-image-component>
  </td>
</template>

<script>
import AppShowImageModal from "@/components/info/modal/ShowImage";
import AppShowVideoModal from "@/components/info/modal/ShowVideo";

export default {
  components: {
    "show-image-component": AppShowImageModal,
    "show-video-component": AppShowVideoModal,
  },
  props: {
    elem: { type: Object, required: true },
    model: { type: String, required: true },
  },
  computed: {
    linkToEdit() {
      return {
        name: "admin.editElement",
        params: { model: this.model, id: this.elem.id },
      };
    },
  },
};
</script>
