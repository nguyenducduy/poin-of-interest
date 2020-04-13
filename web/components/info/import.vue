<template>
  <el-upload
    action=""
    multiple
    :auto-upload="false"
    with-credentials
    :file-list="myFiles"
    :on-change="onChange"
    :on-remove="onRemove"
    >
    <el-button slot="trigger" size="mini" type="primary">
      Select Octoparse files
    </el-button>
    <el-button v-show="myFiles.length > 0" :loading="loading" style="margin-left: 10px;" size="mini" icon="el-icon-fa-upload" type="success" @click="onUpload">
      Import
    </el-button>
  </el-upload>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { Action, State } from 'vuex-class';

@Component({
  notifications: {
    importSuccess: {
      icon: 'fas fa-check',
      position: 'bottomLeft',
      title: 'Upload success',
      toastOnce: true,
      type: 'success'
    }
  }
})
export default class ImportButton extends Vue {
  @Action('infos/import_octoparse') importAction;

  loading: boolean = false;
  myFiles: any[] = [];
  importSuccess: ({ message: string }) => void;

  onChange(file, filelist) {
    this.myFiles = filelist;
  }

  onRemove(file, filelist) {
    this.myFiles = filelist;
  }

  async onUpload() {
    try {
      this.loading = true;
      await this.importAction({ formData: this.myFiles });
      this.importSuccess({ message: 'File upload OK, ready in queue.' });
      this.myFiles = [];
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.myFiles = [];
    }
  }
}
</script>
