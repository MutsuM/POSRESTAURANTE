import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from '../../../core/config/apexCharts';
import { StatisticsService } from 'src/app/core/services/Statistics.service';


@Component({
  selector: 'app-apex-charts',
  templateUrl: './apex-charts.component.html',
  styleUrls: ['./apex-charts.component.css']
})
export class ApexChartsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | any;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  public chartOptions: Partial<ChartOptions> | any;

  public loading = false;

  constructor(
    private statisticsService: StatisticsService,
  ) { }

  ngOnInit(): void {
  }

  getCharts(series: [], categories: [], routeLink?: any) {
    this.chartOptions = {
      series,
      annotations: {
        points: [
          {
            x: "Bananas",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0"
              },
              text: "Bananas are good"
            }
          }
        ]
      },
      chart: {
        height: 350,
        type: "bar",
        events: {
          dataPointSelection: (event: any, chartContext: any, { dataPointIndex, seriesIndex }: any) => {
            this.onClick.emit({ dataPointIndex, seriesIndex });
          }
        }
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"]
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        categories,
        tickPlacement: "on"
      },
      yaxis: {
        title: {
          text: "TOTAL"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        }
      }
    };
    this.loading = true;
  };
}


