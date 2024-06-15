import { format } from 'date-fns'
import { mkConfig, generateCsv, download } from "export-to-csv";
export function formatDateString(dateString: string | number) {
    if (!dateString) {
        return '/'
    }
    return format(dateString, 'dd.MM.yyyy HH:mm');
}


export function generateCsvFileFromData(data: any[], fileName: string) {
    const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: fileName, fieldSeparator: ';' });
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv)
}