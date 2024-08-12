//components/GeoChart.tsx

import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
} from "echarts/components";
import { MapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

import ReactECharts from "echarts-for-react";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer,
]);

const GeoChart = (result: any) => {
  const [option, setOption] = useState({});

  useEffect(() => {
    // console.log(result.data);
    echarts.registerMap("Victoria", result.data);
    const geoChartOptions = {
      title: {
        text: "Train Passenger Frequency Map",
        subtext:
          "Visualisation of passenger demand throughout victoria" +
            result.data._id || "Victoria",

        left: "right",
      },
      tooltip: {
        trigger: "item",
        showDelay: 0,
        transitionDuration: 0.2,
      },
      visualMap: {
        left: "right",
        min: -30000,
        max: 30000,
        inRange: {
          color: [
            "#313695",
            "#4575b4",
            "#74add1",
            "#abd9e9",
            "#e0f3f8",
            "#ffffbf",
            "#fee090",
            "#fdae61",
            "#f46d43",
            "#d73027",
            "#a50026",
          ],
        },
        text: ["Going To", "Coming From"],
        calculable: true,
      },
      toolbox: {
        show: true,
        left: "left",
        top: "top",
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: "Victoria Train Demand",
          type: "map",
          roam: true,
          map: "Victoria",
          emphasis: {
            label: {
              show: true,
            },
          },
          data: [
            { name: "Melbourne", value: 25000 },
            { name: "Murrindindi", value: -200 },
            { name: "Baw Baw", value: -200 },
            { name: "Port Phillip", value: 24000 },
            { name: "Pyrenees", value: -200 },
            { name: "Bass Coast", value: -200 },
            { name: "Queenscliffe", value: -200 },
            { name: "Wyndham", value: -200 },
            { name: "Mansfield", value: -200 },
            { name: "Swan Hill (RC)", value: -200 },
            { name: "Moreland", value: 12000 },
            { name: "Glen Eira", value: 13000 },
            { name: "Surf Coast", value: -200 },
            { name: "Glenelg", value: -200 },
            { name: "Moonee Valley", value: 9000 },
            { name: "Moyne", value: -200 },
            { name: "Central Goldfields", value: -200 },
            { name: "Casey", value: -200 },
            { name: "Yarra Ranges", value: -2000 },
            { name: "Mitchell", value: -200 },
            { name: "Mildura (RC)", value: -200 },
            { name: "Hobsons Bay", value: 500 },
            { name: "Greater Bendigo", value: -200 },
            { name: "Southern Grampians", value: -200 },
            { name: "Horsham (RC)", value: -200 },
            { name: "Buloke", value: -200 },
            { name: "Brimbank", value: -200 },
            { name: "Nillumbik", value: -200 },
            { name: "Benalla (RC)", value: -200 },
            { name: "Golden Plains", value: -200 },
            { name: "Moorabool", value: -200 },
            { name: "Colac-Otway", value: -200 },
            { name: "Stonnington", value: 18000 },
            { name: "Indigo", value: -200 },
            { name: "West Wimmera", value: -200 },
            { name: "Ballarat", value: -200 },
            { name: "Greater Geelong", value: -200 },
            { name: "Alpine", value: -200 },
            { name: "Boroondara", value: 18000 },
            { name: "East Gippsland", value: -200 },
            { name: "Mornington Peninsula", value: -200 },
            { name: "Darebin", value: 16000 },
            { name: "Campaspe", value: -200 },
            { name: "Mount Alexander", value: -200 },
            { name: "Corangamite", value: -200 },
            { name: "Northern Grampians", value: -200 },
            { name: "Maribyrnong", value: 5000 },
            { name: "Frankston", value: -200 },
            { name: "Whitehorse", value: -30000 },
            { name: "Melton", value: -200 },
            { name: "Gannawarra", value: -200 },
            { name: "Strathbogie", value: -200 },
            { name: "Knox", value: -2000 },
            { name: "Loddon", value: -200 },
            { name: "Yarriambiack", value: -200 },
            { name: "Whittlesea", value: -200 },
            { name: "Wangaratta (RC)", value: -200 },
            { name: "Yarra", value: 24000 },
            { name: "Banyule", value: 12000 },
            { name: "Bayside", value: 13000 },
            { name: "Monash", value: 5000 },
            { name: "Hume", value: -200 },
            { name: "Manningham", value: -4000 },
            { name: "Kingston (C) (Vic.)", value: -300 },
            { name: "Greater Dandenong", value: -200 },
            { name: "Cardinia", value: -200 },
            { name: "Maroondah", value: -3000 },
            { name: "Macedon Ranges", value: -200 },
            { name: "Hepburn", value: -200 },
          ],
        },
      ],
    };

    setOption(geoChartOptions);
  }, []);
  return <ReactECharts option={option} style={{ height: "100vh" }} />;
};

export default GeoChart;
