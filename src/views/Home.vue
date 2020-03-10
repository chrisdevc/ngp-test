<template>
  <div class="home">
    <div v-if="chartData">
      <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[20, 20]"
        :use-css-transforms="true">
          <grid-item v-for="item in layout"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :key="item.i">
              <md-card class="md-primary" md-theme="transparent-card">
               <md-card-content>
                <line-chart :chartData="chartData"></line-chart>
               </md-card-content>
              </md-card>
        </grid-item>
      </grid-layout>
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script>
import { map, filter } from "rxjs/operators";
import VueGridLayout from "vue-grid-layout";
import injector from "vue-inject";

import LineChart from "@/components/LineChart.vue";
import { BitcoinService } from "../services/bitcoin.service.ts";

injector.service("bitcoinService", BitcoinService);

export default {
  dependencies: ["bitcoinService"],
  name: "Home",
  components: {
    LineChart,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },

  created() {
    this.getData().subscribe(data => this.chartData = data)
  },

  data() {
    return {
      chartData: null,
      layout: [
        { x: 0, y: 0, w: 12, h: 10, i: '0' },
        { x: 0, y: 1, w: 6, h: 10, i: '1' },
        { x: 6, y: 1, w: 6, h: 10, i: '2' }
      ],
    };
  },

  methods: {
    getData() {
      return this.bitcoinService
        .getData$()
        .pipe(
          filter(data => !!data.data.bpi),
          map(data => data.data.bpi),
          map(bpi => {
            const dates = Object.keys(bpi);
            const bpiData = Object.values(bpi);
            const datasetOpt = {
              borderColor: "rgba(255, 144, 170, 1)",
              pointBorderColor: "transparent",
              pointBackgroundColor: "transparent"
            };
            const data = {
              labels: dates,
              datasets: [{ label: "BPI", data: bpiData, ...datasetOpt }]
            }
            return data;
          })
        )
      }
    }
};
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";

  @include md-register-theme("transparent-card", (
    primary: rgba(255, 255, 255, 0.1),
  ));

  @import "~vue-material/dist/components/MdCard/theme";

  .md-card {
    height: 100%;
    z-index: 0;
  }
</style>