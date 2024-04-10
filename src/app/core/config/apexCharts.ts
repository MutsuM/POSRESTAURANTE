import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexAnnotations,
    ApexFill,
    ApexStroke,
    ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: any;
    annotations: ApexAnnotations;
    fill: ApexFill;
    stroke: ApexStroke;
    grid: ApexGrid;
};