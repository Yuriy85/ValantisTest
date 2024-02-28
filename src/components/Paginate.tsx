import { Dispatch } from 'react';
import { Pagination } from 'react-bootstrap';

interface Props {
  ids: string[] | undefined;
  activePage: number;
  setActivePage: Dispatch<React.SetStateAction<number>>;
}

export default function Paginate(props: Props) {
  return (
    <div className="paginate container">
      <Pagination className="m-0">
        {[1, 2, 3].map((page) => (
          <Pagination.Item
            onClick={() => props.setActivePage(page)}
            active={page == props.activePage}
            key={page}
          >
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}
