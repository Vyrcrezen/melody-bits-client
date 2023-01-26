
export function getDateString(timeNum?: string) {
  let dateString = "";

  if (timeNum && !isNaN(+timeNum)) {

    dateString = new Date(+timeNum).toISOString();
    
    dateString = dateString.substring(0, dateString.lastIndexOf('.'))
    .replace('-', '.')
    .replace('-', '.')
    .replace('T', ' ');
  }
  else {

    dateString = new Date(0).toISOString();
    
    dateString = dateString.substring(0, dateString.lastIndexOf('.'))
    .replace('-', '.')
    .replace('-', '.')
    .replace('T', ' ');
  }

  return `${dateString} (GMT)`;
}
