import axios from 'axios';

export interface GoodInfo {
  brand: string;
  id: string;
  price: number;
  product: string;
}

export interface GoodsInfo {
  result: GoodInfo[];
}

export interface Ids {
  result: string[];
}

export interface PostParams {
  [key: string]: string[];
}

export const postGetIds = async (url: string, authKey: string, action: string): Promise<Ids> => {
  const config = {
    headers: {
      'X-Auth': authKey,
    },
  };
  const postData = {
    action,
  };
  const data: Ids = (await axios.post(url, postData, config)).data;
  console.log(1);

  return data;
};

export const postGetGoodsInfo = async (
  url: string,
  authKey: string,
  action: string,
  params: PostParams
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
  console.log(2);

  return data;
};
