import { parse } from 'csv-parse/sync';

export function parseCsv(csvData) {
    try {
        const parsedData = parse(csvData, {
            columns: true, // Treat the first row as headers
            skip_empty_lines: true // Skip empty lines
        });
        return parsedData;
    } catch (error) {
        console.error('Error parsing CSV:', error);
        return [];
    }
}