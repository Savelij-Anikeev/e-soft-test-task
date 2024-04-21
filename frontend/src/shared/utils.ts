export const getNormalTime = (date: Date): string => {
    const temp = date.toLocaleDateString().split('/');
    const result =  + temp[0] + '/' + temp[1] + ' ' +
    String(date.getHours()) + ':' + String(date.getMinutes());
    return result;
}