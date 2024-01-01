<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabBarData" :key="index">
      <div
        class="tab-bar-item"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index, item)"
      >
        <img
          v-if="currentIndex !== index"
          :src="getAssetUrl(item.image)"
          alt=""
        />
        <img v-else :src="getAssetUrl(item.image_active)" alt="" />
        <span>{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import tabBarData from '@/assets/data/tabbar.js'
import { getAssetUrl } from '@/utils/load_assets.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentIndex = ref(0)
const itemClick = (index, item) => {
  currentIndex.value = index
  router.push(item.path) // 使用编程式导航改变路由
}

</script>

<style lang="less" scoped>
.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  border-top: 1px solid #f3f3f3;
  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.active {
      color: var(--primary-color);
    }
    text {
      font-stretch: 12px;
    }
    img {
      width: 36px;
    }
  }
}
</style>