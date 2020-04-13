<template>
  <el-switch
    v-model="isPublish"
    active-color="#2ecc71"
    inactive-color="#bdc3c7"
    @change="onChange()">
  </el-switch>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator';
import { Action, State } from 'vuex-class';

@Component({
  // notifications: {
  //   importSuccess: {
  //     icon: 'fas fa-exclamation-triangle',
  //     position: 'bottomCenter',
  //     title: 'Upload success',
  //     toastOnce: true,
  //     type: 'success'
  //   }
  // }
})
export default class PublishButton extends Vue {
  @Prop() id: number;
  @Prop() status: number;
  @Action('infos/change_status') changeStatusAction;

  isPublish: boolean = false;

  onChange() {
    this.changeStatusAction({
      id: this.id,
      value: this.isPublish
    })
  }

  created() {
    switch (this.status) {
      case 1:
        this.isPublish = true;
        break;
      case 3:
        this.isPublish = false;
        break;
    }
  }
}

</script>
