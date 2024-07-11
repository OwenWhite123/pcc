<template>
  <div class="page">
    <div class="title">支持的支付方式</div>
    <ul class="logos">
      <li class="logo" v-for="item in payType" :key="item.id">
        <img class="logo-img" :src="item.img" />
      </li>
    </ul>
    <div class="footer">
      <ul class="menus">
        <li class="menu">常见问题</li>
        <li class="menu">在线客服</li>
        <li class="menu">代理加盟</li>
        <li class="menu">手机版</li>
        <li class="menu">APP下载</li>
      </ul>
      <p class="txt">理性购彩，未满 18 周岁未成年人禁止购彩及兑奖</p>
      <p class="txt">
        健康游戏忠告：抵制黑平台不良游戏，拒绝盗版小平台游戏。注意自我保护，谨防受骗上当。
      </p>
      <p class="txt">温馨提示您适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHomeDomainStore } from '@/stores/home.js'
const domainStore = useHomeDomainStore()
import logo from '@/assets/logo.svg'

const payType = ref([
  {
    id: 1,
    name: '支付宝',
    img: logo
  },
  {
    id: 2,
    name: '微信',
    img: logo
  },
  {
    id: 3,
    name: '微信',
    img: logo
  },
  {
    id: 4,
    name: '微信',
    img: logo
  },
  {
    id: 5,
    name: '微信',
    img: logo
  },
  {
    id: 6,
    name: '微信',
    img: logo
  },
  {
    id: 7,
    name: '微信',
    img: logo
  }
])
</script>

<style lang="scss" scoped>
.page {
  padding-top: 20px;

  .title {
    text-align: center;
    font-size: 16px;
    color: #999999;
  }

  .logos {
    @include flexCenter;
    padding: 23px 0;

    .logo {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      background-color: #eee;
      margin: 0 15px;



      .logo-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.menus {
  @include flexCenter;
  color: #5f5f5f;
  font-size: 16px;
  margin-bottom: 10px;

  .menu {
    height: 40px;
    padding: 0 10px;
    cursor: pointer;
    @include flexCenter;

    &:hover {
      color: $primaryColor;
    }
  }
}

.txt {
  text-align: center;
  font-size: 14px;
  margin-top: 6px;
  color: #999999;
}

.footer {
  background-color: #ebeff4;
  padding: 15px 0;
}
</style>
