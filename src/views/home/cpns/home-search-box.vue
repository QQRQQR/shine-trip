<template>
  <div class="search-box">
    <!-- 位置 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
    <!-- 日期范围 -->
    <div class="section date-range" @click="showCalendar = true">
      <div class="start">
        <span class="text">入住</span>
        <span class="date-in">{{ startDate }}</span>
      </div>
      <div class="stay">共{{stayCount}}晚</div>
      <div class="end">
        <span class="text">离店</span>
        <span class="date-out">{{ endDate }}</span>
      </div>
    </div>
    <van-calendar v-model:show="showCalendar" type="range" :round="false" color="#ff9854" @confirm="onConfirm" />
    <!-- 价格人数限制 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>
    <!-- 热门城市建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div class="item" :style="{color: item?.tagText?.color, background: item?.tagText?.background?.color}">
          {{ item.tagText.text }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city";
import { storeToRefs } from "pinia";

import useHomeStore from "@/stores/modules/home"
import { formatMonthDay, getDiffDays } from '@/utils/format_date'

const router = useRouter() // 补充: useRoute(): 拿到当前活跃路由

// 所在城市
const cityClick = () => {
  router.push('/city')
}
// 我的位置
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log('res-成功', res);
  }, err => {
    console.log('err-失败', err);
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  })
}

// 当前城市
const cityStore = useCityStore()
const {currentCity} = storeToRefs(cityStore)

// 日期范围处理
const nowDate = new Date() // 默认的入住时间,
const newDate = new Date() // 默认离店时间
newDate.setDate(nowDate.getDate() + 1) // 离店时间是1天后

const startDate = ref(formatMonthDay(nowDate)) // 入住时间文本,格式"01月01日"
const endDate = ref(formatMonthDay(newDate)) // 离店时间文本,格式"12月31日"
const stayCount = ref(getDiffDays(nowDate, newDate)) // 计算停留几天

const showCalendar =  ref(false)
const onConfirm = (value) => {
  startDate.value = formatMonthDay(value[0]) // 重置入店时间
  endDate.value = formatMonthDay(value[1]) // 重置离店时间
  showCalendar.value = false // 隐藏日历
  stayCount.value = getDiffDays(value[0], value[1]) // 计算中间时间有几天
}

// 热门城市建议
const homeStore = useHomeStore()
const {hotSuggests} = storeToRefs(homeStore)
</script>

<style lang="less" scoped>
.location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  .city {
    flex: 1;
  }
  .position {
    display: flex;
    align-items: center;
    width: 88px;
    color: #333;
    .text {
      font-size: 12px;
      line-height: 18px;
    }
    img {
      width: 18px;
      height: 18px;
      margin-left: 6px;
    }
  }
}

.section {
 display: flex; 
 justify-content: space-between;
 align-items: center;
 flex-wrap: wrap;
 padding: 20px;
}
.date-range {
  height: 44px;
  padding: 0 50px 0 20px;
  .stay {
    flex: 1;
    text-align: center;
    color: #969799;
  }
  
  .start,
  .end {
    display: flex;
    flex-direction: column;
    color: #666;
    .text {
      color: #c8c9cc;
    }
  }
}
.search-box {
  --van-calendar-popup-height: 100%;
}

.price-counter {
  display: flex;
  justify-content: space-between;
  height: 44px;
  line-height: 44px;
  padding: 0 20px;
  color: #c8c9cc;
  .end {
    padding-right: 40px;
  }
}
.keyword {
  height: 44px;
  line-height: 44px;
  padding: 0 20px;
  color: #c8c9cc;
}
.hot-suggests {
  justify-content: left;
  .item {
    font-size: 12px;
    padding: 4px 8px;
    margin: 3px;
    border-radius: 14px;
    line-height: 1;
    color: #3f4954;
    background-color: #f1f3f5;
  }
}
</style>