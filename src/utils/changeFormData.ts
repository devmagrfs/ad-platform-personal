import {format} from 'date-fns';

import {IAds} from '@type/models/management';
import {comma} from '@utils/.';

const changeFormData = (data: IAds) => {
  const date = new Date(data.startDate);

  return [
    data.status === 'active' ? '진행중' : '종료',
    format(date, 'yyyy-MM-dd'),
    `${comma(Math.round(data.budget / 10000))}만원`,
    `${data.report.roas}%`,
    `${comma(Math.round(data.report.convValue / 10000))}만원`,
    `${comma(Math.round(data.report.cost / 10000))}만원`,
  ];
};

export default changeFormData;
