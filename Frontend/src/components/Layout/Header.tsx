import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Gestión de Eventos</Link>
        <nav>
          {isAuthenticated ? (
            <>
              <Link to="/my-registrations" className="mr-4">Mis Inscripciones</Link>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Iniciar Sesión</Link>
              <Link to="/register" className="bg-green-500 px-3 py-1 rounded">Registrarse</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
