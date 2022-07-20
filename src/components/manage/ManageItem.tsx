import React from 'react';
import styled from '@emotion/styled';

import {IAds} from '@type/models/management';
import {adItemList, changeFormData} from '@utils/.';
import {AdItem, Button} from '@components/manage/ad';

interface IItemProps {
  ad: IAds;
  /* eslint-disable no-unused-vars */
  handleUpdateData: (id: number) => void;
  handleDeleteData: (id: number) => void;
}

export default function ManageItem({
  ad,
  handleUpdateData,
  handleDeleteData,
}: IItemProps) {
  const changeData = changeFormData(ad);

  return (
    <ManageItemContainer>
      <AdCard>
        <AdTitle>{ad.title}</AdTitle>
        <AdItemList>
          {adItemList.map((item, index) => (
            <AdItem title={item} data={changeData[index]} key={item} />
          ))}
        </AdItemList>
        <ButtonWrap>
          <Button onClick={() => handleUpdateData(ad.id)}>수정</Button>
          <Button onClick={() => handleDeleteData(ad.id)}>삭제</Button>
        </ButtonWrap>
      </AdCard>
    </ManageItemContainer>
  );
}

const ManageItemContainer = styled.div`
  margin: 0 1vw 30px 1vw;
`;

const AdCard = styled.div`
  width: 350px;
  height: 500px;
  background: #ffffff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: 30px;
`;

const AdTitle = styled.h1`
  font-weight: 700;
  font-size: 24px;
  padding-bottom: 50px;
`;

const AdItemList = styled.div`
  margin-bottom: 40px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: right;
  button {
    margin-left: 20px;
  }
`;
