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

    <div class="row mt-2">
      <div class="col-12">
        <div class="card border-info">
          <div class="card-body">
            <h4 class="card-title text-primary">Comments</h4>
            <comments v-for="comment in comments" :key="comment._id" :commentInfo="comment" />
          </div>
        </div>
      </div>
      <div class="col-12">
        <form @submit.prevent="createComment" class="form-inline text-primary">
          <div class="form-group p-1">
            <label class="mr-1" for="body"></label>
            <input
              v-model="newComment.body"
              type="text"
              name="body"
              class="form-control"
              placeholder="Comment..."
            />
          </div>
          <button type="submit" class="btn btn-secondary">Post</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import Comments from "../components/Comments";
export default {
  name: "blog-details",
  mounted() {
    this.$store.dispatch("getActiveBlog", this.$route.params.blogId);
    this.$store.dispatch("getCommentsByPost", this.$route.params.blogId);
  },
  data() {
    return {
      newComment: {},
    };
  },
  computed: {
    blog() {
      return this.$store.state.activeBlog;
    },
    comments() {
      return this.$store.state.comments;
    },
  },
  methods: {
    createComment() {
      let commentData = {
        blog: this.$route.params.blogId,
        body: this.newComment.body,
      };
      this.$store.dispatch("createComment", commentData);
    },
  },
  components: {
    Comments,
  },
};
</script>


<style scoped>
</style>