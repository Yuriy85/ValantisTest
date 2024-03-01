import { useNavigate } from 'react-router-dom';
import { reactIcon } from '../assets/svg';

interface Props {
  isDarkTheme: boolean;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ isDarkTheme, setIsDarkTheme }: Props) {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header__container container">
        <h1 className="header__title text-light m-0" title="to Home" onClick={() => navigate('/')}>
          Valantis Test
        </h1>
        <img
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className="header__icon"
          src={reactIcon}
          title="Change theme"
          alt="react icon"
        />
      </div>
    </header>
  );
}

export default Header;
