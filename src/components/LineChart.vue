<script>
import Vue from "vue";
import _ from "lodash";
import { Line } from "vue-chartjs";

Object.defineProperty(Vue.prototype, "$_", { value: _ });

export const LINE_CHART_OPTIONS = Object.freeze({
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: "white",
          beginAtZero: true
        },
        gridLines: {
          display: true
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: "white"
        }
      }
    ]
  },
  legend: {
    labels: {
      display: true,
      fontColor: "white"
    }
  },
  responsive: true,
  maintainAspectRatio: false
});

export default {
  name: "LineChart",
  extends: Line,
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: ["Apples", "Bananas", "Citrus"],
          datasets: [
            {
              label: "Monthly Fruit Consumption(Default)",
              borderColor: "#FC2525",
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "white",
              data: [28, 46, 79]
            }
          ]
        };
      }
    },
    options: {
      type: Object,
      default: () => {
        return LINE_CHART_OPTIONS;
      }
    }
  },
  data() {
    return {
      chartDataOpts: {},
      gradient: null
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient.addColorStop(0, "rgba(255, 144, 170, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 144, 170, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 144, 170, 0)");

    this.applyDatasetGradient();

    this.renderChart(this.chartDataOpts, this.options);
  },

  methods: {
    applyDatasetGradient() {
      // for test purposes, assuming 1 dataset
      if (
        this.$_.isEmpty(this.chartData.datasets) ||
        this.chartData.datasets.length > 1
      ) {
        return;
      }

      const dataset = this.$_.first(this.chartData.datasets);

      this.chartDataOpts = {
        ...this.chartData,
        datasets: [
          {
            ...dataset,
            backgroundColor: this.gradient
          }
        ]
      };
    }
  }
};
</script>
