"use client"

import styles from "./TypeUsage.module.scss";
import React from 'react';
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import { Data } from 'plotly.js';

export default function TypeUsage({ data }: { data: any[] }) {

    const xData: number[] = data.map(entry => parseFloat(entry['percentage of users']));
    const yData: string[] = data.map(entry => entry['type']);

    // Construct plot data for each group
    const plotData: Data[] = [{
        x: xData,
        y: yData,
        type: 'bar',
        orientation: 'h', // Make the bars horizontal
        text: yData, // Place the y names inside the bars
        textposition: 'auto', // Position the text automatically
        marker: {
            color: 'rgb(31, 119, 180)' // Set the color of the bars
        }
    }];

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
                        //title: 'Number of internet users in billions',
                        ticksuffix: '%',
                    },
                    yaxis: {
                        autorange: 'reversed',
                        showticklabels: false, // Hide y-axis labels
                    },
                    margin: {
                        l: 20, // Left margin
                        r: 0, // Right margin
                        b: 50, // Bottom margin
                        t: 0, // Top margin
                    }
                }}
            />
        </section>
    );
}