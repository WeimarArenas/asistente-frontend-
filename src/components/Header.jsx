import { Link } from 'react-router-dom';
import '../styles/header.css';

function Header() {
  return (
    <div className="header">
      <ul className='headerMenu'>
        <li>
          <Link className='headerMenuItemStart'>Generar consulta de equipo</Link>
          <ul className="headerSubmenuGenerarConsulta">
            <li><Link to="/consulta-aleatoria">Aleatorio</Link></li>
            <li><Link to="/areas">Manual</Link></li>
          </ul>
        </li>
        <li><Link to="/nuevas-consultas">Nuevas consultas</Link></li>
        <li><Link to="/" className='headerMenuItemEnd'>Salir</Link></li>
      </ul>
    </div>
  )
};

export default Header;
