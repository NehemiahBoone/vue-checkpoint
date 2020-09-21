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
        <form class="form-inline my-1" @submit.prevent="editBlog" v-if="editToggle">
          <input
            type="text"
            class="form-control"
            placeholder="New Blog Title"
            aria-describedby="helpId"
            v-model="blogInfo.title"
          />
          <input
            type="text"
            class="form-control"
            placeholder="New Body"
            aria-describedby="helpId"
            v-model="blogInfo.body"
          />
          <button type="submit" class="btn btn-warning mx-1">Edit Post</button>
        </form>
        <button
          v-if="this.blog.creatorEmail == this.$auth.userInfo.name"
          class="btn btn-danger mt-1"
          @click="deleteBlog"
        >Delete</button>
        <button
          v-if="this.blog.creatorEmail == this.$auth.userInfo.name"
          class="btn btn-info mt-1 mx-1"
          @click="editToggle = !editToggle"
        >Edit</button>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-12">
        <div class="card border-info">
          <div class="card-body">
            <h4 class="card-title text-primary">Comments</h4>
            <comments v-for="comment in commentsStore" :key="comment._id" :commentInfo="comment" />
          </div>
        </div>
      </div>
      <div class="col-12">
        <form
          @submit.prevent="createComment"
          class="form-inline text-primary my-2"
          v-if="$auth.isAuthenticated"
        >
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
      blogInfo: {},
      editToggle: false,
      commentToggle: false,
    };
  },
  computed: {
    blog() {
      return this.$store.state.activeBlog;
    },
    commentsStore() {
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
      this.newComment = {};
    },
    deleteBlog() {
      this.blogInfo.id = this.$route.params.blogId;
      this.$store.dispatch("deleteBlog", this.blogInfo.id);
    },
    editBlog() {
      this.blogInfo.id = this.$route.params.blogId;
      this.$store.dispatch("editBlog", this.blogInfo);
      this.editToggle = false;
    },
  },
  components: {
    Comments,
  },
};
</script>


<style scoped>
</style>