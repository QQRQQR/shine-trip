<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box></home-search-box>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import HomeNavBar from './cpns/home-nav-bar.vue'
import homeSearchBox from './cpns/home-search-box.vue'
import useHomeStore from '@/stores/modules/home';

// 热门城市建议
// 发送请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()

// 请求分类数据
const categories = ref([])
hyRequest.get({
  url: '/home/categories'
}).then(res => {
  console.log(res);
  categories.value = res.data
})
</script>


<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>