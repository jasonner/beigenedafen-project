import Vue from 'vue'
import Router from 'vue-router'

import index from "@/view/index.vue";
import login from "@/view/login.vue";
import Score from "@/view/score.vue";
import Attach from "@/view/attach.vue";
import TeamList from "@/view/teamList.vue";
Vue.use(Router)
export const constantRouterMap =[
    {
        path:'/',
        name:'login',
        redirect:'/login',
        menuShow:false
    },
    {
        path:'/index',
        name:'首页',
        component: index,
        menuShow:false
    },
    {
        path:'/login',
        name:'login',
        component: login,
        menuShow:false
    },
    {
        path:'/score',
        name:'Score',
        component: Score,
        menuShow:false
    },
    {
        path:'/attach',
        name:'Attach',
        component: Attach,
        menuShow:false 
    },
    {
        path:'/teamList',
        name:'TeamList',
        component: TeamList,
        menuShow:false
    },

    {
        path: "*",
        redirect: "/login"
    }
]

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
 
export default new Router({
    routes: constantRouterMap
})