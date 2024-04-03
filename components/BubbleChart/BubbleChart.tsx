"use client"

import styles from "./BubbleChart.module.scss";
import React from 'react';
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import { Data } from 'plotly.js';

export default function BubbleChart({ data }: { data: any[] }) {
    // Group data by 'Name'
    const groupedData: { [key: string]: any[] } = data.reduce((groups, item) => {
        const groupName = item['country'];
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(item);
        return groups;
    }, {});

    function scaleMarkerSize(size: number): number {
        // Define your custom scaling logic here
        // For example, you can adjust the factor to control the size scaling
        const factor = 0.0015;
        return Math.sqrt(size) * factor;
    }

    function getContinentColor(continent: string): string {
        // Return color based on continent
        const continentColors: { [key: string]: string } = {
            Europe: 'blue',
            Asia: 'red',
            Africa: 'green',
            'North America': 'black',
            'South America': 'orange',
            Oceania: 'purple',
        };
        return continentColors[continent];
    }

    // Construct plot data for each group
    const plotData: Data[] = Object.entries(groupedData).map(([name, group]) => {
        const xData: number[] = group.map(entry => parseInt(entry['gdp']));
        const yData: number[] = group.map(entry => parseFloat(entry['internet']));
        const sizeData: number[] = group.map(entry => parseInt(entry['population']));
        const continentData: string[] = group.map(entry => entry['continent']);
        return {
            x: xData,
            y: yData,
            type: 'scatter',
            mode: 'markers',
            marker: {
                size: sizeData.map(scaleMarkerSize), // Use custom scaling function for marker
                color: continentData.map(getContinentColor), // Assign color based on continent
            },
            name, // Use group name for legend
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
                    //title: 'Share of the Population Using the Internet',
                    plot_bgcolor: '#F8F8F8', // Set the background color of the plot
                    paper_bgcolor: '#F8F8F8', // Set the background color of the entire plot
                    xaxis: {
                        title: 'GDP per captita (US$)'
                    },
                    yaxis: {
                        title: 'Individuals using the Internet (% of population)'
                    },
                    legend: { x: 1, y: 0 },
                    margin: {
                        l: 60, // Left margin
                        r: 60, // Right margin
                        b: 60, // Bottom margin
                        t: 0, // Top margin
                    }
                }}
            />
        </section>
    );
}