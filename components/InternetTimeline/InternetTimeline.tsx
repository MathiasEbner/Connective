"use client"

import styles from "./InternetTimeline.module.scss";
import React from 'react';
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import { Data } from 'plotly.js';

export default function InternetTimeline({ data }: { data: any[] }) {
    // Group data by 'Name'
    const groupedData: { [key: string]: any[] } = data.reduce((groups, item) => {
        const groupName = item['year'];
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(item);
        return groups;
    }, {});

    // Construct plot data for each group
    // @ts-ignore
    const plotData: Data[] = Object.entries(groupedData).map(([name, group]) => {
        const xData: number[] = group.map(entry => parseInt(entry['year']));
        const yData: number[] = group.map(entry => parseFloat(entry['number of users']));
        const yData2: number[] = group.map(entry => parseFloat(entry['percentage of users']));

        return [
            {
                x: xData,
                y: yData,
                type: 'bar',
                name,
                marker: {
                    color: 'rgb(31, 119, 180)' // Set the color of the bars
                }
            },
            {
                x: xData,
                y: yData2,
                type: 'scatter',
                mode: 'lines',
                name: 'Percentage of users',
                yaxis: 'y2',
            }
        ];
    }).flat();

    return (
        <section className={styles.container}>
            <Plot
                useResizeHandler
                style={{ width: "100%", height: "100%" }}
                data={plotData}
                layout={{
                    autosize: true,
                    font: {
                        family: 'Inter, sans-serif'
                    },
                    plot_bgcolor: '#F8F8F8', // Set the background color of the plot
                    paper_bgcolor: '#F8F8F8', // Set the background color of the entire plot
                    showlegend: false,
                    xaxis: {
                        tickmode: 'array',
                        tickvals: Object.keys(groupedData), // Set tick values to years
                        ticktext: Object.keys(groupedData), // Set tick text to years
                    },
                    yaxis: {
                        title: 'Number of internet users in billions',
                        dtick: 0.5 // Set the step size of the y-axis
                    },
                    yaxis2: {
                        title: 'Percentage of population',
                        overlaying: 'y',
                        side: 'right',
                        ticksuffix: '%', // Display "%" on every step
                        dtick: 5, // Adjust the step size of the y-axis
                    },
                    margin: {
                        l: 60, // Left margin
                        r: 60, // Right margin
                        b: 20, // Bottom margin
                        t: 0, // Top margin
                    }
                }}
            />
        </section>
    );
}