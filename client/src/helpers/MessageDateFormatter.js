import moment from 'moment';
export const MessageDateFormatter = (date) => {
    const diff = moment().diff(date, 'day');
    let formattedDate = '';
    if (diff <= 1) {
        formattedDate = moment(date).format('LT')
    }
    else if (diff > 1 && diff <= 7) {
        formattedDate = moment(date).format('dddd')
    }
    else {
        formattedDate = moment(date).subtract(10, 'days').format('DD/MM/YYYY');
    }
    return formattedDate;
}