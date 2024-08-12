document
  .getElementById("fileInput")
  .addEventListener("change", handleFileSelect, false);

// Replacable with import passenger data button in main app
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function (results) {
        const data = results.data;
        const transformedData = transformData(data); // transform the data
        populateDropdown(Object.keys(transformedData), transformedData); // populate the dropdown
        displayData(transformedData, Object.keys(transformedData).sort()[0]); // display the first lga by default
      },
    });
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

  // get unique lgas
  let unique_lgas = [...new Set(origins.concat(destinations))];

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

// code taken from apache echarts example
function displayData(data, lgaToDisplay) {
  if (data.hasOwnProperty(lgaToDisplay)) {
    var chartDom = document.getElementById("flowmap");
    var myChart = echarts.init(chartDom);
    var option;

    let xAxisData = [];
    let inbound = [];
    let outbound = [];
    // X-AXIS LABELS
    for (let i = 0; i < 24; i++) {
      xAxisData.push(i + ":00");
      // Populate bars
      inbound.push(data[lgaToDisplay][i][0]); // Inbound count
      outbound.push(data[lgaToDisplay][i][1]); // Outbound count
    }
    var emphasisStyle = {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: "rgba(0,0)",
      },
    };
    option = {
      legend: {
        data: ["Inbound Passengers", "Outbound Passengers"],
        left: "10%",
      },
      brush: {
        toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
        xAxisIndex: 0,
      },
      toolbox: {
        feature: {
          magicType: {
            type: ["stack"],
          },
          dataView: {},
        },
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        name: "Time of Day",
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false },
      },
      yAxis: {
        name: "Number of Passengers",
      },
      grid: {
        bottom: 100,
      },
      series: [
        {
          name: "Inbound Passengers",
          type: "bar",
          stack: "one",
          emphasis: emphasisStyle,
          data: inbound,
        },
        {
          name: "Outbound Passengers",
          type: "bar",
          stack: "one",
          emphasis: emphasisStyle,
          data: outbound,
        },
      ],
    };
    myChart.on("brushSelected", function (params) {
      var brushed = [];
      var brushComponent = params.batch[0];
      for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
        var rawIndices = brushComponent.selected[sIdx].dataIndex;
        brushed.push("[Series " + sIdx + "] " + rawIndices.join(", "));
      }
      myChart.setOption({
        title: {
          backgroundColor: "#333",
          text: "SELECTED DATA INDICES: \n" + brushed.join("\n"),
          bottom: 0,
          right: "10%",
          width: 100,
          textStyle: {
            fontSize: 12,
            color: "#fff",
          },
        },
      });
    });

    option && myChart.setOption(option);
  } else {
    console.log(`LGA ${lgaToDisplay} not found in the dataset.`);
  }
}
