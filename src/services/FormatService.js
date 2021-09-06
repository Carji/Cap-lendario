import { DateService} from './DateService.js'

export class FormatService {
    static getTime(date) {
        return new Intl.DateTimeFormat('es-ES', { timeStyle: 'medium'}).format(date);
    }
    static getSystemDate(date) {
        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'full'}).format(date);
    }
    static getMonthDate(date) {
      //  return 'Septiembre de 2021'
        return 
    }
    static getSelectedDate(date) {
        return DateService.isToday(date,new Date())?' hoy ' : ' lo que me falta por ver'
    }
}