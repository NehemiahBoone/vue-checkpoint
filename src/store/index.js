import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "../services/AxiosService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    blogs: [],
    activeBlog: {}
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
      console.log(state.activeBlog);
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
        console.log(res);
        commit("setBlogs", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createBlog({ commit }, newBlog) {
      try {
        let res = await api.post("blogs", newBlog)
        console.log(res);
        commit("postBlog", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    getActiveBlog({ commit }, blog) {
      try {
        commit("setActiveBlog", blog)
      } catch (error) {
        console.error(error)
      }
    },
  },
});
