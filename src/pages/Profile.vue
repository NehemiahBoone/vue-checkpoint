<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt />
    <p>{{ profile.email }}</p>
    <div class="container-fluid">
      <div class="row">
        <blog-comp v-for="blog in myBlogs" :key="blog.id" :blogInfo="blog" />
      </div>
    </div>
  </div>
</template>

<script>
import BlogComp from "../components/BlogComp.vue";
export default {
  name: "Profile",
  mounted() {
    this.$store.dispatch("getAllBlogs"), this.$store.dispatch("getProfile");
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    myBlogs() {
      return this.$store.state.blogs.filter(
        (b) => b.creatorEmail == this.profile.email
      );
    },
  },
  components: {
    BlogComp,
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
