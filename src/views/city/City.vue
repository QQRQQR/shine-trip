<template>
  <div class="city top-page">
    <div class="top">
      <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        shape="round"
        show-action
        placeholder="城市区域位置"
        @cancel="cancelClick"
      />
      <!-- tab切换 -->
      <van-tabs
        v-model:active="tabActive"
        @change="itemClick"
        color="#ff9854"
        line-height="3"
      >
        <template v-for="(value, key, index) in allCities" :key="index">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <!-- 城市列表 -->
    <div class="content">
      <template v-for="(value, key, index) in allCities" :key="index">
        <city-group v-show="tabActive === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue"
import { storeToRefs } from "pinia"
import useCityStore from "@/stores/modules/city"
import { useRouter } from "vue-router"
import { getCityAll } from '@/service'

import cityGroup from './cpns/city-group.vue'

const searchValue = ref("")
const router = useRouter()
const cancelClick = () => {
  router.back()
}

// tab切换
const tabActive = ref()

// 网络请求,请求城市数据
// const allCity = ref()
// getCityAll().then(res => {
//   allCity.value = res.data
// })

// 从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData() // 开始获取数据
// const {allCities} = cityStore // 取出数据(非响应式的)
const { allCities } = storeToRefs(cityStore)

// 获取选中标签后的数据
const currentGroup = computed(() => allCities.value[tabActive.value]) // 计算属性.依赖的东西改变,结果也会随之改变
</script>

<style lang="less" scoped>
.city {
  .top {
    position: relative;
    z-index: 9;
  }
  // 固定定位
  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }
  // .content {
  //   margin-top: 98px;
  // }

  // 局部滚动
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>