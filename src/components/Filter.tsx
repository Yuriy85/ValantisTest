import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Accordion, Button, Col, Form, Row } from 'react-bootstrap';
// App utils
import getRouteParams from '../utils/getRouteParams';

function Filter() {
  const route = useParams();
  const navigate = useNavigate();
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [productName, setProductName] = useState(getRouteParams(route.id, 'name'));
  const [productBrand, setProductBrand] = useState(getRouteParams(route.id, 'brand'));
  const [productPrice, setProductPrice] = useState(getRouteParams(route.id, 'price'));

  useEffect(() => {
    if (!route.id) {
      setProductName('');
      setProductBrand('');
      setProductPrice('');
    }
  }, [route]);

  return (
    <div className="filter container">
      <Accordion className="filter__accordion" activeKey={accordionOpen ? '1' : ''}>
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={() => setAccordionOpen(!accordionOpen)}>
            <span className="filter__title h5 mb-0">{`Filtration ${(productName || productBrand || productPrice) && '*'}`}</span>
          </Accordion.Header>
          <Accordion.Body className="filter__form">
            <Form
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                setAccordionOpen(false);
                navigate(`/page=1&name=${productName}&brand=${productBrand}&price=${productPrice}`);
              }}
            >
              <Row className="mb-3">
                <Form.Group as={Col} md="4">
                  <Form.Label>Product name</Form.Label>
                  <Form.Control
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                    type="text"
                    placeholder="Product name"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Product brand</Form.Label>
                  <Form.Control
                    value={productBrand}
                    onChange={(event) => setProductBrand(event.target.value)}
                    type="text"
                    placeholder="Product brand"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Product price</Form.Label>
                  <Form.Control
                    value={productPrice}
                    onChange={(event) => setProductPrice(event.target.value)}
                    type="text"
                    placeholder="Product price"
                  />
                </Form.Group>
              </Row>
              <Button type="submit">Submit filter</Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Filter;
