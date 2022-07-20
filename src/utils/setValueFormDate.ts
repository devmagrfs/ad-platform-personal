import {format} from 'date-fns';
import {UseFormSetValue} from 'react-hook-form';

import {IFormInput, IAds} from '@type/models/management';

const setValueFormDate = (
  setValue: UseFormSetValue<IFormInput>,
  data: IAds,
) => {
  setValue('title', data.title);
  setValue('startDate', format(new Date(data.startDate), 'yyyy-MM-dd'));
  setValue(
    'endDate',
    data.endDate === null ? '' : format(new Date(data.endDate), 'yyyy-MM-dd'),
  );
  setValue('budget', data.budget);
  setValue('cost', data.report.cost);
  setValue('roas', data.report.roas);
  setValue('convValue', data.report.convValue);
  setValue('adType', data.adType);
};

export default setValueFormDate;
