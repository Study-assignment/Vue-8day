import Vue from 'vue';
import App from './App.vue';
import '@/mobile/flexible'; // 适配
import '@/styles/reset.css'; // 初始化样式
import router from '@/router'; // 路由对象
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import { createApp } from 'vue';
import {
  Tabbar,
  TabbarItem,
  NavBar,
  Col,
  Row,
  Image as VanImage,
  Cell,
  Icon,
  Search,
  List,
} from 'vant';
//测试封装的api方法
// import { recommendMusicAPI } from './api';
// async function fn() {
//   const res = await recommendMusicAPI();
//   console.log(res);
// }
// fn();
// Vue.use(ElementUI);
// const app = createApp();
Vue.use(List);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(Search);
// Vue.use(CellGroup);
Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
