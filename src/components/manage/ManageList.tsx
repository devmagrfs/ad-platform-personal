import React from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import styled from '@emotion/styled';
import {useSetRecoilState} from 'recoil';

import {adSelectData} from '@src/utils';
import {adDelete, getAdsList} from '@src/api/queries';
import ManageItem from '@src/components/manage/ManageItem';
import {IAds} from '@src/types/models/management';
import currentIDState from '@src/api/atom';
import {ManageItemSkeleton} from './ad';

interface IManageListProps {
  type: string;
  handleModalChange: () => void;
}

export default function ManageList({
  type,
  handleModalChange,
}: IManageListProps) {
  const {isLoading, data} = useQuery<IAds[]>('ads', getAdsList);

  const queryClient = useQueryClient();
  const setCurrentID = useSetRecoilState(currentIDState);

  const deleteMutation = useMutation(adDelete, {
    onSuccess: () => queryClient.invalidateQueries('ads'),
  });

  const handleDeleteData = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleUpdateData = (id: number) => {
    handleModalChange();
    setCurrentID(id);
  };

  if (isLoading)
    return (
      <ManageListContainer>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
          <ManageItemSkeleton key={item} />
        ))}
      </ManageListContainer>
    );

  return (
    <ManageListContainer>
      {data &&
        adSelectData(data, type).map((ad: IAds) => (
          <ManageItem
            ad={ad}
            handleDeleteData={handleDeleteData}
            handleUpdateData={handleUpdateData}
            key={ad.id}
          />
        ))}
    </ManageListContainer>
  );
}

const ManageListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 30px 0;
  width: 81vw;
  margin: 0 auto;
  justify-content: start;
  @media ${({theme}) => theme.size.mobile} {
    width: 360px;
    margin: 0 auto;
  }
`;
