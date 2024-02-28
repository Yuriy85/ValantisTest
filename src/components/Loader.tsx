import { Spinner } from 'react-bootstrap';

interface Props {
  show: boolean;
}

function Loader({ show }: Props) {
  return (
    <>
      {show && (
        <div className="loader modal">
          <Spinner className="loader__spinner" />
        </div>
      )}
    </>
  );
}

export default Loader;
