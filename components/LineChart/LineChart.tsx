"use client"

import styles from "./LineChart.module.scss";
import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import { Data } from 'plotly.js';
import CardHeaderOptions from "@/components/CardHeaderOptions/CardHeaderOptions";
import CircularProgress from '@mui/material/CircularProgress'

export default function LineChart({ data, isLoading }: { data: any[], isLoading: boolean }) {

    const paragraphText = `The provided data tracks internet usage as a percentage of the population across various regions from 1990 to 2020. It reveals a global trend of increasing internet adoption, with North America and Europe leading in usage percentages exceeding 90%. However, Sub-Saharan Africa and South Asia still have significantly lower rates, indicating persistent digital disparities. Overall, the data underscores the transformative role of the internet while highlighting ongoing challenges in achieving universal access worldwide.`

    // Group data by 'Name'
    const groupedData: { [key: string]: any[] } = data.reduce((groups, item) => {
        const groupName = item['Name'];
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(item);
        return groups;
    }, {});

    // Construct plot data for each group
    const plotData: Data[] = Object.entries(groupedData).map(([name, group]) => {
        // Create an array of values for the x-axis and y-axis data
        const xData: number[] = group.map(entry => parseInt(entry['Year']));
        const yData: number[] = group.map(entry => parseFloat(entry['Individuals using the Internet (% of population)']));

        // Return an object representing the plot data for this group
        return {
            x: xData,
            y: yData,
            type: 'scatter',
            mode: 'lines+markers',
            name,
        };
    });

    return (
        <section className={styles.container}>
            <CardHeaderOptions title="Share of the population using the Internet" paragraphText={paragraphText} link="https://ourworldindata.org/grapher/share-of-individuals-using-the-internet" sourceText="www.ourworldindata.org" />
            {
                // If data is loading, show a spinner, otherwise show the plot
                isLoading ?
                    <div className="spinner">
                        <CircularProgress size={75} />
                    </div> :
                    <Plot
                        useResizeHandler
                        style={{ width: "100%", height: "100%", minHeight: "350px" }}
                        data={plotData}
                        layout={{
                            autosize: true,
                            font: {
                                family: 'Inter, sans-serif'
                            },
                            plot_bgcolor: '#F8F8F8', // Set the background color of the plot
                            paper_bgcolor: '#F8F8F8', // Set the background color of the entire plot
                            yaxis: {
                                title: 'Individuals using the Internet (% of population)',
                                titlefont: {
                                    size: 13,
                                }
                            },
                            legend: {
                                x: 0.5,
                                y: 1.2,
                                xanchor: 'center',
                                yanchor: 'top',
                                orientation: 'h', // Display the legend items in a row
                                font: {
                                    size: 9.5
                                }
                            },
                            margin: {
                                l: 50,
                                r: 0,
                                b: 20,
                                t: 0,
                            }
                        }}
                    />
            }
        </section>
    );
}