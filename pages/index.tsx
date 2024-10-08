// pages/index.js
import { MongoClient } from "mongodb";
// import GeoChart from "../components/GeoChart";
import FileUploader from "@/components/FileUploader.jsx";
import Dynamic from "@/components/Dynamic";
import TimelineExample from "@/components/TimelineExample";
import Echart from "@/components/Echart";
import EchartsMap from "@/components/EchartsMap";

const uri =
  "mongodb+srv://tomsshanley:6RJlsV6P3AUI0ano@cluster5.oxoiyna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster5";
const client = new MongoClient(uri);

// Type declarations
type GeojsonFeature = {
  type: string;
  properties: {
    lga_name_2017: string;
    name?: string;
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: any[];
  };
  id?: string;
};

type Geojson = {
  type: string;
  features: GeojsonFeature[];
};

const transformGeojsonData = (geojson: any) => {
  return {
    ...geojson,
    features: geojson.features.map((feature: any, index: any) => ({
      ...feature,
      id: (index + 1).toString().padStart(2, "0"), // Adds ID starting from '01'
      properties: {
        name: feature.properties.lga_name_2017.replace(/\s\([A-Z]\)$/, ""), // Uses regex to remove space and any single uppercase letter in parentheses at the end of the string
      },
    })),
  };
};

export const getServerSideProps = async () => {
  try {
    // await client.connect();
    // console.log("Connected successfully to MongoDB server.");

    // const db = await client.db("FYPDatabase");
    // const collection = await db.collection("VictoriaGeoJSON");
    // const documents = await collection
    //   .find({ type: "FeatureCollection" })
    //   .toArray();

    // // Convert each document into a JSON object that can be serialized
    // const result = documents.map((doc) => ({
    //   ...doc,
    //   _id: doc._id.toString(), // Convert ObjectId to string
    // }));
    // console.log(result[0]);

    // await client.close();

    const vicResult = await fetch(
      "https://geo.abs.gov.au/arcgis/rest/services/ASGS2017/LGA/MapServer/0/query?where=LGA_CODE_2017%20LIKE%20'2%'&outFields=LGA_CODE_2017,LGA_NAME_2017,objectid&geometryPrecision=3&f=geojson",
      { cache: "no-store" }
    );
    const vicResultData = await vicResult.json();
    const updatedGeojsonData = transformGeojsonData(vicResultData);
    // console.log("VicResult", updatedGeojsonData);

    return {
      props: { geoJSONdata: updatedGeojsonData },
      // props: { result: result[0], vicJSONresult: updatedGeojsonData },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    await client.close();
    return {
      props: { error: (error as Error).message },
    };
  }
};

type HomeProps = {
  geoJSONdata?: Geojson;
  error?: string;
};
export default function Home({ geoJSONdata, error }: HomeProps) {
  // export default function Home({ result, vicJSONresult, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }
  let passengerData: any = [
    {
      "00:00": [
        {
          name: "Frankston",
          value: 1,
        },
      ],
    },
    {
      "01:00": [],
    },
    {
      "02:00": [],
    },
    {
      "03:00": [],
    },
    {
      "04:00": [],
    },
    {
      "05:00": [],
    },
    {
      "06:00": [
        {
          name: "Melbourne City",
          value: 2,
        },
        {
          name: "Maribyrnong",
          value: 1,
        },
      ],
    },
    {
      "07:00": [
        {
          name: "Darebin - South",
          value: 1,
        },
        {
          name: "Melbourne City",
          value: 4,
        },
        {
          name: "Tullamarine - Broadmeadows",
          value: 1,
        },
        {
          name: "Brunswick - Coburg",
          value: 1,
        },
        {
          name: "Maribyrnong",
          value: 1,
        },
        {
          name: "Boroondara",
          value: 1,
        },
      ],
    },
  ];

  return (
    <div>
      {/* <TimelineExample /> */}
      {/* <h1>Upload CSV File</h1>
      <EchartsMap />
      <FileUploader data={vicJSONresult} />
      <h3>Select LGA:</h3>
      <select id="lgaDropdown"></select>
      <div id="flowmap"></div>
      <Dynamic /> */}
      <Echart geoJSONdata={geoJSONdata} passengerData={passengerData} />
      {/* <GeoChart data={vicJSONresult} className="h-[80vh]"></GeoChart> */}
      {/* <p>{JSON.stringify(vicJSONresult)}</p> */}
    </div>
  );
}
