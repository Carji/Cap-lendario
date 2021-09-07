import { DateService } from './DateService.js'

export class FormatService {
    static getTime(date) {
        return new Intl.DateTimeFormat('es-ES', { timeStyle: 'medium' }).format(date);
    }
    static getSystemDate(date) {
        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' }).format(date);
    }
    // static getMonthDate(date) {
    //     //  return 'Septiembre de 2021'
    //     let options = { year: 'numeric', month: 'long' };
    //     return new Intl.DateTimeFormat('es-ES', options).format(date);
    // }
    // static getSelectedDate(date) {
    //     let optionsSelected = { weekday: 'long', day: 'numeric' };
    //     return DateService.isToday(date, new Date()) ? ' Today ' : new Intl.DateTimeFormat('es-ES', optionsSelected).format(date);

    static getMonthDate(date) {
        //  return 'Septiembre de 2021'
        return new Intl.DateTimeFormat('es-ES',  {  month: 'long',year: 'numeric' }).format(date);
    }
    static getSelectedDate(date) {
        return DateService.isToday(date, new Date()) ? ' Today ' : new Intl.DateTimeFormat('es-ES',{ weekday: 'long', day: 'numeric' }).format(date);
    }
}