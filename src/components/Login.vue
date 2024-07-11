<template>
  <div class="box">
    <el-form ref="formRef" class="form" :model="formValue" :rules="rules" label-position="top">
      <p class="title">登录</p>

      <el-form-item prop="userName">
        <el-input placeholder="请输入用户名" v-model="formValue.userName" @keyup.enter="submit">
          <template #prefix>
            <el-icon size="20">
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="loginPwd">
        <el-input placeholder="请输入登录密码" v-model="formValue.loginPwd" type="password" @keyup.enter="submit">
          <template #prefix>
            <el-icon size="20">
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input placeholder="验证码" v-model="formValue.captcha" type="text" @keyup.enter="submit">
          <template #prefix>
            <el-icon size="20">
              <User />
            </el-icon>
          </template>
          <template #suffix>
            <div class="code-box">
              <el-image :src="codeImg" style="height: 100%" fit="contain" @click="getCaptchaHandle" />
            </div>
          </template>
        </el-input>
      </el-form-item>

      <el-row>
        <el-button class="btn" @click="submit" type="primary" :disabled="confirmLoading" :loading="confirmLoading">
          登录
        </el-button>
      </el-row>
      <div style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 15px;
            ">
        <!-- <el-checkbox v-model="rememberPassword">记住密码</el-checkbox> -->
        <el-button class="btn-register" @click="goRegister" type="warning">
          <span style="margin-right: 5px">立即注册</span>
          <el-icon size="20">
            <User />
          </el-icon>
        </el-button>
        <el-link type="primary" :href="domainStore.viewPath">忘记密码？</el-link>
      </div>
    </el-form>
  </div>
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
import { login, getCaptcha, userInfo } from '@/api/user'
import { useHomeDomainStore } from '@/stores/home.js'

const router = useRouter()
const domainStore = useHomeDomainStore()

const emits = defineEmits(['success', 'goRegister', 'forgot'])

const dialogVisible = ref(false)
const confirmLoading = ref(false)
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
  if (confirmLoading.value) {
    return false
  }
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
    // router.push('/')
    domainStore.setAttribute('hasLogin', true)
    userInfoFn()
    emits('success')
    setTimeout(() => {
      confirmLoading.value = false
    }, 1000)
  } else {
    confirmLoading.value = false
  }
}

async function userInfoFn(user) {
  const { result } = await userInfo(user)
  if (result) {
    domainStore.setAttribute('userInfo', result.user)
  }
}

function goRegister() {
  emits('goRegister')
  router.push('/register')
}

function init() {
  formValue.value = {
    userName: '',
    loginPwd: '',
    captcha: '',
    captchaKey: ''
  }
}

</script>

<style scoped lang="scss">
.mind {
  @include flexCenter;

  .img-box {
    width: 350px;
    height: 100%;

    .img {
      width: 100%;
      height: 100%;
    }
  }
}

.box {
  flex: 1;
  background: #ffffff;
  padding: 15px 25px 25px 25px;
  display: flex;
  justify-content: center;

  .title {
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    margin-bottom: 15px;
  }

  .form {
    .el-form-item {
      width: 300px;
    }

    .el-input {
      height: 40px;
    }

    :deep(.el-input__inner) {
      padding-left: 0;
    }
  }

  .code-box {
    height: 38px;
    flex-grow: 0;
    border-radius: 3px;
    background-color: #f5f5f5;
    border: #f5f5f5 1px solid;
    @include flexCenter;
    cursor: pointer;
    margin-right: -10px;
  }

  .btn {
    width: 100%;
    height: 40px;
    font-size: 14px;
    margin-top: 15px;
  }

  .btn-register {
    width: 150px;
    height: 40px;
    font-size: 14px;
    border-radius: 4px;
    background-image: linear-gradient(to right, #ff9a48, #fe9c4d);
    @include flexCenter;
  }
}
</style>
