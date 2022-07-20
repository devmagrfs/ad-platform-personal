/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import styled from '@emotion/styled';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSetRecoilState} from 'recoil';
import {useMutation, useQueryClient} from 'react-query';
import {Alert} from '@mui/material';

import {IAds, IFormInput} from '@type/models/management';
import {adCreate, adUpdate} from '@api/queries';
import {createFormData, validationSchema, setValueFormDate} from '@utils/.';
import currentIDState from '@api/atom';

interface IAdFormProps {
  data: null | IAds;
  handleModalChange: () => void;
}

export default function AdForm({data, handleModalChange}: IAdFormProps) {
  const setCurrentID = useSetRecoilState(currentIDState);

  const queryClient = useQueryClient();

  const addMutation = useMutation(adCreate, {
    onSuccess: () => queryClient.invalidateQueries('ads'),
  });
  const updateMutation = useMutation(adUpdate, {
    onSuccess: () => queryClient.invalidateQueries('ads'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (data) setValueFormDate(setValue, data);
  }, [data]);

  const handleSubmitForm: SubmitHandler<IFormInput> = formData => {
    const newAd = data
      ? createFormData(data, formData)
      : createFormData(null, formData);
    if (data) {
      const currentID = data.id;
      updateMutation.mutate({currentID, newAd});
    } else {
      addMutation.mutate(newAd);
    }
    handleModalChange();
    setCurrentID(-1);
  };

  const handleCancleForm = () => {
    handleModalChange();
    setCurrentID(-1);
  };

  return (
    <Form onSubmit={handleSubmit(handleSubmitForm)}>
      <Title>
        <TitleInput {...register('title')} placeholder="제목을 입력해주세요" />
      </Title>
      {errors?.title && <Alert severity="error">{errors.title.message}</Alert>}

      <SelectWrap>
        <Item>광고 유형</Item>
        <Select {...register('adType')}>
          <Option value="web">웹광고</Option>
          <Option value="app">앱광고</Option>
        </Select>
      </SelectWrap>
      <ItemWrap>
        <Item>광고 시작일</Item>
        <Input
          {...register('startDate')}
          placeholder="시작일을 설정해 주세요"
          type="date"
        />
      </ItemWrap>
      {errors?.startDate && (
        <Alert severity="error">{errors.startDate.message}</Alert>
      )}
      <ItemWrap>
        <Item>광고 종료일</Item>
        <Input
          {...register('endDate')}
          placeholder="종료일을 설정해 주세요"
          type="date"
        />
      </ItemWrap>
      {errors?.endDate && (
        <Alert severity="error">{errors.endDate.message}</Alert>
      )}
      <ItemWrap>
        <Item>일 희망 예산</Item>
        <Input
          {...register('budget')}
          placeholder="숫자만 입력해주세요"
          type="number"
        />
      </ItemWrap>
      {errors.budget && <Alert severity="error">{errors.budget.message}</Alert>}
      <ItemWrap>
        <Item>광고수익률</Item>
        <Input
          {...register('roas')}
          placeholder="숫자만 입력해주세요"
          type="number"
        />
      </ItemWrap>
      {errors?.roas && <Alert severity="error">{errors.roas.message}</Alert>}
      <ItemWrap>
        <Item>매출</Item>
        <Input
          {...register('convValue')}
          placeholder="숫자만 입력해주세요"
          type="number"
        />
      </ItemWrap>
      {errors?.convValue && (
        <Alert severity="error">{errors.convValue.message}</Alert>
      )}
      <ItemWrap>
        <Item>광고비용</Item>
        <Input
          {...register('cost')}
          placeholder="숫자만 입력해주세요"
          type="number"
        />
      </ItemWrap>
      {errors?.cost && <Alert severity="error">{errors.cost.message}</Alert>}
      <ButtonContainer>
        <Button type="submit">저장</Button>
        <Button type="button" onClick={handleCancleForm}>
          취소
        </Button>
      </ButtonContainer>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
`;

const Title = styled.h1`
  margin-bottom: 5px;
`;

const TitleInput = styled.input`
  font-size: 28px;
  width: 100%;
  padding: 15px 25px 15px 5px;
  border-radius: 10px;
  font-weight: 700;
  color: #4a4a4a;
  :focus {
    box-sizing: border-box;
    background: rgba(52, 124, 234, 0.1);
  }
`;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;

  input::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  input[type='date'] {
    position: relative;
    min-height: 30px;
    padding: 11px 13px;
    border: 1px solid #ccc;
    font-size: 15px;
    color: #4a4a4a;
    font-weight: 500;
    border-radius: 10px;
  }
  input[type='date']::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }
`;

const SelectWrap = styled(ItemWrap)`
  margin-top: 20px;
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0 10px;
  height: 45px;
  :focus {
    background: rgba(52, 124, 234, 0.2);
    border: 1px solid rgba(52, 124, 234, 0.2);
  }
  :hover {
    background: rgba(52, 124, 234, 0.2);
  }
`;

const Option = styled.option`
  font-size: 16px;
  font-weight: 200;
  padding: 10px;
  background-color: #fff;
  :hover {
    background: rgba(52, 124, 234, 0.2);
  }
`;

const Item = styled.div`
  margin: 2.3vh 10px;
  width: 180px;
  font-size: 18px;
  text-align: left;
  font-weight: 500;
  color: ${({theme}) => theme.color.grey_01};
  @media ${({theme}) => theme.size.mobile} {
    font-size: 16px;
    margin: 17px 5px;
  }
`;
const Input = styled.input`
  width: 100%;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  :focus {
    border-bottom: 1px solid #1976d2;
  }
  ::placeholder {
    font-size: 16px;
    color: #4a4a4a;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  margin: 50px 0 0;
  button {
    margin-left: 20px;
  }
`;

const Button = styled.button`
  border-radius: 10px;
  font-size: 14px;
  color: #4a4a4a;
  border: 1px solid #b4b4b4;
  font-weight: 600;
  padding: 10px 20px;
  background: #fff;
  :hover {
    background: #1976d2;
    color: #fff;
    border: 1px solid #1976d2;
  }
`;
