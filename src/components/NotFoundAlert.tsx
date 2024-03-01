import { Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFoundAlert() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <Alert show={true}>
        <Alert.Heading>Ooops!</Alert.Heading>
        <p>Sorry, nothing found, please try entering a different query or go to home.</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </div>
      </Alert>
    </div>
  );
}

export default NotFoundAlert;
