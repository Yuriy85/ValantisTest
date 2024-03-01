import { useEffect, useState } from 'react';
import { Alert, Button, Form, Pagination } from 'react-bootstrap';
import data from '../data';
import { useNavigate, useParams } from 'react-router-dom';
import getRouteParams from '../utils/getRouteParams';

interface Props {
  ids: string[] | undefined;
}

export default function Paginate({ ids }: Props) {
  const navigate = useNavigate();
  const route = useParams();
  const [activePage, setActivePage] = useState(getRouteParams(route.id, 'page') || '1');
  const [pagesCount, setPagesCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertValue, setAlertValue] = useState('');

  useEffect(() => {
    if (!route.id) return;
    setActivePage(getRouteParams(route.id, 'page'));
  }, [route]);

  useEffect(() => {
    if (!ids) return;
    setPagesCount(ids && Math.floor(ids.length / data.elementsPerPage));
  }, [ids]);

  const getRoutePath = (page: string) => {
    if (route?.id?.includes('name')) {
      const productName = getRouteParams(route.id, 'name');
      const productBrand = getRouteParams(route.id, 'brand');
      const productPrice = getRouteParams(route.id, 'price');
      return `/page=${page}&name=${productName}&brand=${productBrand}&price=${productPrice}`;
    } else {
      return `/page=${page}`;
    }
  };

  const isPageInRange = (page: string, pageCount: number) =>
    +page < 1 || +page > pageCount || isNaN(+page);

  const setNewPage = (page: string, pageCount: number | undefined) => {
    if (!page) {
      setShowAlert(false);
      return;
    }
    if (pageCount && isPageInRange(page, pageCount)) {
      setAlertValue('');
      return;
    }
    navigate(getRoutePath(page));
    setAlertValue('');
    setShowAlert(false);
  };

  return (
    <div
      className={
        !isPageInRange(activePage, pagesCount)
          ? 'paginate container'
          : 'paginate visually-hidden container'
      }
    >
      <Alert className="paginate__alert" show={showAlert}>
        <Form.Control
          onKeyDown={(event) => event.key === 'Enter' && setNewPage(alertValue, pagesCount)}
          onChange={(event) => setAlertValue(event.target.value)}
          placeholder={`Choose page 1...${pagesCount}`}
          value={alertValue}
        />
        <Button onClick={() => setNewPage(alertValue, pagesCount)}>Submit</Button>
      </Alert>

      <Pagination className="paginate__menu m-0">
        <Pagination.First disabled={activePage === '1'} onClick={() => navigate('/page=1')} />
        <Pagination.Prev
          disabled={activePage === '1'}
          onClick={() => {
            navigate(getRoutePath(`${+activePage - 1}`));
          }}
        />
        <Pagination.Item onClick={() => setShowAlert(true)}>{activePage}</Pagination.Item>
        <Pagination.Next
          disabled={+activePage === pagesCount}
          onClick={() => {
            navigate(getRoutePath(`${+activePage + 1}`));
          }}
        />
        <Pagination.Last
          disabled={+activePage === pagesCount}
          onClick={() => {
            if (pagesCount) {
              navigate(getRoutePath(`${pagesCount}`));
            }
          }}
        />
      </Pagination>
    </div>
  );
}
