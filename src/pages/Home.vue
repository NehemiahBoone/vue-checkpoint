<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-12 my-3">
        <form
          @submit.prevent="createBlog"
          class="form-inline text-primary"
          v-if="$auth.isAuthenticated"
        >
          <div class="form-group p-1">
            <label class="mr-1" for="title">Title</label>
            <input
              v-model="newBlog.title"
              type="text"
              name="title"
              class="form-control"
              placeholder="Title..."
            />
          </div>
          <div class="form-group p-1">
            <label class="mr-1" for="body">Body</label>
            <input
              v-model="newBlog.body"
              type="text"
              name="body"
              class="form-control"
              placeholder="Body..."
            />
          </div>
          <button type="submit" class="btn btn-secondary">Post</button>
        </form>
      </div>
    </div>
    <div class="row">
      <blog-comp v-for="b in blogs" :key="b.id" :blogInfo="b" />
    </div>
  </div>
</template>

<script>
import BlogComp from "../components/BlogComp.vue";
export default {
  mounted() {
    this.$store.dispatch("getAllBlogs");
  },
  name: "home",
  data() {
    return {
      newBlog: {},
    };
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
    activeBlog() {
      return this.$store.state.activeBlog;
    },
  },
  methods: {
    createBlog() {
      this.$store.dispatch("createBlog", this.newBlog);
    },
  },
  components: {
    BlogComp,
  },
};
</script>
