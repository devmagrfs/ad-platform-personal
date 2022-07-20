import axios from 'axios';
import {add, format} from 'date-fns';

import {IAds} from '@type/models/management';

const BASE_URL = 'http://localhost:3001';

export const getReport = (date: Date) => getDataByDate(date, 'daily');
export const getChannel = (date: Date) => getDataByDate(date, 'channels');

async function getDataByDate(date: Date, category: string) {
  const startDate = format(new Date(date), 'yyyy-MM-dd');
  const endDate = format(add(new Date(startDate), {days: 6}), 'yyyy-MM-dd');
  const response = await axios.get(
    `${BASE_URL}/${category}?date_gte=${startDate}&date_lte=${endDate}`,
  );
  if (response.status !== 200) {
    throw new Error(`[${response.status}] ${response.statusText}`);
  }
  return response.data;
}

export const getAllReports = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/daily`);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const getAdsList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ads?_sort=id&_order=desc`);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const getAdItem = async (currentID: number) => {
  if (currentID === -1) return '';
  try {
    const response = await axios.get(`${BASE_URL}/ads/${currentID}`);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const adCreate = async (newAd: IAds) => {
  try {
    const response = await axios.post(`${BASE_URL}/ads`, newAd);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const adUpdate = async ({
  currentID,
  newAd,
}: {
  currentID: number;
  newAd: IAds;
}) => {
  if (currentID === -1) return;
  try {
    const prevAd = await getAdItem(currentID);
    const response = await axios.put(`${BASE_URL}/ads/${currentID}`, {
      ...prevAd,
      ...newAd,
    });
    if (response.status !== 200) throw Error;
  } catch (error) {
    console.error(error);
  }
};

export const adDelete = async (currentID: number) => {
  if (currentID === -1) return;
  try {
    const response = await axios.delete(`${BASE_URL}/ads/${currentID}`);
    if (response.status !== 200) throw Error;
  } catch (error) {
    console.error(error);
  }
};
