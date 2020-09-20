<template>
  <div class="col-md-3 col-sm-12 my-4">
    <div class="card border-info">
      <router-link :to="{name:'blog-details', params:{blogId: blogInfo._id}}">
        <div class="card-body text-center">
          <h4 class="card-title text-primary">{{blogInfo.title}}</h4>
          <p class="card-text text-secondary">{{blogInfo.creatorEmail}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  name: "blog-comp",
  props: {
    blogInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>