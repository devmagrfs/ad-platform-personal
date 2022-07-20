import React, {useState} from 'react';
import {Button, SelectChangeEvent} from '@mui/material';
import styled from '@emotion/styled';
import {useRecoilValue} from 'recoil';

import {ManageList} from '@components/manage';
import DropDown from '@components/dropdown/DropDown';
import {AdModal} from '@components/manage/ad';
import currentIDState from '@api/atom';

export default function Manage() {
  const [type, setType] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const currentID = useRecoilValue(currentIDState);

  const adSelectTypeList = [
    ['all', '전체광고'],
    ['active', '진행광고'],
    ['ended', '종료된광고'],
  ];

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
  };

  const handleModalChange = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isModalOpen && (
        <AdModal handleModalChange={handleModalChange} id={currentID} />
      )}
      <ManageContainer>
        <Title>광고관리</Title>
        <Wrap>
          <DropDown
            handleChange={handleTypeChange}
            optionData={adSelectTypeList}
            defaultValue="all"
          />
          <Button variant="contained" onClick={handleModalChange}>
            광고만들기
          </Button>
        </Wrap>
        <ManageList type={type} handleModalChange={handleModalChange} />
      </ManageContainer>
    </>
  );
}

const Wrap = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  button {
    font-size: 20px;
    font-weight: 400;
    border-radius: 10px;
    width: 170px;
    padding: 11px 20px;
    :hover {
      background-color: #fff;
      color: #1976d2;
    }
  }
`;

const ManageContainer = styled.div`
  padding: 50px 30px;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 30px;
`;
