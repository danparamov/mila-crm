import moment from 'moment';

export default function nextContactDate(priority) {
  if (priority === 'Every two weeks') {
    return moment()
      .add(14, 'days')
      .calendar();
  }
  if (priority === 'Every month') {
    return moment()
      .add(30, 'days')
      .calendar();
  }
  if (priority === 'Every three months') {
    return moment()
      .add(90, 'days')
      .calendar();
  }
  if (priority === 'Every year') {
    return moment()
      .add(365, 'days')
      .calendar();
  }
}
