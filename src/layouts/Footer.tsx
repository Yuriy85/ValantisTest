import { gitIcon } from '../assets/svg';

interface Props {
  isDarkTheme: boolean;
}

function Footer({ isDarkTheme }: Props) {
  return (
    <footer className={`footer ${isDarkTheme ? 'bg-secondary' : 'bg-light'}`}>
      <div className="footer__container container">
        <p className="footer__signature m-0 text-dark">Yuriy Panteleev</p>
        <a
          className="footer__link"
          title="to my Git"
          href="https://github.com/Yuriy85"
          target="blank"
        >
          <img className="footer__git-icon" src={gitIcon} alt="Git Icon" />
        </a>
        <p className="footer__signature m-0 text-dark">2024</p>
      </div>
    </footer>
  );
}

export default Footer;
