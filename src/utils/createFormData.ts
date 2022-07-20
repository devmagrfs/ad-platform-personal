import {differenceInDays, format} from 'date-fns';
import {IAds, IFormInput} from '@type/models/management';

const createFormData = (data: IAds | null, formData: IFormInput): IAds => {
  const start = format(new Date(formData.startDate), 'yyyy-MM-dd HH:mm:ss');

  const end =
    formData.endDate !== null
      ? format(new Date(formData.endDate), 'yyyy-MM-dd HH:mm:ss')
      : null;

  const diff = (date1: Date, date2: Date): string =>
    differenceInDays(date1, date2) < 0 ? 'ended' : 'active';

  const curStatus =
    formData.endDate === null
      ? 'active'
      : diff(new Date(), new Date(formData.endDate));

  const id = new Date().valueOf();

  const newAd: IAds = {
    id: data ? data.id : id,
    adType: formData.adType,
    status: data ? curStatus : 'active',
    title: formData.title,
    startDate: start,
    endDate: end,
    budget: formData.budget,
    report: {
      roas: formData.roas,
      convValue: formData.convValue,
      cost: formData.cost,
    },
  };

  return newAd;
};
export default createFormData;
