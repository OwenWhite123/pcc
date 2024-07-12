<template>
  <div class="page">
    <ul class="enters">
      <li class="enter" v-for="item in list" :key="item.id">
        <el-image
          style="width: 18px; height: 18px; margin-right: 4px"
          :src="item.img"
          fit="contain"
        />
        {{ item.subPlatName }}
      </li>
      <li class="enter enter-all">进入大厅</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped lang="scss">
.page {
  @include flexBetween;
  background-color: #fff;
  padding: 10px 0;
}
.enters {
  width: 160px;

  .enter {
    border-left: 1px solid #f5f5f5;
    height: 34px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #5f5f5f;
    padding: 0 30px;

    &:hover {
      background-color: #f5f5f5;
      color: $primaryColor;
    }
  }

  .enter-all {
    @include flexCenter;
    color: $primaryColor;
    font-weight: 600;
  }
}
</style>
