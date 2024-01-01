<template>
  <div class="city-group">
    <van-index-bar :index-list="indexList">
      <!-- 热门 -->
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(item, index) in groupData.hotCities" :key="index">
          <div class="city" @click="cityClick(item)">{{ item.cityName }}</div>
        </template>
      </div>
      <!-- 其他城市 -->
      <template v-for="(group, index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group"></van-index-anchor>
        <template v-for="(city, k) in group.cities" :key="k">
          <van-cell :title="city.cityName" @click="cityClick(city)"></van-cell>
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>

import useCityStore from '@/stores/modules/city';
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

// 动态索引
const indexList = computed(() => {
  const list = props.groupData.cities.map((item) => item.group)
  list.unshift('#')
  return list
})

// 监听城市点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
  console.log('city', city)
  cityStore.currentCity = city
  router.back()
}

</script>

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px 25px 10px 20px;
  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    margin-bottom: 6px;
    background-color: #fff4ec;
  }
}
</style>