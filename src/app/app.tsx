import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Data
import data from '../data';
// Api
import { GoodInfo, postGetGoodsInfo, postGetIds } from '../api/valantis';
// My components
import Filter from '../components/Filter';
import Goods from '../components/Goods';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';
// My utils
import getPageElements from '../utils/getPage';
import { removeDuplicates, removeDuplicatesFromInfo } from '../utils/removeDuplicate';
import getRouteParams from '../utils/getRouteParams';
// My hooks
import useFetch from '../hooks/useFetch';
import NotFoundAlert from '../components/NotFoundAlert';
import findCommonElements from '../utils/findeCommonElements';

function App() {
  const route = useParams();
  const [ids, setIds] = useState<string[]>();
  const [goodsInfo, setGoodsInfo] = useState<GoodInfo[]>();

  const [getProducts, productsLoading, productsError] = useFetch<string>(async (url, authKey) => {
    const nameFilter = getRouteParams(route.id, 'name');
    const brandFilter = getRouteParams(route.id, 'brand');
    const priceFilter = getRouteParams(route.id, 'price');

    const idsData: string[] = [];

    if (nameFilter || brandFilter || priceFilter) {
      const idsNameFiltered = [];
      const idsBrandFiltered = [];
      const idsPriceFiltered = [];
      if (nameFilter) {
        idsNameFiltered.push(
          ...(await postGetIds(url, authKey, data.action.filter, { product: nameFilter })).result
        );
      }
      if (brandFilter) {
        idsBrandFiltered.push(
          ...(await postGetIds(url, authKey, data.action.filter, { brand: brandFilter })).result
        );
      }
      if (priceFilter) {
        idsPriceFiltered.push(
          ...(await postGetIds(url, authKey, data.action.filter, { price: +priceFilter })).result
        );
      }
      idsData.push(
        ...removeDuplicates(findCommonElements(idsNameFiltered, idsBrandFiltered, idsPriceFiltered))
      );
    } else {
      idsData.push(
        ...removeDuplicates((await postGetIds(url, authKey, data.action.getIds)).result)
      );
    }

    const idsDataWithoutDuplicates = removeDuplicates(idsData);
    setIds(idsDataWithoutDuplicates);
    const idsDataPerPage = getPageElements(
      idsDataWithoutDuplicates,
      data.elementsPerPage,
      getRouteParams(route.id, 'page') || '1'
    );
    const goodsInfoData = (
      await postGetGoodsInfo(url, authKey, data.action.getItems, { ids: idsDataPerPage })
    ).result;
    setGoodsInfo(removeDuplicatesFromInfo(goodsInfoData));
  });

  useEffect(() => {
    if (productsError) {
      console.error(`Идентификатор ошибки: ${(productsError as Error).message}`);
    }

    getProducts(data.api, data.auth);
  }, [productsError, route]);

  return (
    <>
      <Filter />
      {ids?.length && goodsInfo?.length ? (
        <>
          <Goods goodsInfo={goodsInfo} />
          <Paginate ids={ids} />
        </>
      ) : (
        !productsLoading && <NotFoundAlert />
      )}
      <Loader show={productsLoading} />
    </>
  );
}

export default App;
