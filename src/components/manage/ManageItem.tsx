import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useMutation} from 'react-query';
import {IAds, IAdsUpdate} from '@src/types/models/management';

import {adCreate, adUpdate, adDelete} from '@src/api/queries';
import {currentIDState} from '../../api/selectors';

interface ItemProps {
  item: IAds;
}

export default function ManageItem(props: ItemProps) {
  const {item} = props;
  const currentID = useRecoilValue(currentIDState);
  const setCurrentID = useSetRecoilState(currentIDState);
  const addMutation = useMutation(adCreate);
  const updateMutation = useMutation(adUpdate);
  const deleteMutation = useMutation(adDelete);
  const handleModal = () => {
    setCurrentID(item.id);
  };
  const handleSubmit = () => {
    const newAd: IAds = {
      id: +uuidv4(),
      adType: 'app',
      title: '광고',
      budget: Math.floor(Math.random() * 10 ** 5),
      status: 'active',
      startDate: '2022-02-10T00:00:00',
      endDate: null,
      report: {
        cost: 9300222,
        convValue: 38234789,
        roas: 411,
      },
    };
    addMutation.mutate(newAd);
  };
  const handleUpdate = () => {
    const newAd: IAdsUpdate = {
      title: '광고',
    };
    updateMutation.mutate({currentID, newAd});
  };
  const handleDelete = () => {
    deleteMutation.mutate(currentID);
  };

  return (
    <div>
      <p>{item.title}</p>
      <p>{item.budget}</p>
      <p>{item.status}</p>
      <button type="button" onClick={handleModal}>
        modal
      </button>
      <button type="button" onClick={handleSubmit}>
        submit
      </button>
      <button type="button" onClick={handleUpdate}>
        update
      </button>
      <button type="button" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
}
