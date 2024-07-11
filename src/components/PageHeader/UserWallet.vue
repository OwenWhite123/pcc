<template>
  <div class="name-box" v-if="domainStore.hasLogin">
    <el-popover ref="menuPopoverRef" placement="bottom" :width="260" trigger="click" disabled>
      <template #reference>
        <div style="display: flex;align-items: center;">
          <div class="label">主钱包：</div>
          <div class="load-box" v-if="isLoading"><span class="loader"></span></div>
          <div class="primary val" v-else>￥52121</div>
          <div class="refresh-icon">
            <el-icon @click="refresh">
              <RefreshRight />
            </el-icon>
          </div>
        </div>
      </template>
      <div class="mind-box">

        <div class="left-box">
          <div class="money">
            <span class="num">￥123</span>
            <div class="refresh-icon">
              <el-icon @click="refresh">
                <RefreshRight />
              </el-icon>
            </div>
          </div>
          <div class="name">主钱包余额</div>
        </div>
        <div class="right-box">
          <el-button class="btn">充值
            <el-icon>
              <MessageBox />
            </el-icon>
          </el-button>
          <el-button class="btn">额度转换
            <el-icon>
              <MessageBox />
            </el-icon>
          </el-button>
        </div>
      </div>
      <div class="menus">
        <el-menu @select="select">
          <div v-for="item in userRoutes" :key="item.path">
            <template v-if="item.children && item.children.length">
              <el-sub-menu :index="item.path">
                <template #title>
                  <el-icon>
                    <location />
                  </el-icon>
                  <span>{{ item.meta.title }}</span>
                </template>
                <el-menu-item v-for="temp in item.children" :key="temp.path" :index="temp.path">{{ temp.meta.title
                  }}</el-menu-item>
              </el-sub-menu>
            </template>
            <template v-else>
              <el-menu-item :index="item.path">
                <el-icon>
                  <setting />
                </el-icon>
                <span>{{ item.meta.title }}</span>
              </el-menu-item>
            </template>
          </div>
        </el-menu>
      </div>
    </el-popover>
  </div>

  <Login ref="loginRef" />

</template>

<script setup>
import { ref, unref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import userRoutes from '@/router/user'
import { ElMessageBox, ElMessage, ElLoading } from "element-plus"
import { getPlatList } from '@/api/user'

import Login from './Login.vue'
import { useHomeDomainStore } from '@/stores/home.js'
const domainStore = useHomeDomainStore()

const router = useRouter()
const isLoading = ref(false)

const loginRef = ref()
const menuPopoverRef = ref()

const platList = ref([])

onMounted(() => {
})

function select(path) {
  unref(menuPopoverRef).hide()
}

function refresh() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
}

async function getPlatListFn() {
  const { result } = await getPlatList()
  if (result) {
    platList.value = result.list
  }
}

</script>

<style scoped lang="scss">
.primary {
  color: $primaryColor;
}

.mind-box {
  @include flexCenter;

  .left-box {
    flex: 1;

    .money {
      font-size: 18px;
      font-weight: 400;
      line-height: 25px;
      display: flex;
      align-items: center;

      .num {
        margin-right: 4px;
        color: $primaryColor;
      }
    }

    .name {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

    }
  }

  .right-box {
    width: 95px;

    .btn {
      width: 95px;
      height: 32px;
      order: 1px solid #F3F9FF;
      color: $primaryColor;
      font-size: 14px;
      margin: 0;

      &:nth-child(n + 2) {
        margin-top: 5px;
      }
    }
  }
}

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

.refresh-icon {
  width: 24px;
  height: 100%;
  @include flexCenter;
  cursor: pointer;
}

.load-box {
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;

  .loader,
  .loader:before,
  .loader:after {
    display: block;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    animation-fill-mode: both;
    animation: bblFadInOut 1.8s infinite ease-in-out;
  }

  .loader {
    color: $primaryColor;
    font-size: 7px;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.16s;
  }

  .loader:before,
  .loader:after {
    content: '';
    position: absolute;
    top: 0;
  }

  .loader:before {
    left: -16px;
    animation-delay: -0.32s;
  }

  .loader:after {
    left: 16px;
  }
}

@keyframes bblFadInOut {

  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }

  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

.menus {
  $iconWidth: 30px;

  :deep(.el-menu) {
    border-right: 0;

    .el-menu-item,
    .el-sub-menu__title {
      height: 40px;
      line-height: 40px;
      color: #5F5F5F;
      font-size: 16px;
      padding: 0;
    }

    .el-sub-menu__title {
      .el-sub-menu__icon-arrow {
        margin-right: -20px;
      }
    }

    .el-menu--inline {
      .el-menu-item {
        padding-left: $iconWidth;
        color: #999;
        font-size: 14px;
      }
    }
  }
}
</style>
