<template>
  <div class="home-container">
    <!-- 推荐歌单 -->
    <van-cell class="title" title="推荐歌单" />
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for="item in recommendList" :key="item.id">
        <van-image width="111" height="100" :src="item.picUrl" />
        <p class="music-name van-multi-ellipsis--l2">{{ item.name }}</p>
      </van-grid-item>
    </van-grid>

    <van-cell title="最佳匹配" class="title" />
    <van-cell
      :label="`${item.song.artists[0].name || '未知歌手'}-${item.name}`"
      :title="item.name"
      v-for="item in newSongList"
      :key="item.id"
      center
    >
      <template>
        <van-icon color="#000" name="play-circle-o" size="28" />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getRecommendList, getNewSongList } from '@/apis/home.js'
export default {
  data() {
    return {
      recommendList: [],
      newSongList: [],
    }
  },
  created() {
    this.getPersonalized()
    this.getNewSong()
  },
  methods: {
    async getPersonalized() {
      try {
        const res = await getRecommendList({ limit: 6 })
        this.recommendList = res.data.result
      } catch (error) {
        console.log('error', error)
      }
    },
    async getNewSong() {
      try {
        const res = await getNewSongList()
        this.newSongList = res.data.result
      } catch (error) {
        console.log('error', error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  .title {
    background-color: #c71d24;
    color: #fff;
  }

  .music-name {
    font-size: 12px;
    text-align: left;
    line-height: 20px;
    width: 100%;
    padding: 0 5px;
    box-sizing: border-box;
    height: 37px;
  }

  /deep/.van-grid-item__content {
    padding: 10px 0px;
  }
  .van-cell__value {
    flex: 0 0 30px;
  }
}
</style>
