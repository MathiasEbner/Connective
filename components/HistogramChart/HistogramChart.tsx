"use client"

import styles from "./HistogramChart.module.scss";
import React from 'react';
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import { Data } from 'plotly.js';
import CardHeaderOptions from "@/components/CardHeaderOptions/CardHeaderOptions";
import CircularProgress from '@mui/material/CircularProgress'

export default function HistogramChart({ data, isLoading }: { data: any[], isLoading: boolean }) {

    const paragraphText = `The data depicts the evolution of internet users in billions and the corresponding percentage of users from 2005 to 2021. During this period, there has been a consistent upward trend in both the number of users and the percentage of users worldwide.

    In 2005, there were approximately 1.0 billion internet users, accounting for 15.8% of the global population. This number steadily increased over the years, reaching 4.9 billion users in 2021, representing 62% of the population.
    
    The data underscores the exponential growth of internet usage globally, reflecting its widespread adoption and integration into everyday life. This trend signifies the increasing importance of the internet as a fundamental tool for communication, information access, and economic participation on a global scale.`

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
        // Create an array of values for the x-axis, y-axis and y-axis2
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
                    color: '007DFF' // Set the color of the bars
                }
            },
            {
                x: xData,
                y: yData2,
                type: 'scatter',
                mode: 'lines',
                name: 'Percentage of users',
                yaxis: 'y2',
                hoverinfo: "skip"
            }
        ];
    }).flat(); // flat into a single array

    return (
        <section className={styles.container}>
            <CardHeaderOptions title="Global Internet Adoption over the years" paragraphText={paragraphText} link="https://www.itu.int/itu-d/reports/statistics/2022/11/24/ff22-internet-use/" sourceText="www.itu.int" />
            {
                isLoading ?
                    <div className="spinner">
                        <CircularProgress size={75} />
                    </div> :
                    <Plot
                        useResizeHandler
                        style={{ width: "100%", height: "100%", minHeight: "200px" }}
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
                                dtick: 0.5, // Set the step size of the y-axis
                                titlefont: {
                                    size: 13,
                                }
                            },
                            yaxis2: {
                                title: 'Percentage of population',
                                overlaying: 'y',
                                side: 'right',
                                ticksuffix: '%',
                                dtick: 5,
                                titlefont: {
                                    size: 13,
                                }
                            },
                            margin: {
                                l: 60,
                                r: 60,
                                b: 20,
                                t: 0,
                            }
                        }}
                    />
            }
        </section>
    );
}