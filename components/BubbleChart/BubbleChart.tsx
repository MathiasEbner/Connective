"use client"

import styles from "./BubbleChart.module.scss";
import React from 'react';
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import { Data } from 'plotly.js';
import CardHeaderOptions from "@/components/CardHeaderOptions/CardHeaderOptions"; import CircularProgress from '@mui/material/CircularProgress'

export default function BubbleChart({ data, isLoading }: { data: any[], isLoading: boolean }) {

    const paragraphText = `Observing the plot, several trends become evident. Firstly, there is a general positive correlation between GDP and internet usage percentage, indicating that wealthier countries tend to have higher rates of internet adoption. This suggests that economic development plays a significant role in facilitating access to and utilization of internet services.

    Additionally, the bubble sizes reflect the population distribution across countries, with larger bubbles representing countries with larger populations. Notably, some countries with relatively lower GDPs exhibit high internet usage percentages, suggesting that factors beyond wealth, such as infrastructure development and government policies, also influence internet accessibility and adoption.
    
    Furthermore, there are regional clusters apparent in the plot. For instance, European countries tend to have higher GDPs and internet usage percentages compared to countries in Africa and South America. However, outliers exist within each region, emphasizing the diverse economic and social landscapes influencing internet usage globally.`

    // Group data by 'country'
    const groupedData: { [key: string]: any[] } = data.reduce((groups, item) => {
        const groupName = item['country'];
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(item);
        return groups;
    }, {});

    // custom scaling logic 
    function scaleMarkerSize(size: number): number {
        // factor to control the size scaling
        const factor = 0.0015;
        return Math.sqrt(size) * factor;
    }

    function getContinentColor(continent: string): string {
        // Return color based on continent
        const continentColors: { [key: string]: string } = {
            Europe: '#c23728',
            Asia: '#63bff0',
            Africa: '#0057B2',
            'North America': '#5e569b',
            'South America': '#e1a692',
            Oceania: '#c23728',
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
            <CardHeaderOptions title="Internet Usage Across Nations: A Comparative Analysis 2022" paragraphText={paragraphText} link="https://www.gapminder.org/data/" sourceText="www.gapminder.org/data/" />
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
                            xaxis: {
                                title: 'GDP per captita (US$)', titlefont: {
                                    size: 13,
                                }
                            },
                            yaxis: {
                                title: 'Individuals using the Internet (% of population)',
                                titlefont: {
                                    size: 13,
                                }
                            },
                            legend: {
                                x: 1,
                                y: 0,
                                font: {
                                    size: 9.5
                                }
                            },
                            margin: {
                                l: 60,
                                r: 60,
                                b: 60,
                                t: 0,
                            }
                        }}
                    />
            }
        </section>
    );
}