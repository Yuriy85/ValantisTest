import { Dispatch, useState } from 'react';
import { Alert, Button, Form, Pagination } from 'react-bootstrap';
import data from '../data';

interface Props {
  ids: string[] | undefined;
  activePage: number;
  setActivePage: Dispatch<React.SetStateAction<number>>;
}

export default function Paginate(props: Props) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertValue, setAlertValue] = useState('');

  const pagesCount = props.ids && Math.floor(props.ids.length / data.elementsPerPage);

  const setNewPage = (page: string, pageCount: number | undefined) => {
    if (!page) {
      setShowAlert(false);
      return;
    }
    if (pageCount && (+page < 1 || +page > pageCount || isNaN(+page))) {
      setAlertValue('');
      return;
    }
    props.setActivePage(+page);
    setAlertValue('');
    setShowAlert(false);
  };

  return (
    <div className="paginate container">
      <Alert className="paginate__alert" variant="secondary" show={showAlert}>
        <Form.Control
          onKeyDown={(event) => event.key === 'Enter' && setNewPage(alertValue, pagesCount)}
          onChange={(event) => setAlertValue(event.target.value)}
          placeholder={`Choose page 1...${pagesCount}`}
          value={alertValue}
        />
        <Button onClick={() => setNewPage(alertValue, pagesCount)} variant="secondary">
          Submit
        </Button>
      </Alert>

      <Pagination className="m-0">
        <Pagination.First
          disabled={props.activePage === 1}
          onClick={() => props.setActivePage(1)}
        />
        <Pagination.Prev
          disabled={props.activePage === 1}
          onClick={() => props.setActivePage(props.activePage - 1)}
        />
        <Pagination.Item onClick={() => setShowAlert(true)}>{props.activePage}</Pagination.Item>
        <Pagination.Next
          disabled={props.activePage === pagesCount}
          onClick={() => props.setActivePage(props.activePage + 1)}
        />
        <Pagination.Last
          disabled={props.activePage === pagesCount}
          onClick={() => pagesCount && props.setActivePage(pagesCount)}
        />
      </Pagination>
    </div>
  );
}
