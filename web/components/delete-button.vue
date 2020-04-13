<template>
  <div class="del-button-container">
    <el-popover ref="myPopover" placement="left" v-model="visible">
      <p style="text-align: center">Are you sure?</p>
      <div style="text-align: center; margin: 0">
        <el-button size="mini" type="text" @click="onCancel()">
          Cancel
        </el-button>
        <el-button size="mini" type="text" @click="onConfirm()" class="del-button">
          Yes
        </el-button>
      </div>
    </el-popover>
    <el-tooltip class="item" effect="dark" content="Delete" placement="top" :enterable="false">
      <el-button v-popover:myPopover icon="el-icon-fa-trash-o" size="mini" type="danger"></el-button>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({
  notifications: {
    deleteSuccess: {
      icon: 'fas fa-exclamation-triangle',
      position: 'bottomLeft',
      title: 'Delete',
      toastOnce: true,
      type: 'success'
    }
  }
})
export default class DeleteButton extends Vue {
  @Prop() id: number;
  @Prop() store: string;

  visible: boolean = false;
  deleteSuccess: ({ message: string }) => void;

  onCancel() { this.visible = false; }

  async onConfirm() {
    this.visible = false;

    await this.$store.dispatch(`${this.store}/delete`, {
        id: this.id
      });

    this.deleteSuccess({message: 'OK'});
  }
}
</script>

<style scoped>
.del-button-container {
  display: inline-block;
}
.del-button {
  color: #f56c6c;
}
.el-button-group .el-button:last-child {
  border-radius: 3px;
}
</style>
