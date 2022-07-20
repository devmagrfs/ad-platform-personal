import React from 'react';
import styled from '@emotion/styled';
import {format} from 'date-fns';

import {IAds} from '@type/models/management';
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
  const adItemList: string[] = [
    '상태',
    '광고생성일',
    '일 희망 예산',
    '광고수익률',
    '매출',
    '광고비용',
  ];

  const changeFormData = (data: IAds) => {
    const date = new Date(data.startDate);

    return [
      data.status === 'active' ? '진행중' : '종료',
      format(date, 'yyyy-MM-dd'),
      `${Math.round(data.budget / 10000).toLocaleString()}만원`,
      `${data.report.roas}%`,
      `${Math.round(data.report.convValue / 10000).toLocaleString()}만원`,
      `${Math.round(data.report.cost / 10000).toLocaleString()}만원`,
    ];
  };
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
