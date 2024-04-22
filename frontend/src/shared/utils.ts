export const getNormalTime = (date: Date): string => {
    const temp = date.toLocaleDateString().split('/');
    const result =  String(date.getHours()) + ':' + String(date.getMinutes()) + ' ' + temp;
    return result;
}