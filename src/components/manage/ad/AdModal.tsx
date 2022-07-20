import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';

import {AdForm, ModalSkeleton} from '@components/manage/ad';

import {getAdItem} from '@src/api/queries';

interface IAdModalProps {
  handleModalChange: () => void;
  id: number;
}

function AdModal({handleModalChange, id}: IAdModalProps) {
  const [data, setData] = useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getData = async () => {
    const getItem = await getAdItem(id);
    setData(getItem);
  };

  useEffect(() => {
    if (id === -1) return;
    setIsLoading(true);
    getData();
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, []);

  return (
    <Background>
      <AdModalContainer>
        {isLoading && <ModalSkeleton />}
        {!isLoading && (
          <AdForm handleModalChange={handleModalChange} data={data} />
        )}
      </AdModalContainer>
    </Background>
  );
}

export default AdModal;

const AdModalContainer = styled.div`
  position: absolute;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  width: 550px;
  height: 75vh;
  padding: 5vh 50px 3vh 40px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: ${({theme}) => theme.boxShadow.modal};
  overflow-y: scroll;
  @media ${({theme}) => theme.size.mobile} {
    width: 380px;
    height: 65vh;
    padding: 40px 30px 40px 25px;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(27, 26, 26, 0.5);
  z-index: 5;
`;
