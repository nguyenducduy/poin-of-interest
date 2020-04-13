<template>
  <el-popover
    :key="id"
    placement="left-start"
    trigger="click"
    v-model="visible"
    width="500">
    <el-row>
      <el-col :span="20">
        <el-input
          type="textarea"
          placeholder="Write something"
          :autosize="{ minRows: 2 }"
          v-model="note">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button
          type="primary"
          size="small"
          class="add-button"
          @click="onAdd()"
          :loading="addLoading">
          Add
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table v-loading.lock="loading" :data="notes" width="100%" class="note-table">
        <el-table-column :label="'Notes (' + notes.length + ')'">
          <template slot-scope="scope">
            <p class="note-text">{{ scope.row.text }}</p>
            <small class="note-date">{{ scope.row.dateCreated.readable }}</small>
          </template>
        </el-table-column>
        <el-table-column width="50">
          <template slot-scope="scope">
            <el-button
              :loading="deleteLoading"
              type="text"
              icon="el-icon-fa-trash"
              class="note-del-button"
              @click="onDelete(scope.row.id)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-button
      slot="reference" @click="onShow()"
      :icon="!visible ? 'el-icon-fa-book' : 'el-icon-fa-times'"
      circle
      size="mini"
      :type="hasNote ? 'warning' : ''"
      :loading="localLoading"
      class="note-button">
    </el-button>
  </el-popover>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Action, State } from 'vuex-class';

@Component({
  notifications: {
    addSuccess: {
      icon: 'fas fa-check',
      position: 'bottomRight',
      title: 'Note',
      toastOnce: true,
      type: 'success'
    },
    deleteSuccess: {
      icon: 'fas fa-check',
      position: 'bottomRight',
      title: 'Note',
      toastOnce: true,
      type: 'success'
    }
  }
})
export default class Note extends Vue {
  @Prop() id: number; // poi info id
  @Prop() hasNote: boolean;
  @Action('notes/add') addNoteAction;
  @Action('notes/get_all') getNotesAction;
  @Action('notes/delete') deleteNoteAction;
  @State(state => state.notes.loading) loading;
  @State(state => state.notes.addLoading) addLoading;
  @State(state => state.notes.deleteLoading) deleteLoading;
  @State(state => state.notes.data) notes;

  localLoading: boolean = false;
  visible: boolean = false;
  note: string = '';

  addSuccess: ({ message: string, timeout: number }) => void;
  deleteSuccess: ({ message: string, timeout: number }) => void;

  async onShow() {
    this.visible = !this.visible;
    this.localLoading = true;
    await this.getNotesAction({ piid: this.id });
    this.localLoading = false;
  }

  async onAdd() {
    const errors = await this.addNoteAction({ value: {
      piid: this.id,
      text: this.note
    } });

    if (typeof errors === 'undefined') {
      this.note = '';
      this.addSuccess({
        message: 'Added',
        timeout: 1000
      })
    }
  }

  async onDelete(id) {
    const errors = await this.deleteNoteAction({ id: id });

    if (typeof errors === 'undefined') {
      this.deleteSuccess({
        message: 'Deleted',
        timeout: 1000
      })
    }
  }
}
</script>

<style lang="scss">
.note-button {
  display: inline;
  margin-left: 10px;
}
.add-button {
  margin: 10px 0 0 15px;
}
.note-text {
  margin-bottom: 5px;
  margin-top: 0;
}
.note-table .el-table__row td {
  border-bottom: none !important;
  padding: 3px 0px !important;
}
.note-date {
  color: #a2a2a2;
}
.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #ffff002e;
}
.note-del-button {
  color: #ff000070;
}
</style>
