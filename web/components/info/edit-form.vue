<template>
  <div>
    <el-button type="primary" size="mini" icon="el-icon-edit" @click="visible = true"  circle></el-button>
    <el-dialog
      ref="dialog"
      :visible.sync="visible"
      v-on:open="onOpen"
      v-on:close="onClose"
      top="0"
      close-on-press-escape
      lock-scroll
      width="35%">
      <template slot="title">
        <h3><i class="el-icon-fa-google"></i> {{ title }}</h3>
        <!-- <div class="map_mode">
          <el-radio-group v-model="mapMode" size="small" @change="onChangeMode()">
            <el-radio-button label="place">Place</el-radio-button>
            <el-radio-button label="street">Street</el-radio-button>
          </el-radio-group>
        </div> -->
      </template>
      <el-row :gutter="30">
        <!-- <el-col :md="16">
          <div class="intrinsic-container intrinsic-container-16x9">
            <iframe
              :src="frameUrl"
              allowfullscreen
              frameborder="0"
              style="border:0"
              ref="mapFrame"
            >
            </iframe>
          </div>
        </el-col> -->
        <el-col :md="24">
          <el-form autoComplete="on" label-position="left" :model="form" ref="editForm">
            <el-form-item label="Name">
              <el-input type="text" size="small" v-model="form.name"></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Number">
                  <el-input type="text" size="small" v-model="form.number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="Street">
                  <el-input type="text" size="small" v-model="form.street"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Phone">
                  <el-input type="text" size="small" v-model="form.phoneNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="Website">
                  <el-input type="text" size="small" v-model="form.website"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="City / District / Ward">
              <el-cascader
                placeholder="Try searching: Hà Nội, Quận 1, Thị xã Rạch Giá, Phường Đông Hồ, ..."
                :options="regions"
                filterable
                change-on-select
                :props="config"
                v-model="form.region"
                style="width: 100%"
              ></el-cascader>
            </el-form-item>
            <el-form-item style="margin-top: 30px">
              <el-button type="primary" :loading="loading" @click.native.prevent="onSubmit"> Update
              </el-button>
              <!-- <el-button @click="onReset">{{ $t('default.reset') }}</el-button> -->
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Action, State } from 'vuex-class';

@Component({
  notifications: {
    updateError: {
      icon: 'fas fa-exclamation-triangle',
      position: 'bottomLeft',
      title: 'Update',
      toastOnce: true,
      type: 'error'
    },
    updateSuccess: {
      icon: 'fas fa-check',
      position: 'bottomLeft',
      title: 'Update',
      toastOnce: true,
      type: 'success'
    }
  }
})
export default class EditForm extends Vue {
  @Prop() itemId: number;

  @Action('infos/get_one') getInfoAction;
  @Action('infos/update') updateInfoAction;
  @State(state => state.regions.data) regions;

  visible: boolean = false;
  mapMode: string = 'place';
  title: string = '';
  frameUrl: string = '';
  loading: boolean = false;
  form: any = {};
  config: object = {
    label: "name",
    value: "id",
    children: "children"
  }

  $refs: {
    editForm: HTMLFormElement,
    // mapFrame: HTMLFormElement
  }

  updateSuccess: ({ message: string, timeout: number }) => void;
  updateError: ({ message: string, timeout: number }) => void;

  // onChangeMode() {
  //   switch (this.mapMode) {
  //     case 'place':
  //       this.frameUrl = 'https://www.google.com/maps/embed/v1/place?key=' + process.env.GOOGLE_API_KEY
  //         + '&q=' + this.form.name + '&language=vi';
  //       break;
  //     case 'street':
  //       this.frameUrl = 'https://www.google.com/maps/embed/v1/streetview?key=' + process.env.GOOGLE_API_KEY
  //         + '&location=' + `${this.form.lat},${this.form.lng}` + '&language=vi';
  //       break;
  //   }

  //   // this.$refs.mapFrame.contentWindow.location.replace(this.frameUrl);
  // }

  async onOpen() {
    let region = [];
    const myPoiInfo = await this.getInfoAction({ id: this.itemId });
    if (myPoiInfo.city !== null) region.push(myPoiInfo.city.id);
    if (myPoiInfo.district !== null) region.push(myPoiInfo.district.id);
    if (myPoiInfo.ward !== null) region.push(myPoiInfo.ward.id);

    this.form = {
      name: myPoiInfo.name,
      number: myPoiInfo.number,
      street: myPoiInfo.street,
      phoneNumber: myPoiInfo.phoneNumber,
      website: myPoiInfo.website,
      lat: myPoiInfo.lat,
      lng: myPoiInfo.lng,
      region: region
    };

    // this.frameUrl = 'https://www.google.com/maps/embed/v1/place?key=' + process.env.GOOGLE_API_KEY
    //       + '&q=' + myPoiInfo.name + '&language=vi';
    this.title = myPoiInfo.ggFullAddress;
  }

  onClose() {
    this.mapMode = 'place';
    this.form = {};
    this.visible = false;
  }

  async onSubmit() {
    this.loading = true;

    const errors = await this.updateInfoAction({
      id: this.itemId,
      input: this.form
    });

    if (typeof errors !== 'undefined') {
      this.loading = false;
      errors.map(err => {
        this.updateError({
          message: err.message,
          timeout: 5000
        });
      })

      return;
    } else {
      this.loading = false;
      this.updateSuccess({
        message: `${this.form.name}`,
        timeout: 1000
      });
      this.visible = false;
    }
  }
}
</script>

<style scoped>
iframe {
  border: none;
}
.intrinsic-container {
  position: relative;
  height: 0;
  overflow: hidden;
  width: 100%;
  padding: 8px
}

/* 16x9 Aspect Ratio */
.intrinsic-container-16x9 {
  padding-bottom: 100%;
}

/* 4x3 Aspect Ratio */
.intrinsic-container-4x3 {
  padding-bottom: 100%;
}

.intrinsic-container iframe {
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
}
.el-icon-fa-google {
  color: red;
  font-size: 32px !important;
  margin-right: 10px;
}
.map_mode {
  float: right;
  position: absolute;
  right: 0;
  top: 50px;
  margin-right: 20px;
}
</style>
