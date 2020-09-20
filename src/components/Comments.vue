<template>
  <div class="comments">
    <small>{{commentInfo.creatorEmail}}</small>
    <p>
      {{commentInfo.body}}
      <i
        v-if="commentInfo.creatorEmail == this.$auth.userInfo.name"
        @click="editToggle = !editToggle"
        class="fas fa-pencil-alt ml-1 text-secondary mx-1"
      ></i>
      <i
        v-if="commentInfo.creatorEmail == this.$auth.userInfo.name"
        @click="deleteComment"
        class="fas fa-trash mx-1"
      ></i>
    </p>
    <form class="form-inline" @submit.prevent="editComment" v-if="editToggle">
      <div>
        <input
          type="text"
          class="form-control my-1"
          placeholder="Edit Comment..."
          aria-describedby="helpId"
          v-model="commentData.body"
        />
      </div>
      <button type="submit" class="btn btn-warning">Post</button>
    </form>
  </div>
</template>


<script>
export default {
  name: "Comments",
  props: {
    commentInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newComment: {},
      editToggle: false,
      commentData: {},
    };
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    },
  },
  methods: {
    createComment() {
      this.$store.dispatch("createComment", newComment);
    },
    editComment() {
      this.commentData.id = this.commentInfo.id;
      this.commentData.blog = this.$route.params.blogId;
      this.$store.dispatch("editComment", this.commentData);
      this.commentData = {};
      this.editToggle = false;
    },
    deleteComment() {
      this.$store.dispatch("deleteComment", this.commentInfo);
    },
  },
  components: {},
};
</script>


<style scoped>
</style>