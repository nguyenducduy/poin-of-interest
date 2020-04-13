<template>
  <section>
    <el-table :data="entities" style="width: 100%" row-key="id" v-loading.fullscreen.lock="loading">
      <el-table-column label="Name" width="250"
        :show-overflow-tooltip="true" :default-sort = "{ order: 'descending' }" >
        <template slot-scope="scope">
          <strong>{{ scope.row.name }}</strong>
        </template>
      </el-table-column>
      <el-table-column label="OLLI Similar">
        <template slot-scope="scope">
          <el-tag
            v-for="(item, key) in scope.row.similar"
            v-if="item.length > 0"
            :key="key"
            closable
            class="similar-item"
            type="success"
            @close="onRemove(scope.row.id, item)">
            {{ item }}
          </el-tag>
          <add-tag-button :id="scope.row.id"></add-tag-button>
        </template>
      </el-table-column>
      <el-table-column label="GG Similar">
        <template slot-scope="scope">
          <el-tag
            v-for="(item, key) in scope.row.ggSimilar"
            v-if="item.length > 0"
            :key="key"
            closable
            class="similar-item gg"
            type="warning"
            @close="onRemoveGg(scope.row.id, item)">
            {{ item }}
          </el-tag>
          <add-gg-button :id="scope.row.id"></add-gg-button>
        </template>
      </el-table-column>

      <el-table-column width="70">
        <template slot-scope="scope">
          <el-button-group>
            <!-- <el-tooltip class="item" effect="dark" content="Erase similar" placement="top" :enterable="false">
              <el-button icon="el-icon-fa-eraser" size="mini"></el-button>
            </el-tooltip> -->
            <delete-button :id="scope.row.id" store="entities"></delete-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <no-ssr>
      <scroll-top :duration="1000" :timing="'ease'"></scroll-top>
    </no-ssr>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Action, State } from 'vuex-class';
import DeleteButton from "~/components/delete-button.vue";
import AddTagButton from "~/components/entity/addtag-button.vue";
import AddGgButton from "~/components/entity/addgg-button.vue";

@Component({
  components: {
    DeleteButton,
    AddTagButton,
    AddGgButton
  }
})
export default class AdminUserItems extends Vue {
  @Prop() entities: any[];
  @Action('entities/remove_similar_item') removeSimilarItemAction;
  @Action('entities/remove_gg_similar_item') removeGgSimilarItemAction;
  @State(state => state.entities.loading) loading;

  async onRemove(id, item) {
    await this.removeSimilarItemAction({
      id: id,
      similarItem: item
    });

    return;
  }

  async onRemoveGg(id, item) {
    await this.removeGgSimilarItemAction({
      id: id,
      similarItem: item
    });

    return;
  }
}
</script>

<style lang="scss" scoped>
  .similar-item {
    margin-right: 6px;
    margin-bottom: 6px;
    color: #333;
    background-color: rgba(142, 243, 93, 0.1);

    &.gg {
      background-color: #fff8db;
    }
  }
</style>
