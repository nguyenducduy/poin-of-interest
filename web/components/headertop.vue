<template>
  <div class="header el-col-24">
    <!-- <div class="el-search el-col-20">
      <div class="box-search">
        <input type="text" class="searchTerm" placeholder="Search...">
          <button type="submit" class="searchButton">
            <i class="el-icon-search"></i>
        </button>
      </div>
    </div> -->
  <div class="el-account el-col-4"></div>
      <div class="avatar-container" tabindex="0">
        <el-dropdown>
          <div class="avatar-wrapper">
            <img src="img/userlogin.png" width="30" height="30" class="user-avatar">
            <span class="user-name"> My Account </span><i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Change Password</el-dropdown-item>
            <el-dropdown-item>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>

</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class HeaderTop extends Vue {

}
</script>

<style lang="scss" scoped>

.header {
  padding: 20px;
  position: relative;
  z-index: 1;
  box-shadow: 4px 0 8px rgba(154, 158, 175, 0.68);
  -webkit-box-shadow: 4px 0 8px rgba(154, 158, 175, 0.68);
  -moz-box-shadow: 4px 0 8px rgba(154, 158, 175, 0.68);
  margin-bottom: 20px;
}
  .box-search {
    position: relative;
    width: 50%;
    margin: 0 auto;
    input{
      position: relative;
      width: 100%;
      box-sizing: border-box;
      font-size: 14px;
      background: 0 0;
      border: 1px solid #ddd;
      padding-left: 14px;
      padding-right: 36px;
      height: 32px;        
      border-radius: 16px;
      color: #666;
      opacity: .5;
      &:focus, &:active {
        outline: none;
        border-color: #38B7EA;
      }
    }
    button {
      position: absolute;
      right: 10px;
      top: 5px;
      border: 0;
      font-size: 15px;
      color: #666;
      background: transparent;
      z-index: 10;
      cursor: pointer;
      &:focus, &:active {
        outline: none;
      }
    }
  }

  .avatar-container {
    float: right;
    &:focus  {
    outline: none;
    }
  }

  .avatar-wrapper
  {
    display: -webkit-flex;
    display: flex;
    cursor: pointer;
    .user-name
    {
      margin: 0 6px;
      line-height: 30px;
    }
    .el-icon-caret-bottom {
      line-height: 30px;
    }
  }
</style>


