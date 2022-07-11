<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
      @input="inputFn"
    />
    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <span
          class="hot_item"
          v-for="(obj, index) in hotArr"
          :key="index"
          @click="fn(obj.first)"
          >{{ obj.first }}</span
        >
      </div>
    </div>
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <SongItem
          v-for="obj in resultList"
          :key="obj.id"
          :name="obj.name"
          :author="obj.ar[0].name"
          :id="obj.id"
        ></SongItem>
        <!-- <van-cell
          center
          :title="obj.name"
          :label="obj.ar[0].name + ' - ' + obj.name"
          v-for="obj in searchList"
          :key="obj.id"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" class="search-icon" size="0.7rem" />
          </template>
        </van-cell> -->
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchResultAPI } from '@/api';
import SongItem from '@/components/SongItem';
export default {
  data() {
    return {
      value: '',
      hotArr: [], // 热搜关键字
      resultList: [], // 搜索结果
      loading: false,
      finished: false,
      page: 1,
      timer: null,
    };
  },
  async created() {
    const res = await hotSearchAPI();
    console.log(res);
    this.hotArr = res.data.result.hots;
    // this.getListFn();
  },
  methods: {
    // async getListFn() {
    //   searchResultAPI({
    //     keywords: this.value,
    //     limit: 20,
    //     offset: (this.page - 1) * 20,
    //   }).then((res) => {
    //     console.log(res);
    //     this.searchList = res.data.result.songs;
    //   });
    //   // console.log(res);
    // },
    async getListFn() {
      return await searchResultAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20, // 固定公式
      }); // 把搜索结果return出去
      // (难点):
      // async修饰的函数 -> 默认返回一个全新Promise对象
      // 这个Promise对象的结果就是async函数内return的值
      // 拿到getListFn的返回值用await提取结果
    },
    async fn(val) {
      this.page = 1;
      this.finished = false;
      this.value = val;
      // this.getListFn();//用then方法写的，搭配then方法
      // console.log(res);
      const res = await this.getListFn();
      console.log(res);
      this.resultList = res.data.result.songs;
      this.loading = false;
    },
    async inputFn() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.page = 1;
        this.finished = false;
        // console.log(this.getListFn());
        if (this.value.length === 0) {
          this.resultList = [];
          return;
        }
        const res = await this.getListFn();
        console.log(res);
        if (res.data.result.songs === undefined) {
          this.resultList = [];
          return;
        }
        this.resultList = res.data.result.songs;
        this.loading = false;
      }, 900);
    },
    async onLoad() {
      this.page++;
      const res = await this.getListFn();
      if (res.data.result.songs === undefined) {
        this.finished = true;
        this.loading = false;
        return;
      }
      this.resultList = [...this.resultList, ...res.data.result.songs];
      this.loading = false;
    },
  },
  components: { SongItem },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.van-cell {
  border-bottom: 1px solid lightgray;
}
/* 给单元格设置底部边框 */
</style>
