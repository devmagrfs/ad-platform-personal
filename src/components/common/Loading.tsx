import React from 'react';
import styled from '@emotion/styled';
import {CircularProgress} from '@mui/material';

export default function Loading() {
  return (
    <LoadingWrap>
      <CircularProgress />
    </LoadingWrap>
  );
}

const LoadingWrap = styled.div`
  width: 100px;
  height: 100px;
  margin: 300px auto;
`;
