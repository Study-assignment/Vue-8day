<template>
  <div>
    <van-search shape="round" placeholder="请输入搜索关键词" v-model="value" />
    <!-- 热门搜索 -->
    <template v-if="hots.length == 0">
      <van-cell title="热门搜索" />
      <div style="padding: 10px 16px">
        <van-tag
          color="red"
          size="large"
          plain
          round
          type="primary"
          v-for="(item, index) in hotSearchList"
          :key="index"
          style="margin: 5px"
          @click="clickFn(item.first)"
        >
          {{ item.first }}
        </van-tag>
      </div>
    </template>
    <template v-else>
      <van-cell title="最佳匹配" />

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in hots"
          :key="item.id"
          :title="item.name"
          :label="`${item.ar[0].name}-${item.name}`"
        />
      </van-list>
    </template>
  </div>
</template>
<script>
import { hotSearch, searchResult } from '@/apis/search'
export default {
  data() {
    return {
      hotSearchList: [],
      value: '',
      hots: [],
      loading: false,
      finished: true,
    }
  },
  created() {
    this.gethotSearchList()
  },
  methods: {
    async gethotSearchList() {
      try {
        const res = await hotSearch()
        this.hotSearchList = res.data.result.hots
      } catch (error) {
        console.log('error', error)
      }
    },
    clickFn(val) {
      this.value = val
      this.loadHotList()
    },
    async loadHotList() {
      try {
        const res = await searchResult({
          keywords: this.value,
        })
        this.hots = res.data.result.songs
      } catch (error) {
        console.log('error', error)
      }
    },
    onLoad() {},
  },
}
</script>
