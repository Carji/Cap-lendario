function getFirstDayCalendar(fecha) {
    fecha.setDate(1);
    while (fecha.getDay() != 1) { fecha.setDate(fecha.getDate() - 1); }
}

export class DateService {

    static getDaysOfMonth(date) {
        debugger;
        let calendar = [];
        getFirstDayCalendar(fecha);
        let i = 1;
        for (i = 0; i < 42; i++) {
            calendar.push(new Date(fecha));
            fecha.setDate(fecha.getDate() + 1);
        }
        return calendar;
    }

    static getNextOrPreviousMonth(date, diff) {
        date.setMonth(date.getMonth() + diff);
        return DateService.getDaysOfMonth(date);
    }
    static isToday(date, newDate) {
        return (date.getDate() === newDate.getDate()
            && date.getMonth() === newDate.getMonth()
            && date.getFullYear() === newDate.getFullYear())
    }

    static isThisMonth(date, newDate) {
        return date.getMonth() === newDate.getMonth() &&
        date.getFullYear() === newDate.getFullYear();
    }

}