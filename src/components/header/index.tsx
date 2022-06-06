import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import icon from '../../assets/icons/icon.png';

const Header: FunctionalComponent = () => {
  return (
    <header>
      <h1>Preact App</h1>
      <img src={icon} />
      <nav>
        <Link href="/">Home</Link>
      </nav>
    </header>
  );
};

export default Header;
