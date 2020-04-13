<template>
  <div class="filter-container">
    <el-select v-model="form.poitype" filterable clearable placeholder="Filter by type" @change="onFilter()">
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.name"
        :value="item.id"
      >
        <span class="type-name">{{ item.name }}</span>
      </el-option>
    </el-select>
    <el-input size="small" placeholder="Search"
      style="width: 50%"
      v-model="form.q"
      @keyup.enter.native="onFilter"
      clearable
      @clear="onReset()">
      <template slot="append" @click="onFilter()"><i class="el-icon-search"></i></template>
    </el-input>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';
import { Action, State } from 'vuex-class';
import * as querystring from 'querystring';

@Component
export default class FilterBar extends Vue {
  @State(state => state.entities.data) options;
  @State(state => state.infos.query) query;

  loading: boolean = false;
  selected: any = null;
  form = {};

  onFilter() {
    this.query.page = 1;
    const pageUrl = `?${querystring.stringify(
        this.form
      )}&${querystring.stringify(this.query)}`;

    return this.$router.push(pageUrl);
  }

  onReset() {
    return this.$router.push('/info');
    }

  created() {
    this.form = {
      q: this.$route.query.q || '',
      poitype: this.$route.query.poitype || ''
    };
  }
}
</script>

<style>
.filter-container .el-select .el-input__inner {
  font-size: 20px;
}
</style>
