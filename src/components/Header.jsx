import { Link } from 'react-router-dom';
import '../styles/header.css';

function Header() {
  return (
    <div className="header">
      <ul className='headerMenu'>
        <li>
          <Link to="/generar-consulta" className='headerMenuItemStart'>Generar consulta de equipo</Link>
          <ul className="headerSubmenuGenerarConsulta">
            <li><Link to="/generar-consulta/aleatorio">Aleatorio</Link></li>
            <li><Link to="/areas">Manual</Link></li>
          </ul>
        </li>
        <li>
          <Link to="/registro-consultas">Registro de consultas</Link>
          <ul className="headerSubmenuRegistroConsulta">
            <li><Link to="/registro-consultas/opcion1">Opción 1</Link></li>
            <li><Link to="/registro-consultas/opcion2">Opción 2</Link></li>
          </ul>
        </li>
        <li><Link to="/reportes-mensuales">Reportes mensuales</Link></li>
        <li><Link to="/nuevas-consultas">Nuevas consultas</Link></li>
        <li><Link to="/" className='headerMenuItemEnd'>Salir</Link></li>
      </ul>
    </div>
  )
};

export default Header;
