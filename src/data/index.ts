import { Md5 } from 'ts-md5';
import getTimestamp from '../utils/getTimestamp';

interface Data {
  valantisApi: string;
  auth: string;
  action: { getIds: string; getItems: string; filter: string };
  elementsPerPage: number;
}

const data: Data = {
  valantisApi: 'http://api.valantis.store:40000/',
  auth: Md5.hashStr(`Valantis_${getTimestamp()}`),
  action: {
    getIds: 'get_ids',
    getItems: 'get_items',
    filter: 'filter',
  },
  elementsPerPage: 50,
};

export default data;
