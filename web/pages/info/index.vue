<template>
  <el-row class="main-content page-info">
    <header-top></header-top>
    <el-row>
      <el-col :md="12" class="left-head">
        <filter-bar></filter-bar>
      </el-col>
      <el-col :md="12" class="right-head">
        <import-button></import-button>
        <pagination :totalItems="totalItems" :currentPage="query.page" :recordPerPage="recordPerPage"></pagination>
      </el-col>
    </el-row>
    <el-col :md="24">
      <div class="panel-body">
        <info-items :infos="infos"></info-items>
      </div>
      <div class="pagination-bottom">
        <pagination :totalItems="totalItems" :currentPage="query.page" :recordPerPage="recordPerPage"></pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { Action, State } from 'vuex-class';
import Pagination from '~/components/pagination.vue';
import InfoItems from '~/components/info/items.vue';
import ImportButton from '~/components/info/import.vue';
import HeaderTop from '~/components/headertop.vue';
import FilterBar from '~/components/info/filter.vue';
const querystring = require('querystring');

@Component({
  layout: 'main',
  middleware: ['authenticated'],
  components: {
    HeaderTop,
    Pagination,
    InfoItems,
    ImportButton,
    FilterBar
  }
})
export default class PoiInfoPage extends Vue {
  @Action('infos/get_all') listAction;
  @Action('entities/get_all') listEntitiesAction;
  @Action('regions/get_trees') getTreesAction;

  @State(state => state.infos.data) infos;
  @State(state => state.infos.totalItems) totalItems;
  @State(state => state.infos.recordPerPage) recordPerPage;
  @State(state => state.infos.query) query;
  @Watch('$route')
  onPageChange() { this.initData() }

  onReset() { return this.$router.push('/info'); }

  head() {
    return {
      title: 'Information',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Information'
        }
      ]
    };
  }

  created() { this.initData(); }

  async initData() {
    await this.listAction({ query: this.$route.query })
    await this.listEntitiesAction({ query: {
      limit: 300
    } })
    await this.getTreesAction();
  }
}
</script>

<style lang="scss">
// change some style
.left-head {
  padding-left: 5px;
  .panelbody-box-search {
    width: 280px !important;
  }
}
.right-head {
  text-align: right;
  padding-right: 5px !important;
}


.page-info {
  .el-select-dropdown__wrap {
    max-height: none;
    padding: 15px 0 30px 0;
    overflow: hidden;
    .el-select-dropdown__list {
      height: auto;
      max-height: 274px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
  .header-right > div {
    display: inline-block;
    .el-upload__tip {
      display: inline-block;
    }
  }
  .el-table thead.is-group th {
    padding: 0;
    line-height: 40px;
    font-weight: normal;
    font-size: 13px;
  }
  .el-table .el-table__row  td {
    padding: 0;
  }
  .el-table .el-table__row  td.is-center{
    // vertical-align: top;
    // padding-top: 10px;
  }
  .el-select .el-input__inner {
    border: 0;
    background-color: transparent;
    font-size: 12px;
  }
  .address-content {
    .el-collapse {
      border: 0;
      padding-bottom: 10px;
    }
    .el-collapse-item__header {
      border: 0;
      background-color: transparent;
      color: #409EFF;
      font-weight: bold;
      font-size: 13px;
      padding: 8px 0 0;
      height: auto;
      line-height: 25px;
      position: relative;
      .el-collapse-item__arrow {
        line-height: inherit;
      }
      .full-address {
        line-height: 15px;
        color: #303133;
        font-weight: normal;
        padding-right: 20px;
        margin-top: 0;
      }
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
    .el-collapse-item__wrap {
      background-color: transparent;
      border: 0;
    }
  }
  .address-content .el-collapse-item.is-active + .el-table .el-table__row  td.is-center {
    vertical-align: top;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: rgba(0, 119, 243, 0.04);
  }
}

</style>
