"use client"

import styles from "./SharePopulationChart.module.scss";
import React from 'react';
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import { Data } from 'plotly.js';

export default function SharePopulationChart({ data }: { data: any[] }) {
    // Group data by 'Name'
    const groupedData: { [key: string]: any[] } = data.reduce((groups, item) => {
        const groupName = item['\uFEFFName'];
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(item);
        return groups;
    }, {});

    // Construct plot data for each group
    const plotData: Data[] = Object.entries(groupedData).map(([name, group]) => {
        const xData: number[] = group.map(entry => parseInt(entry['Year']));
        const yData: number[] = group.map(entry => parseFloat(entry['Individuals using the Internet (% of population)']));
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
            <Plot
                useResizeHandler
                style={{ width: "100%", height: "100%" }}
                data={plotData}
                layout={{
                    autosize: true,
                    font: {
                        family: 'Inter, sans-serif'
                    },
                    // xaxis: {
                    //     title: 'Year'
                    // },
                    plot_bgcolor: '#EDEDED', // Set the background color of the plot
                    paper_bgcolor: '#EDEDED', // Set the background color of the entire plot
                    yaxis: {
                        title: 'Individuals using the Internet (% of population)'
                    },
                    legend: {
                        x: 0.5,
                        y: 1.2,
                        xanchor: 'center',
                        yanchor: 'top',
                        orientation: 'h', // Display the legend items in a row
                        font: {
                            size: 10
                        }
                    },
                    margin: {
                        l: 50, // Left margin
                        r: 0, // Right margin
                        b: 20, // Bottom margin
                        t: 0, // Top margin
                    }
                }}
            />
        </section>
    );
}