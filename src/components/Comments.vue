<template>
  <div class="comments">
    <p>{{commentInfo.body}}</p>
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