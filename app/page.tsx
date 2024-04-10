"use client"

import React, { useEffect, useState } from 'react';
import styles from "@/styles/app.module.scss";
import { parseCsv } from '@/app/utils/ParseCsv';
import LineChart from "@/components/LineChart/LineChart";
import BubbleChart from "@/components/BubbleChart/BubbleChart";
import HistogramChart from "@/components/HistogramChart/HistogramChart";
import BarChart from "@/components/BarChart/BarChart";
import Sidebar from '@/components/Sidebar/Sidebar';
import NumberCard from "@/components/NumberCard/NumberCard";
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

export default function Home() {
  // State variables for chart data and loading states
  const [lineChartData, setLineChartData] = useState([]);
  const [bubbleChartData, setBubbleChartData] = useState([]);
  const [histogramChartData, setHistogramChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [isLoadingLineChart, setIsLoadingLineChart] = useState(true);
  const [isLoadingBubbleChart, setIsLoadingBubbleChart] = useState(true);
  const [isLoadingHistogramChart, setIsLoadingHistogramChart] = useState(true);
  const [isLoadingBarChart, setIsLoadingBarChart] = useState(true);

  // Icon properties
  const iconColor = '#007DFF';
  const iconSizeLarge = 44;
  const iconSizeSmall = 40;

  // useEffect hook to load data on component mount
  useEffect(() => {
    async function loadData() {
      try {
        // Fetching and setting line chart data
        const lineChartDataResponse = await fetch('lineChartData.csv');
        const lineChartDataText = await lineChartDataResponse.text();
        setLineChartData(parseCsv(lineChartDataText));
        setIsLoadingLineChart(false);

        // Fetching and setting histogram chart data
        const histogramChartDataResponse = await fetch('histogramChartData.csv');
        const histogramChartDataText = await histogramChartDataResponse.text();
        setHistogramChartData(parseCsv(histogramChartDataText));
        setIsLoadingHistogramChart(false);

        // Fetching and setting bubble chart data
        const bubbleChartDataResponse = await fetch('bubbleChartData.csv');
        const bubbleChartDataText = await bubbleChartDataResponse.text();
        setBubbleChartData(parseCsv(bubbleChartDataText));
        setIsLoadingBubbleChart(false);

        // Fetching and setting bar chart data
        const barChartDataResponse = await fetch('barChartData.csv');
        const barChartDataText = await barChartDataResponse.text();
        setBarChartData(parseCsv(barChartDataText));
        setIsLoadingBarChart(false);

      } catch (error) {
        console.error('Error reading CSV files:', error);
      }
    }

    loadData();
  }, []);


  return (
    <div className={styles.container}>
      <header className={styles.sideContainer}>
        <Sidebar />
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.firstContainer}>
          <LineChart data={lineChartData} isLoading={isLoadingLineChart} />
          <div className={styles.statisticsContainer}>
            <NumberCard icon={<PublicIcon sx={{ fontSize: iconSizeSmall, color: iconColor }} />} number="5.35B" text="Individuals using the internet" />
            <NumberCard icon={<GroupsIcon sx={{ fontSize: iconSizeLarge, color: iconColor }} />} number="66.2%" text="Percentage of total population that uses internet" />
            <NumberCard icon={<FemaleIcon sx={{ fontSize: iconSizeLarge, color: iconColor }} />} number="63.5%" text="Percentage of internet usage among females" />
            <NumberCard icon={<MaleIcon sx={{ fontSize: iconSizeLarge, color: iconColor }} />} number="68.8%" text="Percentage of internet usage among males" />
          </div>
        </div>
        <div className={styles.secondContainer}>
          <div className={styles.statisticsContainer}>
            <NumberCard icon={<AccessTimeIcon sx={{ fontSize: iconSizeSmall, color: iconColor }} />} number="6h40m" text="Average daily time spent using the internet" />
            <NumberCard icon={<LocationCityIcon sx={{ fontSize: iconSizeLarge, color: iconColor }} />} number="66.2%" text="Percentage of internet usage among urban population" />
            <NumberCard icon={<NaturePeopleIcon sx={{ fontSize: iconSizeLarge, color: iconColor }} />} number="63.5%" text="Percentage of internet usage among rural population" />
            <NumberCard icon={<SmartphoneIcon sx={{ fontSize: iconSizeSmall, color: iconColor }} />} number="96.5%" text="Percentage of users accessing the internet via mobile phones" />
          </div>
          <HistogramChart data={histogramChartData} isLoading={isLoadingHistogramChart} />
        </div>
        <div className={styles.thirdContainer}>
          <BubbleChart data={bubbleChartData} isLoading={isLoadingBubbleChart} />
          <BarChart data={barChartData} isLoading={isLoadingBarChart} />
        </div>
      </main>
    </div>
  );
}
