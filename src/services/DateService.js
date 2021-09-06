export class DateService {
    static getDaysOfMonth(date) {

    }
    static addMonth(date, diff) {

    }

    static isToday(date, newDate) {
        return (date.getDate() === newDate.getDate()
            && date.getMonth() === newDate.getMonth()
            && date.getFullYear() === newDate.getFullYear());
    }

}