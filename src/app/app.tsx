import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Data
import data from '../data';
// Api
import { GoodInfo, postGetGoodsInfo, postGetIds } from '../api/valantis';
// My components
import RootLayout from '../layouts/RootLayout';
import Filter from '../components/Filter';
import Goods from '../components/Goods';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';
// My utils
import getPageElements from '../utils/getPage';
import { removeDuplicates, removeDuplicatesFromInfo } from '../utils/removeDuplicate';
// My hooks
import useFetch from '../hooks/useFetch';

function App() {
  const [activePage, setActivePage] = useState(1);
  const [ids, setIds] = useState<string[]>();
  const [goodsInfo, setGoodsInfo] = useState<GoodInfo[]>();

  const [getIds, idsLoading, idsError] = useFetch<string>(async (url, authKey) => {
    const idsData = (await postGetIds(url, authKey, data.action.getIds)).result;
    setIds(removeDuplicates(idsData));
  });

  const [getGoodsInfo, goodsInfoLoading, goodsInfoError] = useFetch<string>(
    async (url, authKey) => {
      const idsDataPerPage = getPageElements(ids as string[], data.elementsPerPage, activePage);
      const goodsInfoData = (
        await postGetGoodsInfo(url, authKey, data.action.getItems, { ids: idsDataPerPage })
      ).result;
      setGoodsInfo(removeDuplicatesFromInfo(goodsInfoData));
    }
  );

  useEffect(() => {
    if (idsError) {
      console.error(`Идентификатор ошибки: ${(idsError as Error).message}`);
    }
    getIds(data.valantisApi, data.auth);
  }, [idsError]);

  useEffect(() => {
    if (!ids) return;
    if (goodsInfoError) {
      console.error(`Идентификатор ошибки: ${(goodsInfoError as Error).message}`);
    }
    getGoodsInfo(data.valantisApi, data.auth);
  }, [ids, goodsInfoError, activePage]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              <>
                <Filter />
                <Goods goodsInfo={goodsInfo} />
                <Paginate ids={ids} activePage={activePage} setActivePage={setActivePage} />
                <Loader show={idsLoading || goodsInfoLoading} />
              </>
            }
          />
          <Route path=":id" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
