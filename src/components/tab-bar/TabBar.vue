<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabBarData" :key="index">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetUrl(item.image)" />
            <img v-else :src="getAssetUrl(item.image_active)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import tabBarData from '@/assets/data/tabbar.js'
import { getAssetUrl } from '@/utils/load_assets.js'
const currentIndex = ref(0)

</script>

<style lang="less" scoped>
.tab-bar {
  :deep(.van-tabbar-item) {
    font-size: 16px;
  }
  img {
    height: 26px;
  }
}
</style>