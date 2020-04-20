<lang src="./lang.yml"></lang>

<template>
  <section class="login-container">
     <div class="page-content">
      <div class="panel">
        <div class="panel-body">
          <div class="brand">
            <img class="brand-img" src="/img/logo.png" width="100">
            <h1 class="brand-text font-size-18">Point Of Interest</h1>
          </div>
          <el-form autoComplete="on" label-position="left" label-width="0px" class="login-form" :model="loginForm" ref="loginForm">
            <el-form-item prop="email" :rules="[
              { required: true, message: 'Email is required', trigger: 'blur' },
              { type: 'email', message: 'Email invalid', trigger: 'blur,change' }
            ]">
              <el-input
                tabindex="1"
                prefix-icon="el-icon-fa-envelope"
                name="email"
                type="text"
                autoComplete="on"
                placeholder="Email"
                v-model.trim="loginForm.email"
                autofocus />
              </el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="[
                { required: true, message: 'Password is required', trigger: 'blur' }
            ]">
              <el-input
                tabindex="2"
                prefix-icon="el-icon-fa-key"
                name="password"
                type="password"
                placeholder="Password"
                v-model="loginForm.password"
                @keyup.enter.native="handleLogin" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                Login
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'nuxt-property-decorator';
import { Action } from 'vuex-class';

@Component({
  notifications: {
    loginError: {
      icon: 'fas fa-exclamation-triangle',
      position: 'bottomCenter',
      title: 'Login failed',
      toastOnce: true,
      type: 'error'
    }
  }
})
export default class AdminLoginPage extends Vue {
  loading: boolean = false;
  loginForm: any = {
    email: 'admin@mksoftware.com',
    password: '1'
  };

  $refs: {
    loginForm: HTMLFormElement
  }

  loginError: ({ message: string }) => void;

  @Action('users/login_by_username') loginAction;

  head() {
    return {
      title: 'POI',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'POI'
        }
      ]
    };
  }

  handleLogin() {
    this.$refs.loginForm.validate(async valid => {
      if (valid) {
        this.loading = true;
        const errors = await this.loginAction(this.loginForm);
        this.loading = false;

        if (typeof errors !== 'undefined') {
          errors.map(err => {
            this.loginError({message: err.message});
          })
          return;
        }

        let redirectUrl = '/';
        if (typeof this.$route.query.redirect !== 'undefined') {
          redirectUrl = Buffer.from((this as any).$route.query.redirect, 'base64').toString('ascii');
        }

        return this.$router.push({
          path: redirectUrl
        });
      } else {
        return false;
      }
    })
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/_reset';
@import '../../assets/scss/_vars';
@import '../../assets/scss/_mixins';

html, body {
  font-family: $base-font-family;

  .login-container {
    width: 100%;
    height: 100vh;
    font-weight: 100;
    background-image: linear-gradient(to right bottom, #222f3e, #2f3c4b, #3c4958, #495766, #576574);
    background-repeat: repeat-x;
    background-position: center top;
    -webkit-background-size: cover;
    background-size: cover;

    .page-content {
      @include vertical-align();
      padding: 30px;
      text-align: center;

      .panel {
        width: 400px;
        margin-bottom: 45px;
        background: #fff;
        border-radius: 4px;
        display: inline-block;
        vertical-align: middle;

        .panel-body {
          padding: 50px 40px 40px;
          margin-left: 0 !important;
          min-height: 100%;
          max-height: 100%;

          .brand-text {
            font-size: 18px!important;
            font-weight: 400;
            text-shadow: rgba(0,0,0,.15) 0 0 1px;
          }
          .login-form {
            margin: 45px 0 30px;

            .el-form-item {
              margin-bottom: 22px;
            }

            .forgot-password-button {
              color: $base-font-color;
            }
          }
        }
      }
    }
  }
}
</style>
