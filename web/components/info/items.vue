<template>
  <section>
    <el-table :data="infos" style="width: 100%" row-key="id" v-loading.fullscreen.lock="loading">
      <el-table-column label="Name" width="450">
        <template slot-scope="scope">
          <div class="address-content">
            <hover-item :item="scope.row"></hover-item>
            <span class="title">
              {{ scope.row.name }}
            </span>
            <p class="website-phone">
              <span v-if="scope.row.website.length > 0" class="website">
                <i class="el-icon-fa-globe"></i>
                <small>{{ scope.row.website }}</small>
              </span>
              <span v-if="scope.row.phoneNumber.length > 0" class="phone">
                <i class="el-icon-fa-phone"></i>
                <small>{{ scope.row.phoneNumber }}</small>
              </span>
            </p>
            <p class="full-address">
              <i class="el-icon-fa-google text-danger"></i>
              <small>{{ scope.row.ggFullAddress }}</small>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Publish?" align="center" width="70">
        <template slot-scope="scope">
          <publish-button :id="scope.row.id" :status="scope.row.status"></publish-button>
        </template>
      </el-table-column>
      <el-table-column label="Type" align="center" width="170">
        <template slot-scope="scope">
          <select-type :currentType="scope.row.type" :info="scope.row"></select-type>
        </template>
      </el-table-column>
      <el-table-column label="Number" align="center">
        <template slot-scope="scope">
          <small v-if="scope.row.number.length > 0">{{ scope.row.number }}</small>
          <div v-else>
            <i class="el-icon-fa-times text-danger"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Street" align="center">
        <template slot-scope="scope">
          <small v-if="scope.row.street.length > 0">{{ scope.row.street }}</small>
          <div v-else>
            <i class="el-icon-fa-times text-danger"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Region" align="center">
        <el-table-column label="Ward" width="150" align="center">
          <template slot-scope="scope">
            <small v-if="scope.row.ward !== null">{{ scope.row.ward.name }}</small>
            <div v-else>
              <i class="el-icon-fa-times text-danger"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="District" width="150" align="center">
          <template slot-scope="scope">
            <small v-if="scope.row.district !== null">{{ scope.row.district.name }}</small>
            <div v-else>
              <i class="el-icon-fa-times text-danger"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="City" width="150" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <small v-if="scope.row.city !== null">{{ scope.row.city.name }}</small>
            <div v-else>
              <i class="el-icon-fa-times text-danger"></i>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="90">
        <template slot-scope="scope">
          <edit-form :itemId="scope.row.id" style="display: inline;"></edit-form>
          <note
            :id="scope.row.id"
            :hasNote="scope.row.notes.length > 0">
          </note>
        </template>
      </el-table-column>
    </el-table>
    <no-ssr>
      <scroll-top :duration="1000" :timing="'ease'"></scroll-top>
    </no-ssr>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { State } from 'vuex-class';
import DeleteButton from '~/components/delete-button.vue';
import SelectType from '~/components/info/select-type.vue';
import PublishButton from '~/components/info/publish-button.vue';
import EditForm from '~/components/info/edit-form.vue';
import HoverItem from '~/components/info/hover-item.vue';
import Note from '~/components/info/note.vue';

@Component({
  components: {
    DeleteButton,
    SelectType,
    PublishButton,
    EditForm,
    HoverItem,
    Note
  }
})
export default class InfoItems extends Vue {
  @Prop() infos: any[];
  @State(state => state.infos.loading) loading;

  itemId: number = 0;
}
</script>

<style lang="scss" scoped>
.similar-item {
  margin-right: 6px;
  margin-bottom: 6px;
  color: #333;
  background-color: rgba(142, 243, 93, 0.1);
  font-size: 12px;
}
.address-content {
  margin-top: 5px;
  p {
    margin-top: 3px;
    margin-bottom: 3px;
    .website-phone {
      font-size: 11px;
    }
  }
}
.text-primary {
  color: #0984e3;
}
.text-danger {
  color: red;
}
.title {
  color: #0984e3;
  font-weight: 600;
  margin-right: 5px;
}
.website,
.phone {
  margin-right: 15px;
  font-weight: 300;
}
.el-icon-fa-globe,
.el-icon-fa-phone,
.el-icon-fa-google {
  font-size: 12px !important;
  margin-right: 3px;
}
</style>
