<template>
  <div class="box">
    <div class="notice-box">
      <img class="notice-icon" src="@/assets/logo.svg" alt="" />
      <div class="marquee">
        <span class="marquee-txt">
          福彩快乐六合彩
          【中国人自己的六合彩】上线了！开奖结果：取自官方福彩快乐8开奖直播视频落球顺序（取49数字以内，即前6个号码为正码，第7个为特码），每日21:30开奖。官方网址：https://www.cwl.gov.cn/ygkj/wqkjsp/kl8/
          中国福彩官方，公平公正，抖音快手直播开奖！
        </span>
      </div>
    </div>
    <ul class="nav">
      <li class="item">线路检测</li>
      <li class="item">会员VIP权益</li>
      <li class="item">代理中心</li>
      <UserWallet />
      <UserName />
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserName from './UserName.vue'
import UserWallet from './UserWallet.vue'

const isLoading = ref(false)

function refresh() {
  isLoading.value = true
  // 模拟数据刷新
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
}
</script>

<style lang="scss" scoped>
.primary {
  color: $primaryColor;
}

.box {
  height: 40px;
  @include flexBetween;
  background: #fafafa;

  .notice-box {
    width: 580px;
    height: 100%;
    @include flexCenter;
    padding: 0 10px;
    box-sizing: border-box;

    .notice-icon {
      width: 14px;
      height: 14px;
      margin-right: 10px;
    }

    .marquee {
      flex: 1;
      box-sizing: border-box;
      word-break: break-all;
      white-space: nowrap;
      overflow: hidden;

      .marquee-txt {
        display: inline-block;
        padding-left: 100%;
        /* 从右至左开始滚动 */
        animation: marqueeTransform 30s linear infinite;

        font-family: PingFangSC;
        font-size: 14px;
        text-align: center;
        color: #5f5f5f;
      }

      @keyframes marqueeTransform {
        0% {
          transform: translate(0, 0);
        }

        100% {
          transform: translate(-100%, 0);
        }
      }
    }
  }

  .nav {
    height: 100%;
    display: flex;

    .item {
      height: 100%;
      padding: 0 10px;
      flex-grow: 0;
      font-size: 14px;
      color: #333;
      cursor: pointer;
      @include flexCenter;

      &:hover {
        color: $primaryColor;
      }
    }
  }

  .price-box,
  .name-box {
    @include flexCenter;
    margin-left: 20px;
    cursor: pointer;

    .label {
      font-size: 14px;
      color: #333;
      margin-right: 5px;
    }

    .val {
      font-size: 14px;
      font-weight: 600;
    }

    .num {
      font-size: 12px;
      font-weight: 500;
      padding: 2px 4px;
      background-color: $primaryColor;
      color: #fff;
      border-radius: 500px;
      margin-left: 6px;
    }
  }



}
</style>
