<template>
  <van-cell center :title="name" :label="author + ' - ' + name">
    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
    <template #right-icon>
      <van-icon
        name="play-circle-o"
        class="search-icon"
        size="0.7rem"
        @click="Playfn"
      />
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    name: String,
    author: String,
    id: Number,
  },
  methods: {
    Playfn() {
      this.$router.push({
        path: '/play',
        query: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
