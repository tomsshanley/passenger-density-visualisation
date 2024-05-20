// pages/index.js
import { MongoClient } from "mongodb";
import GeoChart from "../components/GeoChart";
const uri =
  "mongodb+srv://tomsshanley:6RJlsV6P3AUI0ano@cluster5.oxoiyna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster5";
const client = new MongoClient(uri);

export const getServerSideProps = async () => {
  try {
    // await client.connect();
    // console.log("Connected successfully to MongoDB server.");

    // const db = await client.db("FYPDatabase");
    // const collection = await db.collection("VictoriaGeoJSON");
    // const documents = await collection.find({ type: "Topology" }).toArray();

    // // Convert each document into a JSON object that can be serialized
    // const result = documents.map((doc) => ({
    //   ...doc,
    //   _id: doc._id.toString(), // Convert ObjectId to string
    // }));
    // console.log(result[0]);

    // await client.close();

    const vicResult = await fetch(
      "https://geo.abs.gov.au/arcgis/rest/services/ASGS2017/LGA/MapServer/0/query?where=LGA_CODE_2017%20LIKE%20'2%'&outFields=LGA_CODE_2017,LGA_NAME_2017&geometryPrecision=3&f=geojson",
      { cache: "no-store" }
    );
    const vicResultData = await vicResult.json();
    console.log("VicResult", vicResultData);
    return {
      props: { vicJSONresult: vicResultData },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    await client.close();
    return {
      props: { error: error.message },
    };
  }
};

export default function Home({ vicJSONresult, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>USA Population Estimates (2012)</h1>
      <GeoChart data={vicJSONresult}></GeoChart>
      <p>{JSON.stringify(vicJSONresult)}</p>
    </div>
  );
}
