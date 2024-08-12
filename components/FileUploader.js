import React, { useState } from "react";
import Papa from "papaparse";

const FileUploader = () => {
  const [transformedData, setTransformedData] = useState(null);
  const [selectedKey, setSelectedKey] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
          const data = results.data;
          const transformed = transformData(data); // transform the data
          setTransformedData(transformed);
          const keys = Object.keys(transformed);
          setSelectedKey(keys.sort()[0]);
          populateDropdown(Object.keys(transformed), transformed);
        },
      });
    }
  };

  function transformData(data) {
    // extract table columns
    // TODO: Use leaveTime and arriveTime instead of 'time'
    // TODO: Add 'Internal' where if LGA in = LGA out

    // get rows
    let origins = data.map((row) => row.Origin);
    let destinations = data.map((row) => row.Destination);
    let time = data.map((row) => row.Departure);
    let trips = data.map((row) => row.trips);
    console.log(trips);
    // get unique lgas
    let unique_lgas = [...new Set(origins.concat(destinations))];
    console.log(unique_lgas);
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

  const displayData = (data, key) => {
    // Implement your data display logic here
  };

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
    </div>
  );
};

export default FileUploader;
