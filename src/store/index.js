import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "../services/AxiosService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    blogs: [],
    activeBlog: {},
    comments: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBlogs(state, blogs) {
      state.blogs = blogs
    },
    postBlog(state, newBlog) {
      state.blogs = [...state.blogs, newBlog]
    },
    setActiveBlog(state, blog) {
      state.activeBlog = blog
    },
    setActiveComments(state, comments) {
      state.comments = comments
      console.log(state.comments)
    },
    removeBlog(state, id) {
      state.activeBlog = state.blogs.filter(b => b.id != id)
    },
    deleteComment(state, id) {
      state.comments = state.comments.filter(c => c.id != id)
    }
  },
  actions: {
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getAllBlogs({ commit }) {
      try {
        let res = await api.get("blogs")
        commit("setBlogs", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getCommentsByPost({ commit }, blogId) {
      try {
        let res = await api.get(`blogs/${blogId}/comments`)
        commit("setActiveComments", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getActiveBlog({ commit }, id) {
      try {
        let res = await api.get("blogs/" + id)
        commit("setActiveBlog", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createBlog({ commit }, newBlog) {
      try {
        let res = await api.post("blogs", newBlog)
        commit("postBlog", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createComment({ dispatch }, commentData) {
      try {
        let res = await api.post('comments', commentData)
        dispatch("getCommentsByPost", res.data.blog)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteBlog({ commit }, id) {
      try {
        await api.delete('blogs/' + id)
        commit("removeBlog", id)
        router.push({ name: 'Home' })
      } catch (error) {
        console.error(error)
      }
    },
    async editBlog({ commit }, blogInfo) {
      try {
        let res = await api.put('blogs/' + blogInfo.id, blogInfo)
        commit("setActiveBlog", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async editComment({ commit, dispatch }, commentData) {
      try {
        let res = await api.put('comments/' + commentData.id, commentData)
        dispatch("getCommentsByPost", commentData.blog)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteComment({ commit, dispatch }, commentInfo) {
      try {
        await api.delete('comments/' + commentInfo.id)
        commit("deleteComment", commentInfo.id)
        dispatch("getCommentsByPost", commentInfo.blog)
      } catch (error) {
        console.error(error)
      }
    }
  },
});
