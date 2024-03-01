import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// App Data
import data from '../data';
// App Api
import { GoodInfo, postGetGoodsInfo, postGetIds } from '../api/valantis';
// App components
import Filter from '../components/Filter';
import Goods from '../components/Goods';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';
import NotFoundAlert from '../components/NotFoundAlert';
// App utils
import getPageElements from '../utils/getPage';
import { removeIdDuplicates, removeInfoDuplicates } from '../utils/removeDuplicate';
import findCommonElements from '../utils/findCommonElements';
import getRouteParams from '../utils/getRouteParams';
// App hooks
import useFetch from '../hooks/useFetch';

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
      const filteredIds: string[][] = [];
      if (nameFilter) {
        filteredIds.push(
          (await postGetIds(url, authKey, data.action.filter, { product: nameFilter })).result
        );
      }
      if (brandFilter) {
        filteredIds.push(
          (await postGetIds(url, authKey, data.action.filter, { brand: brandFilter })).result
        );
      }
      if (priceFilter) {
        filteredIds.push(
          (await postGetIds(url, authKey, data.action.filter, { price: +priceFilter })).result
        );
      }
      idsData.push(...removeIdDuplicates(findCommonElements(filteredIds)));
    } else {
      idsData.push(
        ...removeIdDuplicates((await postGetIds(url, authKey, data.action.getIds)).result)
      );
    }

    if (!idsData.length) {
      setGoodsInfo([]);
      return;
    }

    const idsDataWithoutDuplicates = removeIdDuplicates(idsData);
    setIds(idsDataWithoutDuplicates);
    const idsDataPerPage = getPageElements(
      idsDataWithoutDuplicates,
      data.elementsPerPage,
      getRouteParams(route.id, 'page') || '1'
    );
    const goodsInfoData = (
      await postGetGoodsInfo(url, authKey, data.action.getItems, { ids: idsDataPerPage })
    ).result;
    setGoodsInfo(removeInfoDuplicates(goodsInfoData));
  });

  useEffect(() => {
    if (productsError) {
      console.error(`Идентификатор ошибки: ${(productsError as Error).message}`);
      return;
    }
    getProducts(data.api, data.auth);
  }, [route, productsError]);

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
