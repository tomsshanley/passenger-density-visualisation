import React, { useEffect, useRef, useState } from "react";
import Papa from "papaparse";

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

import ReactECharts from "echarts-for-react";

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

const FileUploader = (geoJSONdata) => {
  const [transformedData, setTransformedData] = useState(null);
  const [selectedKey, setSelectedKey] = useState("");
  echarts.registerMap("Victoria", geoJSONdata.data);
  const DEFAULT_OPTION = {
    title: {
      text: "Train Passenger Frequency Map",
      subtext:
        "Visualisation of passenger demand throughout victoria" +
          geoJSONdata.data._id || "Victoria",

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
  const [option, setOption] = useState(DEFAULT_OPTION);
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
          const data = results.data;
          const simplifiedData = simplifyData(data);
          // const transformed = transformData(data); // transform the data
          const outboundData = transformOutboundData(simplifiedData); // transform the data
          console.log(outboundData);
          displayData(geoJSONdata, outboundData);
          // const inboundData = transformInboundData(simplifiedData); // transform the data
          // setTransformedData(transformed);
          // const keys = Object.keys(transformed);
          // setSelectedKey(keys.sort()[0]);
          // populateDropdown(Object.keys(transformed), transformed);
        },
      });
    }
  };

  function simplifyData(data) {
    data.forEach((trip) => {
      delete trip.Origin;
      delete trip.Destination;
      delete trip.SA1_MAINCODE_2016;
      delete trip.Origin_SA2_NAME_2016;
      delete trip.Dest_Origin_SA2_NAME_2016;
      delete trip.SA1_MAINCODE_2016_Dest;
    });

    return data;
  }

  function transformOutboundData(data) {
    const lga = "Melbourne City";
    // Filter for origins

    let outbound = data.filter((trip) => trip.Origin_SA3_NAME_2016 == lga);

    // Count trips per hour
    let outboundFrequency = countTripsPerHour(outbound);

    return outboundFrequency;
  }

  function countTripsPerHour(data) {
    const tripsPerHour = [];

    // Initialize tripsPerHour with empty arrays for each hour
    for (let i = 0; i < 24; i++) {
      const hourString = `${String(i).padStart(2, "0")}:00`;
      tripsPerHour.push({ [hourString]: [] });
    }

    try {
      // Process each trip
      data.forEach((trip) => {
        let hour = Math.floor(trip.Departure / 60);
        if (hour >= 24) {
          hour = 0; // If hour is 24 or greater, set it to 0
        }
        const hourString = `${String(hour).padStart(2, "0")}:00`;
        const destination = trip.Dest_Origin_SA3_NAME_2016 || "Melbourne City";

        // Find the corresponding hour in tripsPerHour
        const hourEntry = tripsPerHour.find((entry) => entry[hourString]);
        if (hourEntry == undefined) {
          console.error("hourEntry undefined");
          console.log(trip);
          console.log(hourString);
        }
        // Find the destination entry within that hour
        const destinationEntry = hourEntry[hourString].find(
          (entry) => entry.name === destination
        );

        if (destinationEntry) {
          destinationEntry.value++;
        } else {
          hourEntry[hourString].push({ name: destination, value: 1 });
        }
      });

      return tripsPerHour;
    } catch (error) {
      console.error("Error occured when processing trip");
      console.log(error);
    }
  }

  function transformData(data) {
    // extract table columns
    // TODO: Use leaveTime and arriveTime instead of 'time'
    // TODO: Add 'Internal' where if LGA in = LGA out

    // get rows
    let origins = data.map((row) => row.Origin);
    let destinations = data.map((row) => row.Destination);
    let time = data.map((row) => row.Departure);
    let trips = data.map((row) => row.trips);
    // console.log(trips);
    // get unique lgas
    let unique_lgas = [...new Set(origins.concat(destinations))];
    // console.log(unique_lgas);
    // create empty '24hours' rows x 'In&Out' columns array for each lga
    let lga_dict = {};
    unique_lgas.forEach((lga) => {
      lga_dict[lga] = Array.from({ length: 24 }, () => [0, 0]);
    });

    // populate each lga dictionary
    for (let i = 0; i < origins.length; i++) {
      let origin = origins[i];
      let destination = destinations[i];
      let hour = Math.floor(time[i] / 60); // Find hour which trip occurred

      if (hour >= 24) {
        hour = 0; // If hour is 24 or greater, set it to 0
      }

      let passengerCount = trips[i];

      lga_dict[origin][hour][1] -= passengerCount; // Increment 'out' count by passenger count (going negative)
      lga_dict[destination][hour][0] += passengerCount; // Increment 'in' count by passenger count
    }
    console.log(lga_dict);
    return lga_dict; // Return dictionary of lga trip flow
  }

  function populateDropdown(unique_lgas, transformedData) {
    const dropdown = document.getElementById("lgaDropdown");
    dropdown.innerHTML = ""; // clear the dropdown

    unique_lgas.sort();

    unique_lgas.forEach((lga) => {
      const option = document.createElement("option");
      option.value = lga;
      option.text = lga;
      dropdown.appendChild(option);
    });

    // add event listener for dropdown change
    dropdown.addEventListener("change", function () {
      const selectedLga = this.value;
      displayData(transformedData, selectedLga);
    });
  }

  const displayData = (geoJSONdata, outBoundData) => {
    // Implement your data display logic here

    echarts.registerMap("Victoria", geoJSONdata.data);
    const geoChartOptions = {
      baseOption: {
        timeline: {
          axisType: "category",
          // each item in `timeline.data` corresponds to each
          // `option` in `options` array.
          data: [
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
          ],
        },
        title: {
          text: "Train Passenger Frequency Map",
          subtext:
            "Visualisation of passenger demand throughout victoria" +
              geoJSONdata.data._id || "Victoria",

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
          },
        ],
      },
      options: [
        {
          title: { text: "TIME is 00:00" },
          series: [
            {
              data: outBoundData[0],
            },
          ],
        },
      ],
    };

    setOption(geoChartOptions);
  };
  // useEffect(() => {
  //   // console.log(result.data);
  //   echarts.registerMap("Victoria", geoJSONdata.data);
  //   const geoChartOptions = {
  //     title: {
  //       text: "Train Passenger Frequency Map",
  //       subtext:
  //         "Visualisation of passenger demand throughout victoria" +
  //           geoJSONdata.data._id || "Victoria",

  //       left: "right",
  //     },
  //     tooltip: {
  //       trigger: "item",
  //       showDelay: 0,
  //       transitionDuration: 0.2,
  //     },
  //     visualMap: {
  //       left: "right",
  //       min: -30000,
  //       max: 30000,
  //       inRange: {
  //         color: [
  //           "#313695",
  //           "#4575b4",
  //           "#74add1",
  //           "#abd9e9",
  //           "#e0f3f8",
  //           "#ffffbf",
  //           "#fee090",
  //           "#fdae61",
  //           "#f46d43",
  //           "#d73027",
  //           "#a50026",
  //         ],
  //       },
  //       text: ["Going To", "Coming From"],
  //       calculable: true,
  //     },
  //     toolbox: {
  //       show: true,
  //       left: "left",
  //       top: "top",
  //       feature: {
  //         dataView: { readOnly: false },
  //         restore: {},
  //         saveAsImage: {},
  //       },
  //     },
  //     series: [
  //       {
  //         name: "Victoria Train Demand",
  //         type: "map",
  //         roam: true,
  //         map: "Victoria",
  //         emphasis: {
  //           label: {
  //             show: true,
  //           },
  //         },
  //         data: [
  //           { name: "Melbourne", value: 25000 },
  //           { name: "Murrindindi", value: -200 },
  //           { name: "Baw Baw", value: -200 },
  //           { name: "Port Phillip", value: 24000 },
  //           { name: "Pyrenees", value: -200 },
  //           { name: "Bass Coast", value: -200 },
  //           { name: "Queenscliffe", value: -200 },
  //           { name: "Wyndham", value: -200 },
  //           { name: "Mansfield", value: -200 },
  //           { name: "Swan Hill (RC)", value: -200 },
  //           { name: "Moreland", value: 12000 },
  //           { name: "Glen Eira", value: 13000 },
  //           { name: "Surf Coast", value: -200 },
  //           { name: "Glenelg", value: -200 },
  //           { name: "Moonee Valley", value: 9000 },
  //           { name: "Moyne", value: -200 },
  //           { name: "Central Goldfields", value: -200 },
  //           { name: "Casey", value: -200 },
  //           { name: "Yarra Ranges", value: -2000 },
  //           { name: "Mitchell", value: -200 },
  //           { name: "Mildura (RC)", value: -200 },
  //           { name: "Hobsons Bay", value: 500 },
  //           { name: "Greater Bendigo", value: -200 },
  //           { name: "Southern Grampians", value: -200 },
  //           { name: "Horsham (RC)", value: -200 },
  //           { name: "Buloke", value: -200 },
  //           { name: "Brimbank", value: -200 },
  //           { name: "Nillumbik", value: -200 },
  //           { name: "Benalla (RC)", value: -200 },
  //           { name: "Golden Plains", value: -200 },
  //           { name: "Moorabool", value: -200 },
  //           { name: "Colac-Otway", value: -200 },
  //           { name: "Stonnington", value: 18000 },
  //           { name: "Indigo", value: -200 },
  //           { name: "West Wimmera", value: -200 },
  //           { name: "Ballarat", value: -200 },
  //           { name: "Greater Geelong", value: -200 },
  //           { name: "Alpine", value: -200 },
  //           { name: "Boroondara", value: 18000 },
  //           { name: "East Gippsland", value: -200 },
  //           { name: "Mornington Peninsula", value: -200 },
  //           { name: "Darebin", value: 16000 },
  //           { name: "Campaspe", value: -200 },
  //           { name: "Mount Alexander", value: -200 },
  //           { name: "Corangamite", value: -200 },
  //           { name: "Northern Grampians", value: -200 },
  //           { name: "Maribyrnong", value: 5000 },
  //           { name: "Frankston", value: -200 },
  //           { name: "Whitehorse", value: -30000 },
  //           { name: "Melton", value: -200 },
  //           { name: "Gannawarra", value: -200 },
  //           { name: "Strathbogie", value: -200 },
  //           { name: "Knox", value: -2000 },
  //           { name: "Loddon", value: -200 },
  //           { name: "Yarriambiack", value: -200 },
  //           { name: "Whittlesea", value: -200 },
  //           { name: "Wangaratta (RC)", value: -200 },
  //           { name: "Yarra", value: 24000 },
  //           { name: "Banyule", value: 12000 },
  //           { name: "Bayside", value: 13000 },
  //           { name: "Monash", value: 5000 },
  //           { name: "Hume", value: -200 },
  //           { name: "Manningham", value: -4000 },
  //           { name: "Kingston (C) (Vic.)", value: -300 },
  //           { name: "Greater Dandenong", value: -200 },
  //           { name: "Cardinia", value: -200 },
  //           { name: "Maroondah", value: -3000 },
  //           { name: "Macedon Ranges", value: -200 },
  //           { name: "Hepburn", value: -200 },
  //         ],
  //       },
  //     ],
  //   };

  //   setOption(geoChartOptions);
  // }, []);

  return (
    <div>
      <input type="file" id="fileInput" onChange={handleFileSelect} />
      {transformedData && (
        <>
          {/* Assuming you want to show a dropdown */}
          <select
            onChange={(e) => setSelectedKey(e.target.value)}
            value={selectedKey}
          >
            {Object.keys(transformedData).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </>
      )}
      <ReactECharts option={option} style={{ height: "100vh" }} />;
    </div>
  );
};

export default FileUploader;
