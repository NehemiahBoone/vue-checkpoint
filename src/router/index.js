import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../pages/Home.vue";
// @ts-ignore
import Profile from "../pages/Profile.vue";
import { authGuard } from "@bcwdev/auth0-vue";
// @ts-ignore
import BlogPost from "../pages/BlogPost.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:blogId',
    name: 'blog-details',
    component: BlogPost,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: authGuard,
  },

];

const router = new VueRouter({
  routes,
});

export default router;
