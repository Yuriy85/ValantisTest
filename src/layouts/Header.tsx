import { reactIcon } from '../assets/svg';

interface Props {
  isDarkTheme: boolean;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ isDarkTheme, setIsDarkTheme }: Props) {
  return (
    <header className="header">
      <div className="header__container container">
        <h1 className="header__title text-light m-0">Valantis Test</h1>
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
