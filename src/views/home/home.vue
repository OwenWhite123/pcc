<template>
  <div class="page">
    <div class="swiper">
      <el-carousel height="400px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small justify-center" text="2xl">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="mind">
      <div class="hot">
        <div class="head"></div>
        <div class="content">
          <div class="img-box">
            <el-button class="btn">彩票大厅</el-button>
          </div>
          <ul class="enters">
            <li class="enter" v-for="(item, index) in hotList" :key="index">
              <img class="img" :src="item.img" alt="">
              <span class="name">{{ item.lotteryName }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="res">
        <div class="title">
          <img src="" alt="">
          <span>最新开奖结果</span>
        </div>
        <div class="content">
          <div class="result"></div>
          <div class="rank"></div>
        </div>
      </div>
      <div class="server">

      </div>
    </div>

    <div class="login-box">
      <template v-if="domainStore.hasLogin">
        <div>

        </div>
      </template>
      <template v-else>
        <Login></Login>
      </template>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getAllLottery } from '@/api/index'
import Login from '@/components/Login.vue'
import { useHomeDomainStore } from '@/stores/home.js'
const domainStore = useHomeDomainStore()

const router = useRouter()
const route = useRoute()

const hotList = ref([])

onMounted(async () => {
  await getAllLotteryFn()
})
async function getAllLotteryFn() {
  const { result } = await getAllLottery()
  if (result) {
    const list = result.list
    hotList.value = list.filter(item => item.hot === 1).splice(0, 16)
  }
}
</script>
<style lang="scss" scoped>
.page {
  position: relative;

  .login-box {
    position: absolute;
    top: 55px;
    right: 160px;
    z-index: 2;
    width: 350px;
    background-color: #fff;
  }

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
    font-size: 50px;
  }

  .mind {
    width: $maxWidth;
    margin: 0 auto;

    .hot {
      margin-top: 55px;
      border-radius: 30px;
      overflow: hidden;

      .head {
        height: 79px;
        border-bottom: solid 1px #e7eef6;
        background-color: #f7faff;
      }

      .content {
        @include flexCenter;

        .img-box {
          flex-shrink: 0;
          width: 260px;
          height: 293px;
          background-color: #f5f6f7;
          position: relative;

          .btn {
            position: absolute;
            top: 213px;
            left: 0;
            transform: translate(50%);
            width: 130px;
            height: 34px;
            padding: 7px 37px;
            border-radius: 17px;
            box-shadow: 0 2px 0 0 #dae0e7, inset -1px -1px 0 0 #fff;
            background-color: #f9fcff;
            color: #3f5075;
          }
        }

        .enters {
          padding: 30px 10px 20px 10px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          background-color: #fff;

          .enter {
            width: 125px;
            @include flexCenter;
            flex-direction: column;
            padding-bottom: 20px;
            cursor: pointer;

            .img {
              width: 80px;
              height: 80px;
            }

            .name {
              line-height: 22px;
              font-size: 16px;
              color: #5f5f5f;
            }
          }
        }
      }
    }

    .res {
      margin-top: 50px;

      .title {
        line-height: 45px;
        font-size: 32px;
        color: $primaryColor;
        @include flexCenter;
        margin-bottom: 20px;
      }

      .content {
        border-radius: 20px;
        box-shadow: 0 4px 0 0 #cdd9e8, 2px 2px 14px 0 #e5ebf4;
        background-color: #fff;
        display: flex;

        .result {
          flex: 1;
        }

        .rank {
          width: 320px;
          background-image: linear-gradient(to bottom, rgba(255, 250, 241, 0), #fffaf1);
        }
      }
    }
  }
}
</style>
