/* eslint-disable no-param-reassign */
import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import {
  Table as TableWrap,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import Paper from '@mui/material/Paper';
import {IMediaStatus} from '@type/models/mediaStatus';
import Loading from '@components/common/Loading';

interface Columns {
  id: string;
  label: string;
  minWidth: number;
}

interface TabelProps {
  queryResult: {
    data: IMediaStatus[] | undefined;
    isLoading: boolean;
  };
}

export default function Table({queryResult: {data, isLoading}}: TabelProps) {
  const [channelList, setChannelList] = useState<string[] | []>([]);
  const [columnsTotal, setColumnsTotal] = useState<null | Record<
    string,
    number
  >>(null);
  const [groupByChannel, setGroupByChannel] = useState<null | Record<
    string,
    IMediaStatus
  >>(null);

  const columns: Columns[] = [
    {id: 'cost', label: '광고비', minWidth: 150},
    {id: 'convValue', label: '매출', minWidth: 150},
    {id: 'roas', label: 'ROAS', minWidth: 150},
    {id: 'imp', label: '노출 수', minWidth: 150},
    {id: 'click', label: '클릭 수', minWidth: 150},
    {id: 'ctr', label: '클릭률 (CTR)', minWidth: 150},
    {id: 'cpc', label: '클릭당비용(CPC)', minWidth: 150},
    {id: 'cpa', label: '액션당비용(CPA)', minWidth: 150},
  ];

  function addKeyValue(target: any, rest: any) {
    const keys = [...new Set([...Object.keys(target), ...Object.keys(rest)])];

    keys.forEach(key => {
      target[key] = target[key] || 0;
      target[key] += rest[key] || 0;
    });

    return target;
  }

  function handleGroupByChannel() {
    const results: any = {};
    if (!data) return results;

    data.forEach(({channel, ...rest}) => {
      if (rest.date) delete rest.date;

      if (results[channel] === undefined) {
        results[channel] = {
          ...rest,
        };
      } else {
        results[channel] = addKeyValue(results[channel], rest);
      }
    });

    return results;
  }

  function calculateTotal(results: any, initChannelList: string[]) {
    let initColumnsTotal: any;

    // eslint-disable-next-line array-callback-return
    initChannelList.map((channel, index) => {
      if (!index) {
        initColumnsTotal = {...results[channel]};
      } else {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(results[channel])) {
          initColumnsTotal[key] += value;
        }
      }
    });

    return initColumnsTotal;
  }

  useEffect(() => {
    const results = handleGroupByChannel();

    const initChannelList = Object.keys(results);

    setChannelList(initChannelList);
    setGroupByChannel(results);

    const initColumnsTotal = calculateTotal(results, initChannelList);

    setColumnsTotal({...initColumnsTotal});
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <TableContainer component={Paper}>
      <TableWrap sx={{minWidth: 650, overflow: 'hidden'}}>
        <CustomTableHead>
          <TableRow>
            <TableCell style={{minWidth: 150}} />
            {columns.map(column => (
              <TableCell
                key={column.id}
                align="right"
                style={{minWidth: column.minWidth}}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {channelList &&
            groupByChannel &&
            channelList.length > 0 &&
            channelList.map(channel => (
              <TableRow
                key={channel}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {channel}
                </TableCell>
                <TableCell align="right">
                  {Math.floor(groupByChannel[channel].cost).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {Math.floor(
                    groupByChannel[channel].convValue,
                  ).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {Math.floor(groupByChannel[channel].roas).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {Math.floor(groupByChannel[channel].imp).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {Math.floor(groupByChannel[channel].click).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {Math.floor(groupByChannel[channel].ctr).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {Math.floor(groupByChannel[channel].cpc).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {Math.floor(groupByChannel[channel].cpa).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          {columnsTotal && (
            <CustomTableRow>
              <TableCell>총계</TableCell>
              <TableCell align="right">
                {Math.floor(columnsTotal.cost).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {Math.floor(columnsTotal.roas).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {Math.floor(columnsTotal.roas).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {Math.floor(columnsTotal.imp).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {Math.floor(columnsTotal.click).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {Math.floor(columnsTotal.ctr).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {Math.floor(columnsTotal.cpc).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {Math.floor(columnsTotal.cpa).toLocaleString()}
              </TableCell>
            </CustomTableRow>
          )}
        </TableBody>
      </TableWrap>
    </TableContainer>
  );
}

const CustomTableHead = styled(TableHead)`
  background: ${({theme}) => theme.background.table};
`;

const CustomTableRow = styled(TableRow)`
  td {
    color: blue;
  }
`;
