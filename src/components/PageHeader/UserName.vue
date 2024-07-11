<template>
  <div class="name-box" v-if="domainStore.hasLogin">
    <el-popover ref="menuPopoverRef" placement="bottom" :width="160" trigger="hover">
      <template #reference>
        <div style="display: flex;align-items: center;">
          <div class="label">欢迎回来，</div>
          <div class="primary val">{{ domainStore.userInfo.userName }}</div>
          <span class="num">99+</span>
        </div>
      </template>
      <div class="menus">
        <el-menu :router="true" @select="selectMenu">
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
          <el-menu-item @click="signOut">
            <el-icon>
              <setting />
            </el-icon>
            <span>退出登录</span>
          </el-menu-item>


        </el-menu>
      </div>
    </el-popover>
  </div>
  <div class="name-box" v-else>
    <div class="login" @click="openLoginDialog">登录</div>
    <div class="register" @click="goRegister">
      <span>立即注册</span>
      <img class="icon" src="@/assets/logo.svg"></img>
    </div>
  </div>

  <Login ref="loginRef" />

</template>

<script setup>
import { ref, unref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import userRoutes from '@/router/user'
import { ElMessageBox, ElMessage, ElLoading } from "element-plus"

import Login from './Login.vue'
import { userLogout } from '@/api/user'
import { clearLsAll, getLsUserName, setLsUserName } from '@/core/storage/ls'
import { useHomeDomainStore } from '@/stores/home.js'
const domainStore = useHomeDomainStore()

const router = useRouter()

const loginRef = ref()
const menuPopoverRef = ref()

onMounted(() => {
})

function signOut() {
  ElMessageBox({
    type: 'warning',
    title: '温馨提示',
    message: '确认退出登录吗?',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
    .then(async () => {
      const loadingInstance = ElLoading.service()
      await userLogoutFn()
      loadingInstance.close()
    })
}

async function userLogoutFn() {
  const { result } = await userLogout()
  if (result) {
    ElMessage.success('已退出登录')
    // clearLsAll()
    // setLsUserName(name)
    // await nextTick()
    setTimeout(() => {
      domainStore.$reset()
      router.push('/')
    }, 1000)
  }
}

function selectMenu(path) {
  unref(menuPopoverRef).hide()
}

function openLoginDialog() {
  unref(loginRef).open()
}

function goRegister() {
  router.push('/register')
}
</script>

<style scoped lang="scss">
.login {
  font-size: 14px;
  color: #333;
  cursor: pointer;
  @include flexCenter;

  &:hover {
    color: $primaryColor;
  }
}

.register {
  font-size: 14px;
  color: #333;
  cursor: pointer;
  @include flexCenter;
  color: $primaryColor;
  margin-left: 8px;

  .icon {
    width: 18px;
    height: 18px;
    margin-left: 5px;
  }
}

.name-box {
  @include flexCenter;
  margin-left: 20px;
  cursor: pointer;

  .login-popper {
    padding: 0;
  }

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
