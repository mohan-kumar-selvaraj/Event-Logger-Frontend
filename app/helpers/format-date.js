// app/helpers/format-date.js
import { helper } from '@ember/component/helper';

export default helper(function formatDate([timestamp]) {
  const milliseconds = parseInt(timestamp.replace("/Date(", "").replace(")/", ""));
  return new Date(milliseconds).toLocaleString();
});
