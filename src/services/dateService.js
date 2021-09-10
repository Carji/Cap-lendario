function getFirstDayCalendar(date) {
    date.setDate(1);
    while (date.getDay() != 1) { date.setDate(date.getDate() - 1); }
}

export class DateService {

    static getDaysOfMonth(date) {
        debugger;
        let calendar = [];
        getFirstDayCalendar(date);
        let i = 1;
        for (i = 0; i < 42; i++) {
            calendar.push(new Date(date));
            date.setDate(date.getDate() + 1);
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
