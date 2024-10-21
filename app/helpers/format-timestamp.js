import { helper } from '@ember/component/helper';

export default helper(function formatTimestamp([timestamp]) {
  const year = timestamp.slice(0, 4);
  const month = timestamp.slice(4, 6);
  const day = timestamp.slice(6, 8);
  const hour = timestamp.slice(8, 10);
  const minute = timestamp.slice(10, 12);
  const second = timestamp.slice(12, 14);

  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
  
  const options = { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false
  };

  return date.toLocaleDateString('en-US', options).replace(',', '');
});
