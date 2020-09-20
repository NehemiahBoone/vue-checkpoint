<template>
  <div class="comments">
    <small>{{commentInfo.creatorEmail}}</small>
    <p>
      {{commentInfo.body}}
      <i
        v-if="commentInfo.creatorEmail == this.$auth.userInfo.name"
        @click="editToggle = !editToggle"
        class="fas fa-pencil-alt ml-1 text-secondary"
      ></i>
    </p>
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
  },
  components: {},
};
</script>


<style scoped>
</style>