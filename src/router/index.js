import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Search from '@/components/Search'
import Hello from '@/components/HelloWorld'
import Echarts from '@/components/Echarts'
import Visualization from '@/components/Visualization'
import JsonEditorUI from '@/components/JsonEditorUI'
import TreeCharts from '@/components/TreeCharts'
import Login from '@/components/Login'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
    /* {
      path: '/',
      name: 'TreeCharts',
      component: TreeCharts
    } */
    /* {
      path: '/',
      name: 'JsonEditorUI',
      component: JsonEditorUI
    } */
    /* {
      path: '/',
      name: 'Visualization',
      component: Visualization
    } */
    /* {
      path: '/',
      name: 'Hello',
      component: Hello
    } */
    /* {
      path: '/',
      name: 'Search',
      component: Search
    }, */
    /* {
      path: '/',
      name: 'Echarts',
      component: Echarts
    } */
  ]
})
