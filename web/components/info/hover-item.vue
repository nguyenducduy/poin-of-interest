<template>
  <div class="hover-container" @mouseover="onShow" @mouseleave="onHide">
    <el-button-group>
      <el-button plain size="mini" v-show="isShow" icon="el-icon-fa-clipboard"
        v-clipboard:copy="item.ggFullAddress" class="my-hover-button">
        Address
      </el-button>
      <el-button plain size="mini" v-show="isShow" icon="el-icon-fa-clipboard"
        v-clipboard:copy="item.name">
        Name
      </el-button>
      <el-button plain size="mini" v-show="isShow" icon="el-icon-fa-clipboard"
        v-clipboard:copy="item.name + ' ' + item.ggFullAddress">
        Both
      </el-button>
    </el-button-group>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class HoverItem extends Vue {
  @Prop() item;

  isShow: boolean = false;

  cbCopied: ({ message: string, timeout: number }) => void;

  onShow() {
    this.isShow = true;
  }

  onHide() {
    this.isShow = false;
  }
}
</script>

<style lang="scss" scoped>
.hover-container {
  position: absolute;
  right: 0;
  z-index: 100;
  margin-right: 5px;
  margin-left: 5px;
  width: 70%;
  background: transparent;
  height: 50px;
  text-align: right;

  .my-hover-button {
    color: #2d3436;
  }
}
</style>
