<template>
  <div>
    <el-row type="flex" align="middle" class="container">
        <div class="img-box">
          <img class="img" src="@/assets/logo.svg"></img>
        </div>
        <div class="box">
          <el-form ref="formRef" class="form" :model="formValue" :rules="rules" label-width="90px">
            <p class="title">注册</p>
            <el-form-item prop="userName" label="用户名">
              <el-input type="text" placeholder="请输入4-12位数字或字母" v-model="formValue.userName">
                <template #prefix>
                  <el-icon size="20"><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="loginPwd" label="密码">
              <el-input
                placeholder="请输入6-12位数字或字母"
                v-model="formValue.loginPwd"
                type="password"
              >
                <template #prefix>
                  <el-icon size="20"><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="loginPwd1" label="确认密码">
              <el-input placeholder="请再次确认密码" v-model="formValue.loginPwd1" type="password">
                <template #prefix>
                  <el-icon size="20"><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="realName" label="真实姓名">
              <el-input type="text" placeholder="请输入真实姓名" v-model="formValue.realName">
                <template #prefix>
                  <el-icon size="20"><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item type="number" prop="inviteCode" label="邀请码">
              <el-input placeholder="请输入邀请码" v-model="formValue.inviteCode">
                <template #prefix>
                  <el-icon size="20"><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item type="number" prop="captcha" label="验证码">
              <el-input
                placeholder="请输入验证码"
                v-model="formValue.captcha"
                type="text"
                @keyup.enter="submit"
              >
                <template #prefix>
                  <el-icon size="20"><User /></el-icon>
                </template>
                <template #suffix>
                  <div class="code-box">
                    <el-image
                      :src="codeImg"
                      style="height: 100%"
                      fit="contain"
                      @click="getCaptchaHandle"
                    />
                  </div>
                </template>
              </el-input>
            </el-form-item>
  
            <el-row>
              <el-button class="btn-register" @click="submit" type="warning">
                <span style="margin-right: 5px">立即注册</span>
                <el-icon size="20"><User /></el-icon>
              </el-button>
            </el-row>
            <div class="login-box">
              <!-- <el-checkbox v-model="rememberPassword">记住密码</el-checkbox> -->
              <span
                >已有账号？<el-link class="login" type="primary"  @click="openLoginDialog">立即登录</el-link
                ></span
              >
            </div>
          </el-form>
        </div>
    </el-row>
  
    <Login ref="loginRef" />

  </div>
</template>
<script setup>
import { ref, onMounted, unref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import Login from '@/components/PageHeader/Login.vue'
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
import { register, getCaptcha } from '@/api/user'
import { useHomeStore } from '@/stores/home.js'
const homeStore = useHomeStore()

const loginRef = ref(false)
const confirmLoading = ref(false)
const router = useRouter()
const rememberPassword = ref(false)
// 登录方式
const codeImg = ref('')
const formRef = ref()
const formValue = ref({
  userName: '',
  loginPwd: '',
  loginPwd1: '',
  realName: '',
  captcha: '',
  captchaKey: '',
  inviteCode: ''
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
  loginPwd1: [
    {
      required: true,
      message: '请再次确认密码'
    },
    { validator: validatePass, trigger: 'blur' }
  ],
  realName: [
    {
      required: true,
      message: '请输入真实姓名'
    }
  ],
  inviteCode: [
    {
      required: true,
      message: '请输入邀请码'
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

function validatePass (rule, value, callback) {
  if (value === '') {
    callback(new Error('请再次确认密码'))
  } else if (value !== formValue.value.loginPwd) {
    callback(new Error("两次密码不一致!"))
  } else {
    callback()
  }
}

function openLoginDialog(){
  unref(loginRef).open()
}


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
      await registerFn()
    }
  })
}

async function registerFn() {
  confirmLoading.value = true

  const data = formValue.value
  delete data.loginPwd1
  const { result } = await register(data)
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
    ElMessage.success('注册成功')
    setLsHasLogin('1')
    homeStore.setAttribute('hasLogin', true)
    router.push('/')
  }
  setTimeout(() => {
    confirmLoading.value = false
  }, 1000)
}
</script>

<style scoped lang="scss">
.container {
  border-radius: 10px;
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
  width: 514px;
  background: #fefefe;
  display: flex;
  justify-content: center;
  padding: 30px;

  .title {
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    margin-bottom: 15px;
  }

  .form {
    margin-top: 25px;

    .el-form-item {
      width: 365px;
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
    margin-right: -11px;
  }

  .btn {
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    margin-top: 15px;
  }

  .btn-register {
    width: 100%;
    height: 40px;
    font-size: 14px;
    border-radius: 4px;
    background-image: linear-gradient(to right, #ff9a48, #fe9c4d);
    @include flexCenter;
  }

  .login-box {
    @include flexCenter;
    margin-top: 15px;
    font-size: 16px;

    .login {
      font-size: 16px;
    }
  }
}
</style>
