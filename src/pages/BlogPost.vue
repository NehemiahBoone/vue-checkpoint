<template>
  <div class="blogPost container-fluid">
    <div class="row">
      <div class="col">
        <div class="card border-info">
          <div class="card-body">
            <h4 class="card-title text-primary">{{blog.title}}</h4>
            <p class="card-text text-secondary">{{blog.body}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "BlogPost",
  mounted() {
    this.$store.dispatch("getBlogById", this.$route.params.id);
  },
  data() {
    return {};
  },
  computed: {
    blog() {
      return this.$store.state.activeBlog;
    },
  },
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>