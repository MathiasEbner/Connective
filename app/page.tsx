import styles from "@/styles/app.module.scss";
import { parse } from 'csv-parse';
import fs from 'fs'; // Importing file system module
import { parseCsv } from '@/app/utils/ParseCsv';
import { Key } from "react";
import SharePopulationChart from "@/components/SharePopulationChart/SharePopulationChart";
import BubbleChart from "@/components/BubbleChart/BubbleChart";
import InternetTimeline from "@/components/InternetTimeline/InternetTimeline";
import TypeUsage from "@/components/TypeUsage/TypeUsage";

export default function Home() {

  // Read the CSV file
  const csvData1 = fs.readFileSync('app/data/ShareOfThePopulationUsingTheInternet.csv', 'utf8');
  const csvData2 = fs.readFileSync('app/data/bubbleChart_data_corrected.csv', 'utf8');
  const csvData3 = fs.readFileSync('app/data/InternetHistogram.csv', 'utf8');
  const csvData4 = fs.readFileSync('app/data/typesOfUsage.csv', 'utf8');

  // Parse the CSV data
  const parsedData1 = parseCsv(csvData1);
  const parsedData2 = parseCsv(csvData2);
  const parsedData3 = parseCsv(csvData3);
  const parsedData4 = parseCsv(csvData4);

  // Process the data for plotly
  //const plotlyData = processData(parsedData);

  console.log(parsedData4)

  //Get all the necessary data from files

  return (
    <main className={styles.main}>
      <SharePopulationChart data={parsedData1} />
      <BubbleChart data={parsedData2} />
      <InternetTimeline data={parsedData3} />
      <TypeUsage data={parsedData4} />
    </main>
  );
}
