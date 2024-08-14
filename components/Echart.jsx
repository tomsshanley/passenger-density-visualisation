import React, { useEffect } from "react";
import * as echarts from "echarts/core";
import {
  TimelineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
} from "echarts/components";
import { MapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TimelineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer,
]);

const PassengerDataVisualisation = (props) => {
  useEffect(() => {
    const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartDom);
    console.log(props);

    // echarts.registerMap("Victoria", props.geoJSONdata);
    const option = {
      baseOption: {
        timeline: {
          axisType: "category",
          autoPlay: true,
          playInterval: 1000,
          data: [
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
          ],
        },
        title: {
          subtext: "Passenger Density Visualisation",
        },
        tooltip: {},
        grid: {
          top: 80,
          bottom: 100,
        },
        series: [
          {
            name: "outbound",
            type: "map",
            map: "Victoria",
          },
        ],
      },
      options: [
        {
          title: { text: "Time: 00:00" },
          series: [
            {
              data: props.passengerData[0],
            },
          ],
        },
        {
          title: { text: "Time: 01:00" },
          series: [
            {
              data: props.passengerData[1],
            },
          ],
        },
        {
          title: { text: "Time: 02:00" },
          series: [
            {
              data: props.passengerData[2],
            },
          ],
        },
        {
          title: { text: "Time: 03:00" },
          series: [
            {
              data: props.passengerData[3],
            },
          ],
        },
        {
          title: { text: "Time: 04:00" },
          series: [
            {
              data: props.passengerData[4],
            },
          ],
        },
        {
          title: { text: "Time: 05:00" },
          series: [
            {
              data: props.passengerData[5],
            },
          ],
        },
        {
          title: { text: "Time: 06:00" },
          series: [
            {
              data: props.passengerData[6],
            },
          ],
        },
        {
          title: { text: "Time: 07:00" },
          series: [
            {
              data: props.passengerData[7],
            },
          ],
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div>
      <h2>Testing if component is loaded</h2>
      <div id="main" style={{ width: "600px", height: "400px" }}></div>
    </div>
  );
};
export default PassengerDataVisualisation;
