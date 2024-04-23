export const getNormalTime = (date: Date): string => {
    return date.toLocaleString().split(',')[0];
}