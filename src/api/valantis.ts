import axios from 'axios';

interface GoodsInfo {
  result: GoodInfo[];
}

interface Ids {
  result: string[];
}

interface FilterParams {
  product?: string;
  price?: number;
  brand?: string;
}

interface GoodsParams {
  [key: string]: string[];
}

export interface GoodInfo {
  brand: string;
  id: string;
  price: number;
  product: string;
}

export const postGetIds = async (
  url: string,
  authKey: string,
  action: string,
  params: FilterParams = {}
): Promise<Ids> => {
  const config = {
    headers: {
      'X-Auth': authKey,
    },
  };
  const postData = {
    action,
    params,
  };
  const data: Ids = (await axios.post(url, postData, config)).data;

  return data;
};

export const postGetGoodsInfo = async (
  url: string,
  authKey: string,
  action: string,
  params: GoodsParams
): Promise<GoodsInfo> => {
  const config = {
    headers: {
      'X-Auth': authKey,
    },
  };
  const postData = {
    action,
    params,
  };
  const data: GoodsInfo = (await axios.post(url, postData, config)).data;

  return data;
};
