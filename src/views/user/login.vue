<template>
  <el-row type="flex" align="middle" class="container">
    <Transition name="fade">
      <div class="box">
        <el-form ref="formRef" class="form" :model="formValue" :rules="rules" label-position="top">
          <el-image style="width: 184px; height: 45px" :src="domainStore.loginImg" fit="contain" />
          <p
            style="
              font-size: 26px;
              font-weight: 600;
              line-height: 32px;
              text-align: center;
              margin-bottom: 61px;
            "
          >
            登录
          </p>

          <el-form-item prop="userName">
            <el-input placeholder="请输入用户名" v-model="formValue.userName" @keyup.enter="submit">
              <template #prefix>
                <el-icon size="20"><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="loginPwd">
            <el-input
              placeholder="请输入密码"
              v-model="formValue.loginPwd"
              type="password"
              @keyup.enter="submit"
            >
              <template #prefix>
                <el-icon size="20"><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input
              placeholder="请输入验证码"
              v-model="formValue.captcha"
              type="text"
              @keyup.enter="submit"
            >
              <template #prefix>
                <img class="icon" :src="domainStore.logoImg" />
              </template>
              <template #suffix>
                <el-image style="width: 85px; height: 45px" :src="codeImg" fit="contain" />
              </template>
            </el-input>
          </el-form-item>
          <div style="display: flex; align-items: center; justify-content: space-between">
            <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
            <el-link type="primary" :href="domainStore.viewPath">忘记密码？</el-link>
          </div>
          <el-row>
            <el-button
              class="btn"
              @click="submit"
              type="primary"
              :disabled="confirmLoading"
              :loading="confirmLoading"
            >
              登录
            </el-button>
          </el-row>
        </el-form>
      </div>
    </Transition>
  </el-row>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  setLsToken,
  setLsHasLogin,
  setLsUserName,
  getLsUserName,
  setLsUserPw,
  getLsUserPw,
  removeLsUserPw,
  setLsUserRememberPw,
  getLsUserRememberPw
} from '@/core/storage/ls'
import { login, getCaptcha } from '@/api/user'
import { useHomeDomainStore } from '@/stores/home.js'
const domainStore = useHomeDomainStore()

const confirmLoading = ref(false)
const router = useRouter()
const rememberPassword = ref(false)
// 登录方式
const codeImg = ref('')
const formRef = ref()
const formValue = ref({
  userName: '',
  loginPwd: '',
  captcha: '',
  captchaKey: ''
})

const rules = ref({
  userName: [
    {
      required: true,
      message: '请输入用户名'
    }
  ],
  loginPwd: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  captcha: [
    {
      required: true,
      message: '请输入验证码'
    }
  ]
})

onMounted(() => {
  if (getLsUserName()) {
    formValue.value.userName = getLsUserName()
  }
  if (getLsUserPw()) {
    formValue.value.loginPwd = getLsUserPw()
  }
  rememberPassword.value = Boolean(getLsUserRememberPw() ?? 0)
  getCaptchaHandle()
})
//获取图片验证码
async function getCaptchaHandle() {
  const { result } = await getCaptcha({ type: 2 })
  if (result) {
    codeImg.value = result.image
    formValue.value.captchaKey = result.key
  }
}

function submit() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      await loginFn()
    }
  })
}

async function loginFn() {
  confirmLoading.value = true

  const data = formValue.value
  const { result } = await login(data)
  if (result) {
    setLsToken(result.token)
    setLsUserName(data.userName)
    if (rememberPassword.value) {
      setLsUserRememberPw('1')
      setLsUserPw(data.loginPwd)
    } else {
      setLsUserRememberPw('0')
      removeLsUserPw()
    }
    ElMessage.success('登录成功')
    setLsHasLogin('1')
    router.push('/')
  }
  setTimeout(() => {
    confirmLoading.value = false
  }, 1000)
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  // background-image: url(@/assets/images/login/bg.png);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  position: relative;
  // transform-style: preserve-3d; /* 保持3D变换 */

  .logo-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    margin: 52px 0 0 52px;
  }
}

.box {
  width: 514px;
  height: 603px;
  background: #fefefe;
  box-shadow: 0px 2px 28px 2px rgba(23, 13, 2, 0.14);
  border-radius: 20px;
  margin-left: auto;
  margin-right: 260px;
  display: flex;
  justify-content: center;
  position: absolute;
  left: auto;
  right: 0;

  .superscript {
    position: absolute;
    top: 0;
    right: 0;
    width: 72px;

    // 鼠标移入显示
    &:hover {
      cursor: pointer;
    }
  }

  .swipe-login {
    position: absolute;
    top: 24px;
    right: 62px;
    width: 112px;

    &:hover {
      cursor: pointer;
    }
  }

  .form {
    margin-top: 73px;

    .el-form-item {
      width: 365px;
    }

    .el-input {
      height: 54px;
    }

    :deep(.el-input__inner) {
      padding-left: 0;
    }
  }

  .icon {
    width: 80px;
    height: 40px;
    background-color: #ff0;
  }

  .btn {
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    margin-top: 46px;
  }
}

// .fade-enter-active {
//   transition: all 0.2s ease-out;
// }

// .fade-leave-active {
//   transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
// }
.fade-enter-from {
  opacity: 0;
  transform: rotateY(180deg);
}
.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-enter-to {
  opacity: 1;
  transform: rotateY(0);
}

.fade-leave-from {
  opacity: 1;
  transform: rotateY(0);
}
.fade-leave-active {
  transition: all 0.5s linear;
}
.fade-leave-to {
  opacity: 0;
  transform: rotateY(180deg);
}
</style>
