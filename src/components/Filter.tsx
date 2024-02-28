import { Form } from 'react-bootstrap';

function Filter() {
  return (
    <div className="filter container">
      <Form.Select className="filter__select" aria-label="Default select example">
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </div>
  );
}

export default Filter;
