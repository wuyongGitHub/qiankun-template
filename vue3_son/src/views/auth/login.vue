<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { isUsername, isPassword } from "@/utils/validate";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

const formRef = ref();

const state = reactive({
  loading: false,
  isRemember: true, // 是否记住密码
  loginData: {
    username: authStore.rememberData?.username,
    password: authStore.rememberData?.password,
  } as LoginData,
});

const { loading, isRemember, loginData } = { ...toRefs(state) };

/**
 * 校验用户名是否合法
 * @param rule
 * @param value
 * @param callback
 */
function checkUsername(rule: any, value: string, callback: Function) {
  if (!value) return callback(new Error("请输入有效帐号/手机号！"));
  if (!isUsername(value))
    return callback(new Error("输入的格式不正确，请重新输入！"));
  callback(); // 通过
}
/**
 * 校验密码是否合法
 */
function checkPassword(rule: any, value: string, callback: Function) {
  if (!value) return callback(new Error("请输入有效密码！"));
  if (!isPassword(value))
    return callback(new Error("密码输入错误，请重新输入！"));
  callback(); // 通过
}

// 提交登录
function submitForm() {
  // 如果在登录中，不允许重复登录
  if (state.loading) return;
  formRef.value?.validate(async (valid: boolean) => {
    if (!valid) return false;
    try {
      // 登录中
      state.loading = true;
      // 记住密码
      authStore.setRememberPwd(state.isRemember ? state.loginData : undefined);
      // 发送登录请求
      await authStore.userLogin(state.loginData);
      // 跳转来源地址
      router.replace({ path: <string>route.query?.redirect || "/" });
    } catch (error) {
    } finally {
    }
  });
}
</script>

<template>
  <div class="login-container">
    <div class="login-wrap">
      <img class="lagin-logo" src="@/assets/logo-01.png" />
      <div class="login-title">帐号登录</div>
      <el-form class="login-form" ref="formRef" :model="loginData" size="large">
        <el-form-item
          prop="username"
          :rules="{ required: true, validator: checkUsername, trigger: 'blur' }"
        >
          <el-input
            v-model="loginData.username"
            placeholder="请输入帐号/手机号"
            maxlength="30"
            prefix-icon="ele-User"
            clearable
          />
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="{ required: true, validator: checkPassword, trigger: 'blur' }"
        >
          <el-input
            v-model="loginData.password"
            type="password"
            placeholder="请输入密码"
            maxlength="30"
            prefix-icon="ele-Unlock"
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item>
          <div class="login-other">
            <el-checkbox v-model="isRemember">
              <span>记住密码</span>
            </el-checkbox>
          </div>
          <el-button
            class="login-submit"
            @click="submitForm()"
            :loading="loading"
            type="primary"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  background-image: url("@/assets/loginBj.png");
  background-size: cover;
  overflow: hidden;
  display: flex;
  align-items: center;
  // justify-content: center;
  .login-wrap {
    width: 410px;
    height: 460px;
    background-color: #fff;
    padding: 30px;
    margin: auto;
    margin-right: 130px;
    box-shadow: #74747462 0 2px 15px;
    border-radius: 10px;
    .lagin-logo {
      max-width: 130px;
      margin: auto;
      display: flex;
    }
    .login-title {
      font-size: 20px;
      height: 70px;
      line-height: 70px;
      font-weight: 500;
      text-align: left;
      color: #0d1234;
      letter-spacing: 2px;
    }
    .login-form {
      .el-form-item {
        margin-bottom: 27px;
      }
      .login-other {
        span {
          font-size: 13px;
          font-weight: 500;
          color: #999;
        }
      }
      .login-submit {
        width: 100%;
        height: 40px;
        letter-spacing: 3px;
        font-weight: 500;
      }
    }
  }
}
</style>