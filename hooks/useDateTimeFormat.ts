import { useTranslation } from 'react-i18next';

/**
 * Custom hook for formatting dates and times according to the current language
 */
export function useDateTimeFormat() {
    const { i18n } = useTranslation();
    const isFrench = i18n.language === 'fr';

    const formatDate = (date: Date | string): string => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        if (isNaN(dateObj.getTime())) {
            return typeof date === 'string' ? date : '';
        }

        if (isFrench) {
            // French format: YYYY-MM-DD
            return dateObj.toLocaleDateString('fr-CA');
        } else {
            // English format: MM/DD/YYYY
            return dateObj.toLocaleDateString('en-US');
        }
    };

    const formatTime = (date: Date | string): string => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        if (isNaN(dateObj.getTime())) {
            return typeof date === 'string' ? date : '';
        }

        if (isFrench) {
            // French format: 24-hour (HH:MM)
            return dateObj.toLocaleTimeString('fr-CA', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        } else {
            // English format: 12-hour with AM/PM
            return dateObj.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
    };

    const formatDateTime = (date: Date | string): string => {
        return `${formatDate(date)} ${formatTime(date)}`;
    };

    return { formatDate, formatTime, formatDateTime, isFrench };
}
