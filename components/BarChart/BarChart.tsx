"use client"

import styles from "./BarChart.module.scss";
import React from 'react';
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import { Data } from 'plotly.js';
import CardHeaderOptions from "@/components/CardHeaderOptions/CardHeaderOptions";
import CircularProgress from '@mui/material/CircularProgress'

export default function BarChart({ data, isLoading }: { data: any[], isLoading: boolean }) {

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
            color: '0057B2' // Set the color of the bars
        }
    }];

    return (
        <section className={styles.container}>
            <CardHeaderOptions title="Global Internet Usage Trends in 2023" paragraphText='It reveals that "Finding Information" is the most prevalent online activity, suggesting a widespread need for accessing knowledge and resources. "Staying in Touch with Friends and Family" closely follows, highlighting the importance of social connectivity in the digital age. Furthermore, "Watching Videos or Movies" and "Keeping up to Date with News and Events" underscore the significant role of online entertainment and information consumption. Additionally, "Researching How to Do Things" and "Finding New Ideas or Inspiration" reflect users propensity for self-improvement and creativity. Overall, the data showcases the varied purposes for which individuals utilize the internet, from seeking information and entertainment to connecting with others and exploring new interests.' link="https://datareportal.com/reports/digital-2024-global-overview-report" sourceText="datareportal.com/reports" />
            {
                isLoading ? <div className="spinner">
                    <CircularProgress size={75} />
                </div> : <Plot
                    useResizeHandler
                    style={{ width: "100%", height: "100%", minHeight: "250px" }}
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
            }

        </section>
    );
}