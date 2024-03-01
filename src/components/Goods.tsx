import { Card } from 'react-bootstrap';
// App Api
import { GoodInfo } from '../api/valantis';

interface Props {
  goodsInfo: GoodInfo[] | undefined;
}

function Goods({ goodsInfo }: Props) {
  return (
    <div className="goods container">
      {goodsInfo?.map((good) => (
        <Card key={good.id} className="goods__card">
          <Card.Body>
            <Card.Title className="mb-3">{good.product}</Card.Title>
            <Card.Subtitle className="mb-3">Brand: {good.brand || '-'}</Card.Subtitle>
            <Card.Text className="mb-3 text-danger">{`Price: ${good.price}`}</Card.Text>
            <Card.Text>{`id: ${good.id}`}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Goods;
