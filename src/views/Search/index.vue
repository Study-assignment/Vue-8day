<template>
  <div>
    <van-search shape="round" placeholder="请输入搜索关键词" v-model="value" />
    <!-- 热门搜索 -->
    <template v-if="serachList.length == 0">
      <van-cell title="热门搜索" />
      <div style="padding: 10px 16px">
        <van-tag
          color="#a18cd1"
          text-color="#30cfd0"
          size="large"
          plain
          round
          type="primary"
          v-for="(item, index) in tags"
          :key="index"
          style="margin-right: 6px"
          @click="clickFn(item.first)"
        >
          {{ item.first }}
        </van-tag>
      </div>
    </template>
    <!-- 最佳匹配 -->
    <template v-else>
      <van-cell title="最佳匹配" />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in serachList"
          :key="item.id"
          :title="item.name"
          :label="`${item.ar[0].name}-${item.name}`"
        />
      </van-list>
    </template>
  </div>
</template>
<script>
import { getSearchTagApi, getSearchListApi } from '@/apis'
export default {
  data() {
    return {
      tags: [],
      value: '',
      serachList: [],
      loading: false,
      finished: false,
    }
  },
  created() {
    this.getTagList()
  },
  methods: {
    async getTagList() {
      try {
        const res = await getSearchTagApi()
        this.tags = res.data.result.hots
      } catch (e) {
        console.log(e)
      }
    },

    async clickFn(val) {
      this.value = val
      try {
        const res = await getSearchListApi({
          keywords: this.value,
        })
        this.serachList = res.data.result.songs
        this.$toast.success('成功文案')
      } catch {
        this.$toast.fail('失败文案')
      }
    },
    onLoad() {
      console.log(11)
    },
  },
}
</script>
