import { Md5 } from 'ts-md5';
//App utils
import getTimestamp from '../utils/getTimestamp';

interface Data {
  api: string;
  auth: string;
  action: {
    getIds: string;
    getItems: string;
    filter: string;
    getFields: string;
  };
  elementsPerPage: number;
}

const data: Data = {
  api: '/api/',
  auth: Md5.hashStr(`Valantis_${getTimestamp()}`),
  action: {
    getIds: 'get_ids',
    getItems: 'get_items',
    filter: 'filter',
    getFields: 'get_fields',
  },
  elementsPerPage: 50,
};

export default data;
