import Vue from 'vue';
import VueRouter from 'vue-router';
import Todolist from '../views/Todolist.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/todo'
        },
        {
            path:'/todo',
            component: Todolist
        }
    ]
});