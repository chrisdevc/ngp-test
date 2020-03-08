<template>
  <div class="home">
    <div v-if="chartData">
      <line-chart :chartData="chartData"></line-chart>
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script>
import { map, filter } from "rxjs/operators";
import injector from "vue-inject";

import LineChart from "@/components/LineChart.vue";
import { BitcoinService } from "../services/bitcoin.service.ts";

injector.service("bitcoinService", BitcoinService);

export default {
  dependencies: ["bitcoinService"],
  name: "Home",
  components: {
    LineChart
  },

  created() {
    this.getData().subscribe(data => this.chartData = data)
  },

  data() {
    return {
      chartData: null,
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
              backgroundColor: "transparent",
              borderColor: "rgba(0, 0, 0, 0.50)",
              pointBackgroundColor: "rgba(255, 188, 188, 1)"
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
