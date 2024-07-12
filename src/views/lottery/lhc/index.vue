<template>
  <div class="page">
    <div class="mind">
      <div class="head">
        <img class="logo" src="" alt="" />
        <div class="name-box">
          <div class="name">香港六合彩</div>
          <div class="num">555555期</div>
        </div>
        <img class="icon" src="" alt="" />
        <ul class="res">
          <li class="res-cell">
            <div class="num">21</div>
            <div class="label">狗</div>
          </li>
        </ul>
        <div class="timer-box">
          <div>
            <span>距离555556期</span>
            <span>封盘 1天 10:15:12</span>
          </div>
          <div>
            <span>开奖</span>
            <el-countdown title="Start to grab" :value="value" />
          </div>
        </div>
      </div>
    </div>
    <div class="side"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
const value = ref(Date.now() + 1000 * 60 * 60 * 7)
</script>

<style scoped lang="scss">
.page {
  display: flex;

  .mind {
    flex: 1;
    border-radius: 10px;
    margin-right: 5px;
    background-color: #fff;

    .head {
      display: flex;
      align-items: center;
      height: 98px;
      background: linear-gradient(90deg, #ededf8 0%, #dde6fb 29%, #dfe8fc 65.5%, #c1d7fe 100%);

      .logo {
        width: 60px;
        height: 60px;
        margin-right: 5px;
      }
      .name-box {
        .name {
          font-size: 16px;
          line-height: 22px;
        }
        .num {
          font-size: 13px;
          font-weight: 400;
          line-height: 18px;
          margin-top: 4px;
        }
      }
      .icon {
        width: 14px;
        height: 14px;
        margin: 0 10px;
      }
      .res {
        flex: 1;
        display: flex;
        align-items: center;
        .res-cell {
          display: flex;
          flex-direction: column;
          .num {
            width: 26px;
            height: 26px;
            text-align: center;
            line-height: 26px;
            color: #333333;
            font-size: 14px;
          }
          .label {
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            color: #333333;
            margin-top: 10px;
          }
        }
      }
      .timer-box {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      }
    }
  }
  .side {
    width: 352px;
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>
