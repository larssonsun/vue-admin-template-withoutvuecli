<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container svg-container-user">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye-close' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">test username: "larsson"</span>
        <span>password: any</span>
      </div>
    </el-form>
  </div>
</template>
<script>
import { validUsername } from "@/utils/validate";
export default {
  name: "com-login",
  data() {
    const validateUsername = (rule, value, callback) => {
      callback(
        !validUsername(value) ? new Error("请输入正确的用户名") : undefined
      );
    };
    const validatePassword = (rule, value, callback) => {
      callback(value.length < 1 ? new Error("请输入密码") : undefined);
    };
    return {
      loginForm: {
        username: "larsson",
        password: "123"
      },
      loginRules: {
        username: [
          // 这里username与el-form-item中的prop的值对应
          // larsson：这里required属性因为validator的关系而没有啥用处
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        // &&：从左往右依次判断，当当前值为true则继续，为false则返回此值（返回未转换为布尔值时的原值）
        // || ： 从左往右依次判断，当当前值为false则继续，为true则返回此值（返回未转换为布尔值时的原值）
        // larsson：所以下面这句的意思就是当route.query不是undefined的时候再看.redirect是不是有值。防止抛错吧
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      this.passwordType = this.passwordType == "password" ? "" : "password";
      // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
      // larsson：这里直接focus是没有效果的。$nextTick的作用是等待DOM更新完成
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.loading = true;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/todo" });
            })
            .catch(r => {
              console.log(r);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.loading = false;
    }
  }
};
</script>


<style lang="scss">
// larsson: 使用scoped属性后，对于当前组件下调用的其他组件，data属性只会添加到第一层HTML中，
// 对于我们想覆盖的样式则无法起到作用
// 所以单独开一个不使用scoped属性的style来放置覆盖样式

/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    .svg-icon {
      width: 1.5em;
      height: 1.5em;
      vertical-align: -0.3em;
    }
  }

  .svg-container-user {
    padding: 9px 7px 9px 7px;
    .svg-icon {
      width: 2.5em;
      height: 2.5em;
      vertical-align: -0.8em;
    }
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>


