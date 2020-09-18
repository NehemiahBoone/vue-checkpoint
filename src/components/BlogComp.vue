<template>
  <div class="blog col-3 my-4">
    <router-link :to="{name: 'BlogPost', params: {id: blogInfo.id}}">
      <div class="card border-info" @click.prevent="activeBlog">
        <div class="card-body text-center">
          <h4 class="card-title text-primary">{{blogInfo.title}}</h4>
          <p class="card-text text-secondary">{{blogInfo.creatorEmail}}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  name: "blog",
  props: {
    blogInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    activeBlog() {
      this.$store.dispatch("getActiveBlog", this.blogInfo);
    },
  },
  components: {},
};
</script>


<style scoped>
</style>