<template>
    <el-aside class="el-col-1 wrapp-sidebar">
      <el-col :span="24">
        <nuxt-link to="/">
          <div class="logo"><img src="/img/logo-olli.png" width="40"></div>
        </nuxt-link>
      </el-col>
      <el-col :span="24">
        <el-menu expand-trigger="hover" unique-opened :default-active="$route.path" router :collapse="isCollapse">
          <template>
            <el-menu-item index="/" >
              <i class="el-icon-fa-braille"></i> <span>Types</span>
            </el-menu-item>
            <!-- <el-menu-item>
              <i class="el-icon-fa-bank"></i> Building
            </el-menu-item> -->
            <el-menu-item index="/info">
              <i class="el-icon-fa-map-marker"></i> <span>Infomation</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-aside>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class Sidebar extends Vue {
  isCollapse: boolean = true;
}
</script>

<style lang="scss" scoped>
.wrapp-sidebar {
  position: relative;
  z-index: 1;
  box-shadow: 0 0 20px rgba(154, 158, 175, 0.68);
  -moz-box-shadow: 0 0 20px rgba(154, 158, 175, 0.68);
  -webkit-box-shadow: 0 0 20px rgba(154, 158, 175, 0.68);
  width: 72px !important;
  overflow: visible;
  .logo {
    padding: 20px 15px;
  }
  .el-menu--collapse {
    width: auto;
  }
  .el-menu--collapse > .el-menu-item span,
  .el-menu--collapse > .el-submenu > .el-submenu__title span {
    width: auto;
    height: auto;
    visibility: visible;
  }
  .el-menu--collapse > .el-menu-item .el-submenu__icon-arrow{
    display: block;
  }

  .el-menu {
    border: 0;
    position: relative;
    z-index: 1;
    .el-menu-item
    {
      height: 30px;
      line-height: 30px;
      border-right: 2px solid transparent;
      color: #878d99;
      text-transform: uppercase;
      margin-bottom: 10px;
      font-size: 14px;
      padding: 0 10px !important;
      text-align: center;
      position: absolute;

      min-width: 100px;
      left: -28px;

      [class^="el-icon-"] {
        color: #c1b1c7;
        width: auto;
        padding-left: 30px;

        &:before {
          font-size: 25px;
        }
      }
      .el-icon-fa-map-marker {
        margin-top: -2px;
      }
      span {
        display: none;
      }
      &:nth-child(2) {
        top: 50px;
      }
      &.is-active {
        background: transparent;
        border-color: #409eff;
        color: #409eff;

      }
      &:hover {
        left: 0;
        background: #409eff;
        border-color: #409eff;
        color: #fff;
        transition: 0.3s ease-out;
        span {
          display: inline-block;
        }
        [class^="el-icon-"] {
          padding-left: 0;
          padding-right: 10px;
          color: #fff;
          &:before {
            font-size: 16px;
          }
        }


      }
    }
  }
  .el-submenu.is-opened .el-icon-fa {

    border-color: #409eff;
    color: #409eff;

  }
  .el-menu--popup-right-start {
    margin-left: 0;
    .el-menu-item {
      text-transform: capitalize;
      font-size: 14px;
      &:hover {
        border-color: transparent;
      }
    }
  }
}

</style>
