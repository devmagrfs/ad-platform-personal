import React, {useState} from 'react';
import * as Charts from 'recharts';
import {format, parseISO} from 'date-fns';
import styled from '@emotion/styled';
import DropDown from '@src/components/dropdown/DropDown';
import {SelectChangeEvent} from '@mui/material';
import chartSelectTypeList from '@utils/chartSelectTypeList';
import {IDailyAdStatus} from '../../types/models/advertise';

interface IProps {
  chartData: IDailyAdStatus[];
  isLoading: boolean;
}

export default function LineChart({chartData, isLoading}: IProps) {
  const [dataKey1, setDataKey] = useState<string>('roas');
  const [dataKey2, setDataKey2] = useState<string>('click');

  function getLinebyComparingeMax(line1: string, line2: string) {
    const line1Data = chartData
      .map((dailyAdStatus: any) => dailyAdStatus[line1])
      .sort((start, end) => end - start);

    const line2Data = chartData
      .map((dailyAdStatus: any) => dailyAdStatus[line2])
      .sort((start, end) => end - start);

    if (line1Data[0] < line2Data[0]) return line2;
    return line1;
  }

  const handleChange = (event: SelectChangeEvent<string>) => {
    event.stopPropagation();
    setDataKey(event?.target.value);
  };

  const handleChange2 = (event: SelectChangeEvent<string>) => {
    event.stopPropagation();
    setDataKey2(event?.target.value);
  };

  const formatXAxis = (tickItem: string) => {
    return format(parseISO(tickItem), 'MM월 dd일');
  };

  if (isLoading) return <div>로딩중...</div>;

  return (
    <Container>
      <DropwDownContainer>
        <DropDown
          handleChange={handleChange}
          optionData={chartSelectTypeList}
        />
        <DropDown
          handleChange={handleChange2}
          optionData={chartSelectTypeList}
        />
      </DropwDownContainer>
      <Charts.ResponsiveContainer width="100%" height="100%">
        <Charts.LineChart
          margin={{left: 20}}
          width={1050}
          height={350}
          data={chartData}
        >
          <Charts.CartesianGrid vertical={false} />
          <Charts.XAxis
            dataKey="date"
            padding={{left: 50, right: 50}}
            tickFormatter={formatXAxis}
          />
          <Charts.YAxis dataKey={getLinebyComparingeMax(dataKey1, dataKey2)} />
          <Charts.Tooltip />
          <Charts.Line
            type="monotone"
            dataKey={dataKey1}
            stroke="#8884d8"
            activeDot={{r: 5}}
            dot={false}
          />
          <Charts.Line
            type="monotone"
            dataKey={dataKey2}
            stroke="#82ca9d"
            activeDot={{r: 5}}
            dot={false}
          />
        </Charts.LineChart>
      </Charts.ResponsiveContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 24px 25px;
  gap: 26.96px;
`;

const DropwDownContainer = styled.div`
  display: flex;
  gap: 14.23px;
`;
