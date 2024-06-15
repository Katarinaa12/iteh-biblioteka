import { format } from 'date-fns'

export function formatDateString(dateString: string | number) {
    if (!dateString) {
        return '/'
    }
    return format(dateString, 'dd.MM.yyyy HH:mm');
}