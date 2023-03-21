<script setup>
import { ref, reactive } from 'vue';
import { login } from '../../request/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const remember = ref(false)
const data = reactive({ userName: '', password: '' })
const userError = ref(false)
const pwdError = ref(false)

// 密码框的眼睛功能
const pwdEye = reactive({
  eyeShow: false, // 是否显示眼睛
  eyeFlag: false, // 显示哪只眼睛的标志位
  eyeClass: 'eyeClose',  // 显示眼睛的路径
  pwdType: 'password'// 切换type显示原文
})
// 切换眼睛睁开或者闭眼
const convertEye = () => {
  pwdEye.eyeFlag = !pwdEye.eyeFlag
  if (!pwdEye.eyeFlag) { // 如果现在是闭眼，就睁眼
    pwdEye.eyeClass = 'eyeOpen'
    pwdEye.pwdType = 'text'
  }
  else {
    pwdEye.eyeClass = 'eyeClose'
    pwdEye.pwdType = 'password'
  }
}

// 提交数据
const submit = () => {
  userError.value = false
  pwdError.value = false
  login(data).then((res) => {
    if (res.success) {
      if (remember.value === true) {
        localStorage.setItem('token', res.data.token)
      }
      router.push('/home')
    } else {
      if (res.data.message === 'user') {
        userError.value = true
      }
      else {
        pwdError.value = true
      }
    }

  })
}

</script>

<template>
  <div class="bg">
    <div class="login-box">
      <div class="section">
        <div class="header">
          <h4 class="title">欢迎来到企业人事管理系统</h4>
          <div class="sign-in">Sign in</div>
        </div>
        <div class="input-box">
          <div class="userName">
            <input id="userName" type="text" placeholder="用户名" v-model="data.userName">
            <span class="error" v-if="userError">账户不存在!</span>
          </div>
          <div class="password">
            <input id="password" :type="pwdEye.pwdType" placeholder="密码" v-model="data.password">
            <span class="error" v-if="pwdError">密码错误!</span>
            <div class="eye" @click="convertEye" :class="pwdEye.eyeClass"></div>
          </div>
        </div>
        <div class="operate">

          <label>
            <input type="checkbox" v-model="remember" id="remember">
            <span>记住我</span>
          </label>
          <button @click="submit">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@keyframes login {
  0% {
    background-color: rgba(168, 217, 115, 0.5);
  }

  20% {
    background-color: #e1e685;
  }

  40% {
    background-color: #85e696
  }

  60% {
    background-color: #85c7e6;
  }

  80% {
    background-color: #d585e6;
  }

  100% {
    background-color: rgba(168, 217, 115, 0.5);
  }
}

.bg {
  position: relative;
  height: 100vh;
  background: url('@/assets/images/background.png') no-repeat;
  background-size: cover;

  .login-box {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    width: 433px;
    height: 572px;
    padding: 63px 37px;
    // background: linear-gradient(135deg, rgba(133, 226, 230, 0.3) 10%, rgba(190, 201, 7, 0.7) 100%);
    background-color: #fff1;
    backdrop-filter: blur(5px);
    border-radius: 40px;
    border: 1px solid #fff1;

    .section {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      .header {
        text-shadow: 3px 3px 10px #fff;

        .title {
          line-height: 32px;
          font-size: 16px;
        }

        .sign-in {
          font-size: 36px;
          line-height: 53px;
        }
      }

      .input-box {
        .password {
          margin-top: 40px;
          position: relative;

          &:hover .eyeClose,
          &:hover .eyeOpen {
            display: block;
          }

          #password {
            padding-right: 35px;

            &::-ms-reveal {
              display: none;

            }
          }

          .eyeClose {
            background: url('@/assets/images/eye-close.svg') no-repeat center;
            display: none;
          }

          .eyeOpen {
            background: url('@/assets/images/eye-open.svg') no-repeat center;
            display: none;
          }

          .eye {
            position: absolute;
            top: 0;
            right: 0;
            width: 50px;
            height: 50px;
          }
        }

        input {
          width: 350px;
          height: 50px;
          border: 0;
          border-bottom: 2px #4285F4 solid;
          background-color: #fff1;
          outline-style: none;
          padding-left: 10px;
          font-size: 18px;

          &::placeholder {
            font-size: 16px;
            color: #333;
            font-weight: 500;
            text-shadow: 3px 3px 10px #fff;
          }
        }

        .userName,
        .password {
          position: relative;

          .error {
            position: absolute;
            left: 0;
            bottom: -30px;
            font-size: 16px;
            color: #ff575f;
            text-shadow: 0 0 20px #fff;
            background-color: #fff4;
          }
        }
      }

      .operate {
        display: flex;
        justify-content: space-between;
        align-items: center;

        label {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 80px;
          font-size: 18px;
          transition: .2s;


          &:hover {
            font-size: 22px;
            width: 90px;
          }

          span {
            color: #fff;
            text-shadow: 3px 3px 10px #000;
          }

          input {
            position: relative;
            width: 15px;
            height: 15px;
            vertical-align: middle;
            appearance: none;
            border: 1px solid #ffff;
            border-radius: 4px;
            background: none;
            overflow: hidden;
            padding: 0;

            &:checked {
              background-color: #9ad8f6;
            }

            &:checked::after {
              content: '';
              position: absolute;
              display: block;
              transform: rotate(45deg);
              bottom: 5px;
              left: -3px;
              width: 12px;
              height: 12px;
              border-bottom: #fff solid 2px;
              border-right: #fff solid 2px;
            }
          }
        }

        button {
          position: relative;
          margin-right: 9px;
          width: 177px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: aliceblue;
          border-radius: 10px;
          background: rgb(133, 226, 230);
          background: linear-gradient(119deg, rgba(133, 226, 230, 0.4) 11%, rgba(168, 217, 115, 0.5) 100%);
          border: none;
          transition: transform .35s;

          &:hover {

            transform: translateY(-3px);
            box-shadow: 0 5px 10px #0005;
            animation: login 5s linear infinite;
          }

          &:active {
            transition: .1s;
            transform: translateY(3px);
            box-shadow: 0 5px 10px #ffa;
            animation: login 5s linear infinite;
          }
        }
      }
    }
  }
}
</style>