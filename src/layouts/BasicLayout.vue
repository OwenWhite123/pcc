<template>
  <el-container class="container">
    <!-- <img src="../../public/right-top-bg.png" class="right-top-bg" alt="" /> -->
    <el-container>
      <Transition name="expand" mode="out-in" v-if="!$route.meta.isHideMenu">
        <el-aside width="200px" class="aside">
          <HMenu class="h-menu" :menus="menus" />
        </el-aside>
      </Transition>
      <el-main>
        <!-- <el-header v-if="!$route.meta.isHideMenu">
          <HHeader />
        </el-header> -->
        <section :class="$route.meta.isHideMenu ? 'full-screen' : 'content'">
          <HRouteView keepAlive />
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { HMenu, HRouteView } from '@/components'
import userRoutes from '@/router/user'

const menus = userRoutes
</script>
<style lang="scss" scoped>
.container {
  // width: 100vw;
  // height: 100vh;
  background: var(--el-blank-bg-color);
  position: relative;
  z-index: 0;

  .right-top-bg {
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    width: 830px;
  }

  .aside {
    height: 100%;
    padding: 0;
    position: relative;
    overflow: hidden;

    .logo {
      width: 200px;
      margin: 15px 0;

      &:active {
        opacity: 0.7;
      }
    }

    // .el-menu {
    // 	border-right: none;
    // 	min-width: 200px;

    // }
    .h-menu {
      border-right: none;
      min-width: 200px;
      :deep(.el-menu-item) {
        height: 40px;
        width: 100%;
        background-color: #fff;
      }
      :deep(.el-sub-menu__title) {
        & > span {
          display: flex !important;
          align-items: center !important;
        }
      }
      :deep(.el-menu-item.is-active) {
        color: $primaryColor;
      }

      :deep(.el-sub-menu.is-active) {
        .el-sub-menu__title {
          color: $primaryColor;
        }
      }
      :deep(.el-sub-menu.is-active) {
        .el-sub-menu {
          .el-sub-menu__title {
            color: $primaryColor;
          }
        }
        .el-sub-menu.is-active {
          .el-sub-menu__title {
            color: $primaryColor;
            & > span {
              display: flex !important;
              align-items: center !important;
            }
          }
        }
      }
    }
  }

  .collapse-aside {
    .cloud-logo {
      cursor: pointer;
      transition:
        transform 0.2s,
        opacity 0.2s;

      &:active {
        transform: scale(0.9);
        opacity: 0.7;
      }
    }

    .el-row {
      border-right: solid 1px var(--el-menu-border-color);
    }

    .el-menu {
      :deep(.el-menu-item) {
        padding: 0 0 0 15px;
        cursor: pointer;
        transition:
          transform 0.1s,
          opacity 0.1s;

        &:active {
          transform: scale(0.8);
          opacity: 0.7;
        }
      }
    }
  }

  .collapse,
  .expand {
    position: absolute;
    bottom: 56px;
    right: 22px;
    width: 24px;
    transition:
      transform 0.2s,
      box-shadow 0.2s,
      filter 0.2s;
    cursor: pointer;

    &:hover {
      filter: brightness(1.2);
      /* 鼠标移入时亮度增加 */
    }
  }

  .expand {
    left: 18px;
    transform: rotatey(180deg);
  }

  .el-main {
    padding: 0;
    margin: 0;
    .content {
      overflow: auto;
      // height: calc(100vh - 80px);
      // padding: 10px 15px 10px 15px;
    }
    .full-screen {
      overflow: auto;
      // height: 100vh;
    }
  }

  .el-header {
    padding: 0;
  }
}

.collapse-leave-active,
.expand-leave-active {
  transition: all 0.5s ease;
}

.collapse-leave-to {
  width: 60px;
  opacity: 0.5;
}

.expand-leave-to {
  width: 200px;
  opacity: 0.5;
}
</style>
