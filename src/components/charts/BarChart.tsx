import React from 'react';
import {
  BarChart as BarChartGraph,
  Bar as BarGraph,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {IMediaStatus} from '@type/models/mediaStatus';

interface BarChartProps {
  queryResult: any;
}

export default function BarChart({queryResult}: BarChartProps) {
  const [mediaData, setMediaData] = React.useState<Array<object>>([]);
  const [mediaStatus, setMediaStatus] = React.useState({
    google: {cost: 0, convValue: 0, imp: 0, cvr: 0, click: 0},
    naver: {cost: 0, convValue: 0, imp: 0, cvr: 0, click: 0},
    facebook: {cost: 0, convValue: 0, imp: 0, cvr: 0, click: 0},
    kakao: {cost: 0, convValue: 0, imp: 0, cvr: 0, click: 0},
  });
  // 광고비:cost / 매출:sale / 노출수:imp / 클릭수: click / 전환수:cvr
  React.useEffect(() => {
    if (queryResult.isLoading === true) return;
    function getMediaStatus() {
      const newMediaStatus = queryResult.data.reduce(
        (acc: IMediaStatus, current: IMediaStatus) => {
          if (!acc[current.channel]) {
            acc[current.channel] = {
              convValue: 0,
              cost: 0,
              imp: 0,
              cvr: 0,
              click: 0,
            };
          }
          return {
            ...acc,
            [current.channel]: {
              cost: acc[current.channel].cost + current.cost,
              convValue: acc[current.channel].convValue + current.convValue,
              imp: acc[current.channel].imp + current.imp,
              cvr: acc[current.channel].cvr + current.cvr,
              click: acc[current.channel].click + current.click,
            },
          };
        },
        {},
      );
      setMediaStatus(newMediaStatus);
    }
    getMediaStatus();
    setMediaData([
      {
        name: '노출수',
        google: mediaStatus?.google.imp,
        naver: mediaStatus?.naver.imp,
        facebook: mediaStatus?.facebook.imp,
        kakao: mediaStatus?.kakao.imp,
      },
      {
        name: '광고비',
        google: mediaStatus?.google.cost,
        naver: mediaStatus?.naver.cost,
        facebook: mediaStatus?.facebook.cost,
        kakao: mediaStatus?.kakao.cost,
      },
      {
        name: '클릭 수',
        google: mediaStatus?.google.click,
        naver: mediaStatus?.naver.click,
        facebook: mediaStatus?.facebook.click,
        kakao: mediaStatus?.kakao.click,
      },
      {
        name: '매출',
        google: mediaStatus?.google.convValue,
        naver: mediaStatus?.naver.convValue,
        facebook: mediaStatus?.facebook.convValue,
        kakao: mediaStatus?.kakao.convValue,
      },
      {
        name: '전환수',
        google: Math.ceil(mediaStatus.google.cvr),
        naver: Math.ceil(mediaStatus.naver.cvr),
        facebook: Math.ceil(mediaStatus.facebook.cvr),
        kakao: Math.ceil(mediaStatus.kakao.cvr),
      },
    ]);
  }, [queryResult]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChartGraph
        width={500}
        height={200}
        data={mediaData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        stackOffset="expand"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" type="category" />
        <YAxis
          type="number"
          tickFormatter={tick => `${tick * 100}%`}
          ticks={[0.2, 0.4, 0.6, 0.8, 1]}
        />
        <Tooltip />
        <Legend align="right" />
        <BarGraph
          dataKey="facebook"
          stackId="media"
          barSize={30}
          fill="#8884d8"
        />
        <BarGraph dataKey="naver" stackId="media" fill="#82ca9d" />
        <BarGraph dataKey="google" stackId="media" fill="#86304d" />
        <BarGraph dataKey="kakao" stackId="media" fill="#3d3f85" />
      </BarChartGraph>
    </ResponsiveContainer>
  );
}
