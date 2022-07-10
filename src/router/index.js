import Vue from 'vue';
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import Search from '@/views/Search'
import Layout from '@/views/Layout'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/', redirect: 'layout/home' },
        { path: '/layout', redirect: 'layout/home' },
        {
            path: '/layout', component: Layout, children: [
                {
                    path: 'home', component: Home, meta: {
                        title: '首页'

                    }
                },
                {
                    path: 'search', component: Search, meta: {
                        title: '搜索'

                    }
                },
            ]
        },

    ]
})