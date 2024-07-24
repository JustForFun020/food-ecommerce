import moment from 'moment';

export const formatDate = (date: string, format: string = 'HH:mm DD/MM/YYYY') => {
  return moment(date).format(format);
};
