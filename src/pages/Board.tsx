import React, {useState, useEffect} from 'react';
import {useQueries, useQueryClient} from 'react-query';
import styled from '@emotion/styled';
import {getDay, format, add} from 'date-fns';
import {SelectChangeEvent} from '@mui/material';
import previousMonday from 'date-fns/previousMonday';

import {getReport, getChannel, getAllReports} from '@api/queries';
import DropDown from '@components/dropdown/DropDown';
import Table from '@components/table/Table';
import {BarChart as Bar, LineChart} from '@components/charts';
import Card from '@components/dataCard/card';
import {IDailyAdStatus} from '@type/models/advertise';

export default function Board() {
  const queryClient = useQueryClient();
  const [dateList, setDateList] = useState<any>([]);
  const [type, setType] = useState('2022-02-07');
  const queryResult = useQueries([
    {
      queryKey: ['allReports'],
      queryFn: getAllReports,
    },
    {
      queryKey: ['report', type],
      queryFn: () => getReport(new Date(type)),
    },
    {
      queryKey: ['channel', type],
      queryFn: () => getChannel(new Date(type)),
    },
  ]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const index = Number(event.target.value);
    const changeType = dateList[index][1].slice(0, 10);
    setType(String(changeType));
    queryClient.invalidateQueries(type);
  };

  function DateList(data: IDailyAdStatus[]) {
    const result = [];
    let count = -1;
    for (let i = 0; i < data.length; i += 1) {
      const findDay = getDay(new Date(data[i].date));
      if (findDay === 1) {
        const endDate = format(
          add(new Date(data[i].date), {days: 6}),
          'yyyy-MM-dd',
        );
        count += 1;
        result.push([String(count), `${data[i].date}-${endDate}`]);
        i += 6;
      }
    }
    return result;
  }

  useEffect(() => {
    if (queryResult[0].isLoading || queryResult[0].isError || dateList.length)
      return;
    setDateList(() => [...DateList(queryResult[0].data)]);
  }, [queryResult]);
  const {isLoading} = queryResult[0];

  const previousDay = previousMonday(new Date(type));
  const changeType = format(new Date(previousDay), 'yyyy-MM-dd');

  return (
    <BoardContainer isLoading={isLoading}>
      <DashBoard>
        <Title DashBoard>대시보드</Title>
        <DateSelection>
          <DropDown handleChange={handleChange} optionData={dateList} />
        </DateSelection>
      </DashBoard>
      <IntegrationAd>
        <Title>통합 광고 현황</Title>
        <DataBox>
          <DataCard>
            <Card info={queryResult[1].data} type={changeType} />
          </DataCard>
          <GraphChart>
            <LineChart
              chartData={queryResult[1].data}
              isLoading={queryResult[1].isLoading}
            />
          </GraphChart>
        </DataBox>
      </IntegrationAd>
      <CurrentStateOfAd>
        <Title>매체 현황</Title>
        <DataBox>
          <BarChart>
            <Bar queryResult={queryResult[2]} />
          </BarChart>
          <Diagram>
            <Table queryResult={queryResult[2]} />
          </Diagram>
        </DataBox>
      </CurrentStateOfAd>
    </BoardContainer>
  );
}

const BoardContainer = styled.div<{isLoading: boolean}>`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 170vh;
  pointer-events: ${({isLoading}) => isLoading && 'none'};
`;
const DashBoard = styled.div`
  display: flex;
  height: 5.5vh;
  display: flex;
  flex: 0 1 auto;
`;
const IntegrationAd = styled.div`
  height: 40vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;
  top: -10px;
`;
const CurrentStateOfAd = styled.div`
  height: 40vh;
  padding: 2rem;
  flex: 1 1 auto;
`;
const Title = styled.div<{DashBoard?: any}>`
  width: ${props => (props.DashBoard ? '68vw' : '')};
  height: ${props => (props.DashBoard ? '46px' : '29px')};
  font-size: ${props => (props.DashBoard ? '32px' : '20px')};
  font-weight: 700;
  color: #4a4a4a;
  margin-top: ${props => (props.DashBoard ? '10px' : '')};
  position: relative;
  left: ${props => (props.DashBoard ? '30px' : '')};
  flex: 1 1 auto;
`;
const DateSelection = styled.div`
  flex: 0.4 1 auto;
  justify-content: flex-end;
`;
const DataBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  flex: 1 1 auto;
`;
const DataCard = styled.div`
  flex: 0.5 0 auto;
  margin-top: 10px;
`;
const GraphChart = styled.div`
  flex: 1 0 auto;
  margin-top: 10px;
`;
const BarChart = styled.div`
  flex: 1 0 auto;
`;

const Diagram = styled.div`
  flex: 0.9 0 auto;
`;
