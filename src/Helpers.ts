export function dateToStringHours(date: Date): string {
    return date.getHours() === 0 ? "24" : date.getHours().toString();
}

export function dateToStringMinutes(date: Date): string {
    if (date.getMinutes() < 10) {
        return "0" + date.getMinutes();
    }
    return date.getMinutes().toString();
}

export function dateToStringHnM(date: Date): string {
    return `${dateToStringHours(date)}:${dateToStringMinutes(date)}`;
}