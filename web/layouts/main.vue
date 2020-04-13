<template>
  <div>
    <!-- <el-row class="header">
      <el-col :span="24">
        <navigation></navigation>
      </el-col>
    </el-row> -->
    <el-row class="container">
      <sidebar></sidebar>
      <el-col :span="24" class="wrapper-content">
        <nuxt></nuxt>
        <footer-bottom></footer-bottom>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Sidebar  from '~/components/sidebar.vue'
import FooterBottom from "~/components/footerbottom.vue";

@Component({
  components: {
    Sidebar,
    FooterBottom
  }
})
export default class MainLayout extends Vue {}
</script>

<style lang="scss">
@import '../assets/scss/_reset';

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Lato, Helvetica, sans-serif;
  color: #333447;
  line-height: 1.6em;
  font-weight: 500;
  font-size: 0.95rem;
}

.container.el-row {
    display: flex;
    display: -webkit-flex;
    overflow: hidden;
  }
  .panel-body {
    padding: 20px;
    min-height: 100vh;
    max-height: 100%;
    background: #fff;

    .no-content {
      display: block;
      position: fixed;
      top: 50%;
      left: 50%;
      color: #8f8f8f;
      text-align: center;
      i {
        &:before {
          font-size: 80px;
        }
      }
    }

  }
  .panelbody-box-search {
  position: relative;
  margin-top: 5px;
  margin-left: 20px;
  input {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    font-size: 13px;
    background: 0 0;
    border: 1px solid #ddd;
    padding-right: 14px;
    padding-left: 36px;
    height: 25px;
    line-height: 25px;
    border-radius: 0;
    color: #666;
    border-radius: 0;
    opacity: 0.5;
    &:focus,
    &:active {
      outline: none;
      border-color: #38b7ea;
    }
  }
  .el-input-group__prepend {
    position: absolute;
    left: 10px;
    top: 7px;
    border: 0;
    font-size: 15px;
    color: #666;
    background: transparent;
    z-index: 10;
    padding: 0;
    cursor: pointer;
    &:focus,
    &:active {
      outline: none;
    }
  }
}

.el-limit-filter {
  display: inline-block;
  .el-select .el-input {
    width: 50px;
    border-radius: 0;
    margin-right: 5px;
    input {
      border-radius: 0;
      border: 0;
      height: 26px;
      font-size: 13px;
      padding-right: 21px;
      background: #dddddd7d;
      padding-left: 5px;
      text-align: center;
    }
    .el-input__icon {
      line-height: 26px;
      font-size: 11px;
      width: 19px;
      color: #000;
    }
  }
  span {
    font-size: 12px;
    color: #9a9898;
  }
}
.pagination-bottom {
  margin-bottom: 50px;
  text-align: right;
}

.el-table .cell
{
  word-break: normal;
}
.el-footer {
  background-color: rgba(0, 161, 255, 0.03);
  color: rgba(0, 0, 0, 0.58824);
  text-align: right;
  .copyright {
    line-height: 40px;
  }
}

</style>
