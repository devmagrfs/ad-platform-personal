import React from 'react';
import styled from '@emotion/styled';
import {useSetRecoilState} from 'recoil';
import {useDeleteMutation, useAdListQuery} from '@hooks/queries/ad';
import ManageItem from '@components/manage/ManageItem';
import {IAds} from '@type/models/management';
import currentIDState from '@api/atom';
import {ManageItemSkeleton} from '@components/manage/ad';

interface IManageListProps {
  type: string;
  handleModalChange: () => void;
}

export default function ManageList({
  type,
  handleModalChange,
}: IManageListProps) {
  const {isLoading, data} = useAdListQuery();

  const setCurrentID = useSetRecoilState(currentIDState);

  const deleteMutation = useDeleteMutation();

  const handleDeleteData = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleUpdateData = (id: number) => {
    handleModalChange();
    setCurrentID(id);
  };

  const adselectData =
    type === 'all' ? data : data?.filter(item => item.status === type);

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
        adselectData?.map((ad: IAds) => (
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
