<template>
  <div class="is-hidden-mobile">
    <div class="panel-heading mt-2 is-hidden-mobile">
      <div class="sidebar-header">Рейтинг фильмов</div>
    </div>
    <div class="table-container box is-hidden-mobile">
      <table class="table is-fullwidth table is-hoverable">
        <thead>
          <tr>
            <th>Фильм</th>
            <th>Рейтинг</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in items" :key="key">
            <th>
              <router-link
                :to="{
                  name: 'show',
                  params: { slug: item.slug },
                }"
                >{{ item.name }}</router-link
              >
            </th>
            <td>{{ item.rating }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  async created() {
    this.items = await this.$api.home.ratingHomePage();
  },
};
</script>
