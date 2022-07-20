import React, {useState} from 'react';
import {Button, SelectChangeEvent} from '@mui/material';
import styled from '@emotion/styled';

import {ManageList} from '@src/components/manage';
import DropDown from '@src/components/dropdown/DropDown';
import {adSelectTypeList} from '@utils/.';
import {AdModal} from '@src/components/manage/ad';
import {useRecoilValue} from 'recoil';
import currentIDState from '@src/api/atom';

export default function Manage() {
  const [type, setType] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const currentID = useRecoilValue(currentIDState);

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
