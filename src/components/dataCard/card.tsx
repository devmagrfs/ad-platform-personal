import React from 'react';
import styled from '@emotion/styled';
// import {IDailyAdStatus} from '@type/models/advertise';

//  IDailyAdStatus[]
function Card({info}: any) {
  // roas, 전환수(conv),
  function calculate(category: any) {
    const result =
      info.reduce((acc: number, cur: any) => acc + cur[category], 0) / 7;
    return parseInt(String(result), 10);
  }
  // 전환수(conv), 광고비(cost) 클릭수(click), 노출수(imp), 매출(cost)
  function calculateSum(category: any) {
    let result = info.reduce((acc: number, cur: any) => acc + cur[category], 0);
    result = String(result);
    if (result.length > 4) {
      result = result.slice(0, result.length - 4);
      return `${result}만`;
    }
    return result;
  }

  return (
    <Container>
      {info !== undefined ? (
        <>
          <Div>
            <Title>ROAS</Title>
            <Content>{calculate('roas')}%</Content>
            <div>18%</div>
          </Div>
          <Div>
            <Title>광고비</Title>
            <Content>{calculateSum('cost')} 원</Content>
            <div>18%</div>
          </Div>
          <Div>
            <Title>노출 수</Title>
            <Content>{calculateSum('imp')} 회</Content>
            <div>18%</div>
          </Div>
          <Div>
            <Title>클릭 수</Title>
            <Content>{calculateSum('click')} 회</Content>
            <div>18%</div>
          </Div>
          <Div>
            <Title>전환 수</Title>
            <Content>{calculateSum('conv')}회</Content>
            <div>18%</div>
          </Div>
          <Div>
            <Title>매출</Title>
            <Content>{calculateSum('cost')} 원</Content>
            <div>18%</div>
          </Div>
        </>
      ) : null}
    </Container>
  );
}

export default Card;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Div = styled.div`
  width: 200px;
  height: 200px;
  background: #ffffff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  @media screen and (max-width: 1620px) {
    width: 150px;
    height: 150px;
  }
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #414345;
  margin-bottom: 12px;
  @media screen and (max-width: 1620px) {
    font-size: 18px;
  }
`;
const Content = styled.div`
  font-weight: 700;
  font-size: 36px;
  color: #414345;
  margin-bottom: 12px;
  @media screen and (max-width: 1620px) {
    font-size: 27px;
  }
`;
